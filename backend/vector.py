import glob
import json
import os
import re
import shutil
import tempfile
import threading
import time
import zipfile
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta
from io import BytesIO

import pandas as pd
import PyPDF2
import requests
from langchain_chroma import Chroma
from langchain_core.documents import Document
from langchain_ollama import OllamaEmbeddings

# Try to import gdown, install if not available
try:
    import gdown
except ImportError:
    print("Installing gdown package for Google Drive support...")
    import subprocess
    try:
        subprocess.check_call(["pip", "install", "gdown"])
        import gdown
    except Exception as e:
        print(f"Failed to install gdown: {e}")
        gdown = None

# Load the priority and ranking data
try:
    with open("priority_and_ranking.json", "r") as f:
        ranking_data = json.load(f)
except FileNotFoundError:
    with open("Priority_and_ranking.json", "r") as f:
        ranking_data = json.load(f)

# Create a temp directory for downloads if it doesn't exist
is_serverless = os.environ.get("VERCEL") is not None or os.environ.get("AWS_LAMBDA_FUNCTION_NAME") is not None
temp_dir = "/tmp/temp_downloads" if is_serverless else os.path.join(os.getcwd(), "temp_downloads")
os.makedirs(temp_dir, exist_ok=True)

# File expiration tracker: {filepath: expiration_timestamp}
downloaded_files = {}
cleanup_thread_running = False
cleanup_lock = threading.Lock()

# Background thread to clean up expired files
def file_cleanup_worker():
    global cleanup_thread_running

    try:
        while True:
            current_time = datetime.now()
            files_to_remove = []

            # Safely access and modify the downloaded_files dictionary
            with cleanup_lock:
                # Find files that need to be deleted
                for file_path, expiry_time in list(downloaded_files.items()):
                    if current_time > expiry_time:
                        files_to_remove.append(file_path)
                        del downloaded_files[file_path]

            # Delete expired files
            for file_path in files_to_remove:
                try:
                    if os.path.exists(file_path):
                        os.unlink(file_path)
                        print(f"Auto-deleted expired file: {os.path.basename(file_path)}")
                except Exception as e:
                    print(f"Error deleting expired file {file_path}: {e}")

            # Check if we should exit the thread
            with cleanup_lock:
                if len(downloaded_files) == 0:
                    cleanup_thread_running = False
                    break

            # Sleep for 30 seconds before next check
            time.sleep(30)
    except Exception as e:
        print(f"Error in cleanup thread: {e}")
        with cleanup_lock:
            cleanup_thread_running = False


# Track downloaded file with 10-minute expiration
def track_downloaded_file(file_path):
    global cleanup_thread_running

    # Set expiration time to 10 minutes from now
    expiry_time = datetime.now() + timedelta(minutes=10)

    with cleanup_lock:
        # Add file to tracking dictionary
        downloaded_files[file_path] = expiry_time

        # Start cleanup thread if not already running
        if not cleanup_thread_running:
            cleanup_thread = threading.Thread(target=file_cleanup_worker, daemon=True)
            cleanup_thread.start()
            cleanup_thread_running = True

    print(f"File {os.path.basename(file_path)} will be automatically deleted in 10 minutes")


# Process uploaded Excel file
def process_excel_file(file_path):
    """
    Process an Excel file that was uploaded by the user
    Args:
        file_path: Path to the uploaded Excel file
    Returns:
        DataFrame containing the resume data
    """
    print(f"DEBUG: Attempting to read Excel file at {file_path}")
    try:
        df = pd.read_excel(file_path)
        df.columns = df.columns.str.strip().str.lower()
        column_map = map_columns(df)
        return df, column_map
    except Exception as e:
        print(f"Error processing Excel file: {e}")
        raise


# Fuzzy match required columns with alias support
def map_columns(df):
    column_aliases = {
        "name": ["name", "full name", "candidate name", "names"],
        "contact": ["contact", "phone", "phone number", "mobile", "email"],
        "resume": ["resume", "resume link", "resume path", "resume url"],
    }

    col_map = {}
    columns_lower = [c.lower() for c in df.columns]

    for expected, aliases in column_aliases.items():
        matched = None
        for alias in aliases:
            matches = [col for col in columns_lower if alias in col]
            if matches:
                matched = matches[0]
                break

        if not matched:
            # Try exact matches
            if expected in columns_lower:
                matched = expected

        if matched:
            # Retrieve original column name from df
            original_col = [col for col in df.columns if col.lower() == matched.lower()][0]
            col_map[expected] = original_col
        else:
            if expected == "contact":
                print("Warning: Contact column not found in Excel sheet. Setting to optional.")
            elif expected == "name":
                if df.columns.size > 0:
                    col_map[expected] = df.columns[0]
                    print(f"Warning: Name column not found. Defaulting to first column: {df.columns[0]}")
                else:
                    raise ValueError("Excel file has no columns.")
            else:
                raise ValueError(f"Could not find a column similar to '{expected}' in the Excel file.")

    return col_map


# Extract file ID from Google Drive URL
def extract_file_id(url):
    # Standard Google Drive link pattern
    file_id_pattern = r"\/d\/([a-zA-Z0-9_-]+)"
    match = re.search(file_id_pattern, url)
    if match:
        return match.group(1)

    # Alternative pattern for "open?id=" format
    alt_pattern = r"id=([a-zA-Z0-9_-]+)"
    match = re.search(alt_pattern, url)
    if match:
        return match.group(1)

    return None


# Helper to extract text from a local PDF
def extract_text_from_pdf_file(pdf_path):
    try:
        with open(pdf_path, "rb") as f:
            pdf_reader = PyPDF2.PdfReader(f)
            text = ""
            for page in pdf_reader.pages:
                text += (page.extract_text() or "") + "\n"
            return text
    except Exception as e:
        print(f"Error extracting PDF text from {pdf_path}: {e}")
        return ""


# Helper to extract text from a local DOCX
def extract_text_from_docx(docx_path):
    try:
        text_list = []
        with zipfile.ZipFile(docx_path) as docx:
            xml_content = docx.read('word/document.xml')
            tree = ET.fromstring(xml_content)
            namespaces = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            text_elems = tree.findall('.//w:t', namespaces)
            for elem in text_elems:
                if elem.text:
                    text_list.append(elem.text)
        return "\n".join(text_list)
    except Exception as e:
        print(f"Error extracting DOCX text from {docx_path}: {e}")
        return ""


# Extract text from PDF, DOCX or URL (including Google Docs)
def extract_text_from_pdf(pdf_path):
    try:
        # Check if remote URL
        if pdf_path.startswith("http://") or pdf_path.startswith("https://"):
            # Handle Google Docs export to PDF first
            if "docs.google.com/document" in pdf_path:
                file_id = extract_file_id(pdf_path)
                if file_id:
                    pdf_path = f"https://docs.google.com/document/d/{file_id}/export?format=pdf"

            # Check if it's a Google Drive link
            if "drive.google.com" in pdf_path and "/export" not in pdf_path:
                file_id = extract_file_id(pdf_path)
                if file_id:
                    temp_pdf = os.path.join(temp_dir, f"{file_id}.pdf")

                    # Try using gdown first
                    if gdown:
                        try:
                            gdown.download(id=file_id, output=temp_pdf, quiet=True)
                            if os.path.exists(temp_pdf):
                                track_downloaded_file(temp_pdf)
                                return extract_text_from_pdf_file(temp_pdf)
                        except Exception as e:
                            print(f"gdown download failed: {e}, falling back to request...")
                    
                    # Direct API fallback URL
                    pdf_path = f"https://drive.google.com/uc?export=download&id={file_id}"

            # General remote file download
            headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
            response = requests.get(pdf_path, headers=headers, timeout=30)
            content_type = response.headers.get("Content-Type", "").lower()
            
            is_docx = "officedocument" in content_type or pdf_path.lower().endswith(".docx")
            is_pdf = "pdf" in content_type or pdf_path.lower().endswith(".pdf") or ("/export?format=pdf" in pdf_path)

            if is_docx:
                temp_docx = os.path.join(temp_dir, f"downloaded_{int(time.time())}.docx")
                with open(temp_docx, "wb") as f:
                    f.write(response.content)
                track_downloaded_file(temp_docx)
                return extract_text_from_docx(temp_docx)
            elif is_pdf:
                temp_pdf = os.path.join(temp_dir, f"downloaded_{int(time.time())}.pdf")
                with open(temp_pdf, "wb") as f:
                    f.write(response.content)
                track_downloaded_file(temp_pdf)
                return extract_text_from_pdf_file(temp_pdf)
            else:
                # Attempt direct PDF parse from memory
                try:
                    pdf_file = BytesIO(response.content)
                    pdf_reader = PyPDF2.PdfReader(pdf_file)
                    text = ""
                    for page in pdf_reader.pages:
                        text += (page.extract_text() or "") + "\n"
                    return text
                except Exception:
                    # Check if it could be a docx file in memory by saving and checking ZIP signature
                    temp_file = os.path.join(temp_dir, f"downloaded_{int(time.time())}")
                    with open(temp_file, "wb") as f:
                        f.write(response.content)
                    track_downloaded_file(temp_file)
                    if zipfile.is_zipfile(temp_file):
                        return extract_text_from_docx(temp_file)
                    return ""
        else:
            # Local file
            if pdf_path.lower().endswith(".docx"):
                return extract_text_from_docx(pdf_path)
            else:
                return extract_text_from_pdf_file(pdf_path)
    except Exception as e:
        print(f"Error extracting text from {pdf_path}: {e}")
        return ""


# Score resume
def calculate_resume_score(resume_text, job_category, job_role):
    try:
        for category in ranking_data["job_categories"]:
            if category.lower() == job_category.lower():
                for role in ranking_data["job_categories"][category]["roles"]:
                    if role["title"].lower() == job_role.lower():
                        scoring_criteria = role["resume_scoring"]
                        score = 0
                        total_weight = 0
                        scores_by_criterion = {}

                        for criterion, weight in scoring_criteria.items():
                            total_weight += weight
                            criterion_score = 0

                            keywords = criterion.replace("_", " ").split()
                            keyword_matches = 0
                            for keyword in keywords:
                                if keyword.lower() in resume_text.lower():
                                    keyword_matches += 1

                            if keywords:
                                criterion_score = (
                                    keyword_matches / len(keywords)
                                ) * weight

                            score += criterion_score
                            scores_by_criterion[criterion] = criterion_score

                        if total_weight > 0:
                            score = (score / total_weight) * 100

                        return score, scores_by_criterion
        return 0, {}
    except Exception as e:
        print(f"Error calculating score: {e}")
        return 0, {}


# Process resumes using provided dataframe
def process_resumes(df, column_map, job_category, job_role):
    documents = []
    ids = []
    print(f"DEBUG: Starting to process {len(df)} resumes...")

    for i, row in df.iterrows():
        name = row[column_map['name']] if 'name' in column_map else f"Candidate {i + 1}"
        contact = row[column_map['contact']] if 'contact' in column_map else "N/A"
        print(f"DEBUG: [{i + 1}/{len(df)}] Extracting text for: {name}")
        try:
            resume_path = row[column_map["resume"]]
            print(f"Processing resume for {name}...")
            resume_text = extract_text_from_pdf(resume_path)
            if not resume_text:
                print(f"Warning: Could not extract text from resume for {name}")

            score, scores_by_criterion = calculate_resume_score(
                resume_text, job_category, job_role
            )

            page_content = (
                f"Name: {name}\n"
                f"Contact: {contact}\n"
                f"Resume Text: {resume_text[:500]}..."
            )

            document = Document(
                page_content=page_content,
                metadata={
                    "name": name,
                    "contact": contact,
                    "resume_path": resume_path,
                    "job_category": job_category,
                    "job_role": job_role,
                    "score": score,
                    "scores_by_criterion": json.dumps(scores_by_criterion),
                    "full_resume_text": resume_text,
                },
                id=f"{i}{job_category}{job_role}",
            )
            ids.append(f"{i}{job_category}{job_role}")
            documents.append(document)
        except Exception as e:
            print(f"Error processing resume for row {i}: {e}")
            continue

    return documents, ids


# Setup Chroma vector store with Ollama and robust local fallback
from langchain_core.embeddings import Embeddings
import hashlib

class SmartEmbeddings(Embeddings):
    def __init__(self, model_name="mxbai-embed-large"):
        self.model_name = model_name
        self.ollama_embeddings = OllamaEmbeddings(model=model_name)
        self.fallback_active = False

    def _get_fallback_vector(self, text):
        # Generates a deterministic normalized 384-dimension vector from sha256 hash of the text
        h = hashlib.sha256(text.encode('utf-8')).digest()
        vector = []
        for i in range(384):
            val = (h[i % len(h)] + i * 7) % 256
            vector.append(val / 255.0)
        return vector

    def embed_documents(self, texts):
        if self.fallback_active:
            return [self._get_fallback_vector(t) for t in texts]
        try:
            return self.ollama_embeddings.embed_documents(texts)
        except Exception as e:
            print(f"Warning: Ollama embedding failed ({e}). Falling back to local deterministic embeddings.")
            self.fallback_active = True
            return [self._get_fallback_vector(t) for t in texts]

    def embed_query(self, text):
        if self.fallback_active:
            return self._get_fallback_vector(text)
        try:
            return self.ollama_embeddings.embed_query(text)
        except Exception as e:
            print(f"Warning: Ollama query embedding failed ({e}). Falling back to local query embedding.")
            self.fallback_active = True
            return self._get_fallback_vector(text)

embeddings = SmartEmbeddings(model_name="mxbai-embed-large")
db_location = "/tmp/chrome_langchain_db" if is_serverless else "./chrome_langchain_db"

def setup_vector_store(df, column_map, job_category, job_role):
    sanitized_category = re.sub(r"[^a-zA-Z0-9_-]", "_", job_category)
    sanitized_role = re.sub(r"[^a-zA-Z0-9_-]", "_", job_role)
    persist_dir = f"{db_location}_{sanitized_category}_{sanitized_role}"

    vector_store = Chroma(
        collection_name=f"resume_rankings_{sanitized_category}_{sanitized_role}",
        persist_directory=persist_dir,
        embedding_function=embeddings,
    )

    # Check if the database already contains data for this specific role
    existing_data = vector_store.get()
    if not existing_data["ids"]:
        print(f"--- Indexing resumes for {job_role} (first time setup) ---")
        documents, ids = process_resumes(df, column_map, job_category, job_role)
        if documents:
            vector_store.add_documents(documents=documents, ids=ids)
    else:
        print(f"--- Loading existing index for {job_role} ---")

    return vector_store


# Store the current dataframe and column mapping
current_df = None
current_column_map = None


# Public API to set the current dataframe
def set_resume_data(excel_file_path):
    """
    Set the current resume data from an Excel file
    Args:
        excel_file_path: Path to the uploaded Excel file
    """
    global current_df, current_column_map
    print("DEBUG: Starting Excel process...")
    try:
        current_df, current_column_map = process_excel_file(excel_file_path)
        print("DEBUG: Excel file loaded. Tracking for cleanup...")
        track_downloaded_file(excel_file_path)
        print("DEBUG: Setup complete.")
        return current_df is not None
    except Exception as e:
        print(f"Error in set_resume_data: {e}")
        return False


# Public API to get retriever
def get_retriever(job_category, job_role, k=5):
    global current_df, current_column_map

    if current_df is None:
        raise ValueError("No resume data loaded. Please upload an Excel file first.")

    vector_store = setup_vector_store(
        current_df, current_column_map, job_category, job_role
    )
    return vector_store.as_retriever(search_kwargs={"k": k})


# Public API to get all resumes
def get_all_resumes(job_category, job_role):
    global current_df, current_column_map

    if current_df is None:
        raise ValueError("No resume data loaded. Please upload an Excel file first.")

    vector_store = setup_vector_store(
        current_df, current_column_map, job_category, job_role
    )
    return vector_store.get()


# Immediate cleanup function - forces deletion of all tracked files
def force_cleanup():
    with cleanup_lock:
        files_to_remove = list(downloaded_files.keys())
        downloaded_files.clear()

    # Delete all tracked files
    for file_path in files_to_remove:
        try:
            if os.path.exists(file_path):
                os.unlink(file_path)
                print(f"Force-deleted file: {os.path.basename(file_path)}")
        except Exception as e:
            print(f"Error deleting file {file_path}: {e}")


# Function to manually trigger cleanup at program exit
def cleanup_on_exit():
    print("Cleaning up temporary files before exit...")
    force_cleanup()

    # Also clean any remaining files in temp_dir
    if os.path.exists(temp_dir):
        try:
            for file in os.listdir(temp_dir):
                file_path = os.path.join(temp_dir, file)
                try:
                    if os.path.isfile(file_path):
                        os.unlink(file_path)
                        print(f"Deleted remaining temp file: {file}")
                except Exception as e:
                    print(f"Error deleting {file_path}: {e}")
        except Exception as e:
            print(f"Error cleaning up temporary directory: {e}")


# Register cleanup function to be called at exit
import atexit
atexit.register(cleanup_on_exit)