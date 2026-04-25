# from langchain_ollama import OllamaEmbeddings
# from langchain_chroma import Chroma
# from langchain_core.documents import Document
# import os
# import pandas as pd
# import json
# import PyPDF2
# import requests
# from io import BytesIO
# import glob
# from difflib import get_close_matches
# import re
# import shutil
# import tempfile
# import threading
# import time
# from datetime import datetime, timedelta

# # Try to import gdown, install if not available
# try:
#     import gdown
# except ImportError:
#     print("Installing gdown package for Google Drive support...")
#     import subprocess
#     subprocess.check_call(["pip", "install", "gdown"])
#     import gdown

# # Load the priority and ranking data
# with open("Priority_and_ranking.json", "r") as f:
#     ranking_data = json.load(f)

# # Create a temp directory for downloads if it doesn't exist
# temp_dir = os.path.join(os.getcwd(), "temp_downloads")
# os.makedirs(temp_dir, exist_ok=True)

# # File expiration tracker: {filepath: expiration_timestamp}
# downloaded_files = {}
# cleanup_thread_running = False
# cleanup_lock = threading.Lock()

# # Background thread to clean up expired files
# def file_cleanup_worker():
#     global cleanup_thread_running
    
#     try:
#         while True:
#             current_time = datetime.now()
#             files_to_remove = []
            
#             # Safely access and modify the downloaded_files dictionary
#             with cleanup_lock:
#                 # Find files that need to be deleted
#                 for file_path, expiry_time in list(downloaded_files.items()):
#                     if current_time > expiry_time:
#                         files_to_remove.append(file_path)
#                         del downloaded_files[file_path]
            
#             # Delete expired files
#             for file_path in files_to_remove:
#                 try:
#                     if os.path.exists(file_path):
#                         os.unlink(file_path)
#                         print(f"Auto-deleted expired file: {os.path.basename(file_path)}")
#                 except Exception as e:
#                     print(f"Error deleting expired file {file_path}: {e}")
            
#             # Check if we should exit the thread
#             with cleanup_lock:
#                 if len(downloaded_files) == 0:
#                     cleanup_thread_running = False
#                     break
            
#             # Sleep for 30 seconds before next check
#             time.sleep(30)
#     except Exception as e:
#         print(f"Error in cleanup thread: {e}")
#         with cleanup_lock:
#             cleanup_thread_running = False

# # Track downloaded file with 10-minute expiration
# def track_downloaded_file(file_path):
#     global cleanup_thread_running
    
#     # Set expiration time to 10 minutes from now
#     expiry_time = datetime.now() + timedelta(minutes=10)
    
#     with cleanup_lock:
#         # Add file to tracking dictionary
#         downloaded_files[file_path] = expiry_time
        
#         # Start cleanup thread if not already running
#         if not cleanup_thread_running:
#             cleanup_thread = threading.Thread(target=file_cleanup_worker, daemon=True)
#             cleanup_thread.start()
#             cleanup_thread_running = True
            
#     print(f"File {os.path.basename(file_path)} will be automatically deleted in 10 minutes")

# # Detect Excel file
# def find_excel_file():
#     files = glob.glob("*.xlsx") + glob.glob("*.xls")  # Support both .xlsx and .xls
#     if len(files) == 1:
#         return files[0]
#     elif not files:
#         raise FileNotFoundError("No Excel file found in the current directory.")
#     else:
#         # If multiple files found, let the user choose one
#         print("Multiple Excel files found:")
#         for i, file in enumerate(files):
#             print(f"{i+1}. {file}")
#         while True:
#             try:
#                 choice = int(input("Select which Excel file to use (number): ")) - 1
#                 if 0 <= choice < len(files):
#                     return files[choice]
#                 else:
#                     print("Invalid selection. Please try again.")
#             except ValueError:
#                 print("Please enter a number.")

# # Handle file renaming to work with any Excel filename
# def handle_excel_file():
#     original_file = find_excel_file()
#     temp_file = "temp_resumes.xlsx"
    
#     # Make a temporary copy with standard name
#     try:
#         shutil.copy2(original_file, temp_file)
#         track_downloaded_file(temp_file)  # Track this temporary file
#         return original_file, temp_file
#     except Exception as e:
#         print(f"Error handling Excel file: {e}")
#         return original_file, original_file  # If rename fails, use the original

# # Fuzzy match required columns with alias support
# def map_columns(df):
#     column_aliases = {
#         "name": ["name", "full name", "candidate name"],
#         "contact": ["contact", "phone", "phone number", "mobile", "email"],
#         "resume": ["resume", "resume link", "resume path"]
#     }

#     col_map = {}
#     columns_lower = df.columns.str.lower()

#     for expected, aliases in column_aliases.items():
#         matched = None
#         for alias in aliases:
#             match = get_close_matches(alias, columns_lower, n=1, cutoff=0.6)
#             if match:
#                 matched = match[0]
#                 break
#         if matched:
#             col_map[expected] = matched
#         else:
#             raise ValueError(f"Could not find a column similar to '{expected}' in the Excel file.")

#     return col_map

# # Load the resume data - now using our excel file handler
# original_file, excel_file = handle_excel_file()
# df = pd.read_excel(excel_file)
# df.columns = df.columns.str.strip().str.lower()
# column_map = map_columns(df)

# # Clean up temporary file if it was created
# if original_file != excel_file and os.path.exists(excel_file):
#     try:
#         # We'll let the auto-cleanup handle this now
#         pass
#     except:
#         pass  # Silently continue if cleanup fails

# embeddings = OllamaEmbeddings(model="mxbai-embed-large")
# db_location = "./chrome_langchain_db"

# # Extract file ID from Google Drive URL
# def extract_file_id(url):
#     # Standard Google Drive link pattern
#     file_id_pattern = r'\/d\/([a-zA-Z0-9_-]+)'
#     match = re.search(file_id_pattern, url)
#     if match:
#         return match.group(1)
    
#     # Alternative pattern for "open?id=" format
#     alt_pattern = r'id=([a-zA-Z0-9_-]+)'
#     match = re.search(alt_pattern, url)
#     if match:
#         return match.group(1)
    
#     return None

# # Extract text from PDF or URL
# def extract_text_from_pdf(pdf_path):
#     try:
#         if pdf_path.startswith('http'):
#             # Check if it's a Google Drive link
#             if "drive.google.com" in pdf_path:
#                 file_id = extract_file_id(pdf_path)
#                 if file_id:
#                     # Use temporary file
#                     temp_pdf = os.path.join(temp_dir, f"{file_id}.pdf")
                    
#                     # Use gdown to download the file
#                     try:
#                         gdown.download(id=file_id, output=temp_pdf, quiet=False)
#                         if os.path.exists(temp_pdf):
#                             # Track the downloaded file for auto-deletion
#                             track_downloaded_file(temp_pdf)
                            
#                             with open(temp_pdf, 'rb') as f:
#                                 pdf_reader = PyPDF2.PdfReader(f)
#                                 text = ""
#                                 for page in pdf_reader.pages:
#                                     text += page.extract_text() + "\n"
#                                 return text
#                     except Exception as e:
#                         print(f"gdown download failed: {e}, trying alternative method...")
            
#             # For non-Google Drive URLs or if gdown failed
#             response = requests.get(pdf_path)
            
#             # If it's a downloadable file, save it temporarily
#             if "pdf" in response.headers.get('Content-Type', '').lower() or pdf_path.lower().endswith('.pdf'):
#                 temp_pdf = os.path.join(temp_dir, f"downloaded_{int(time.time())}.pdf")
#                 with open(temp_pdf, 'wb') as f:
#                     f.write(response.content)
                
#                 # Track the downloaded file for auto-deletion
#                 track_downloaded_file(temp_pdf)
                
#                 with open(temp_pdf, 'rb') as f:
#                     pdf_reader = PyPDF2.PdfReader(f)
#                     text = ""
#                     for page in pdf_reader.pages:
#                         text += page.extract_text() + "\n"
#                     return text
#             else:
#                 # Try to extract directly from memory
#                 pdf_file = BytesIO(response.content)
#                 pdf_reader = PyPDF2.PdfReader(pdf_file)
#                 text = ""
#                 for page in pdf_reader.pages:
#                     text += page.extract_text() + "\n"
#                 return text
#         else:
#             # Local file
#             pdf_file = open(pdf_path, 'rb')
#             pdf_reader = PyPDF2.PdfReader(pdf_file)
#             text = ""
#             for page in pdf_reader.pages:
#                 text += page.extract_text() + "\n"
#             pdf_file.close()
#             return text
#     except Exception as e:
#         print(f"Error extracting text from {pdf_path}: {e}")
        
#         # One last fallback for Google Drive files
#         if "drive.google.com" in pdf_path:
#             try:
#                 print("Attempting direct API extraction for Google Drive file...")
#                 file_id = extract_file_id(pdf_path)
#                 if file_id:
#                     # Try the direct download method
#                     direct_url = f"https://drive.google.com/uc?export=download&id={file_id}"
#                     response = requests.get(direct_url)
                    
#                     # Save to temporary file
#                     temp_pdf = os.path.join(temp_dir, f"{file_id}_direct.pdf")
#                     with open(temp_pdf, 'wb') as f:
#                         f.write(response.content)
                    
#                     # Track the downloaded file for auto-deletion
#                     track_downloaded_file(temp_pdf)
                    
#                     with open(temp_pdf, 'rb') as f:
#                         pdf_reader = PyPDF2.PdfReader(f)
#                         text = ""
#                         for page in pdf_reader.pages:
#                             text += page.extract_text() + "\n"
#                         return text
#             except Exception as e2:
#                 print(f"All extraction methods failed: {e2}")
        
#         return ""

# # Score resume
# def calculate_resume_score(resume_text, job_category, job_role):
#     try:
#         for category in ranking_data["job_categories"]:
#             if category.lower() == job_category.lower():
#                 for role in ranking_data["job_categories"][category]["roles"]:
#                     if role["title"].lower() == job_role.lower():
#                         scoring_criteria = role["resume_scoring"]
#                         score = 0
#                         total_weight = 0
#                         scores_by_criterion = {}

#                         for criterion, weight in scoring_criteria.items():
#                             total_weight += weight
#                             criterion_score = 0

#                             keywords = criterion.replace("_", " ").split()
#                             keyword_matches = 0
#                             for keyword in keywords:
#                                 if keyword.lower() in resume_text.lower():
#                                     keyword_matches += 1

#                             if keywords:
#                                 criterion_score = (keyword_matches / len(keywords)) * weight

#                             score += criterion_score
#                             scores_by_criterion[criterion] = criterion_score

#                         if total_weight > 0:
#                             score = (score / total_weight) * 100

#                         return score, scores_by_criterion
#         return 0, {}
#     except Exception as e:
#         print(f"Error calculating score: {e}")
#         return 0, {}

# # Process resumes
# def process_resumes(job_category, job_role):
#     documents = []
#     ids = []

#     for i, row in df.iterrows():
#         try:
#             resume_path = row[column_map["resume"]]
#             print(f"Processing resume for {row[column_map['name']]}...")
#             resume_text = extract_text_from_pdf(resume_path)
#             if not resume_text:
#                 print(f"Warning: Could not extract text from resume for {row[column_map['name']]}")
            
#             score, scores_by_criterion = calculate_resume_score(resume_text, job_category, job_role)

#             page_content = (
#                 f"Name: {row[column_map['name']]}\n"
#                 f"Contact: {row[column_map['contact']]}\n"
#                 f"Resume Text: {resume_text[:500]}..."
#             )

#             document = Document(
#                 page_content=page_content,
#                 metadata={
#                     "name": row[column_map["name"]],
#                     "contact": row[column_map["contact"]],
#                     "resume_path": resume_path,
#                     "job_category": job_category,
#                     "job_role": job_role,
#                     "score": score,
#                     "scores_by_criterion": json.dumps(scores_by_criterion),
#                     "full_resume_text": resume_text
#                 },
#                 id=f"{i}{job_category}{job_role}"
#             )
#             ids.append(f"{i}{job_category}{job_role}")
#             documents.append(document)
#         except Exception as e:
#             print(f"Error processing resume for row {i}: {e}")
#             continue

#     return documents, ids

# # Setup Chroma vector store
# def setup_vector_store(job_category, job_role):
#     sanitized_category = re.sub(r'[^a-zA-Z0-9_-]', '_', job_category)
#     sanitized_role = re.sub(r'[^a-zA-Z0-9_-]', '_', job_role)

#     vector_store = Chroma(
#         collection_name=f"resume_rankings_{sanitized_category}_{sanitized_role}",
#         persist_directory=f"{db_location}{sanitized_category}_{sanitized_role}",
#         embedding_function=embeddings
#     )

#     documents, ids = process_resumes(job_category, job_role)
#     if documents:
#         vector_store.add_documents(documents=documents, ids=ids)

#     return vector_store

# # Public API to get retriever
# def get_retriever(job_category, job_role, k=5):
#     vector_store = setup_vector_store(job_category, job_role)
#     return vector_store.as_retriever(search_kwargs={"k": k})

# # Public API to get all resumes
# def get_all_resumes(job_category, job_role):
#     vector_store = setup_vector_store(job_category, job_role)
#     return vector_store.get()

# # Immediate cleanup function - forces deletion of all tracked files
# def force_cleanup():
#     with cleanup_lock:
#         files_to_remove = list(downloaded_files.keys())
#         downloaded_files.clear()
    
#     # Delete all tracked files
#     for file_path in files_to_remove:
#         try:
#             if os.path.exists(file_path):
#                 os.unlink(file_path)
#                 print(f"Force-deleted file: {os.path.basename(file_path)}")
#         except Exception as e:
#             print(f"Error deleting file {file_path}: {e}")

# # Function to manually trigger cleanup at program exit
# def cleanup_on_exit():
#     print("Cleaning up temporary files before exit...")
#     force_cleanup()
    
#     # Also clean any remaining files in temp_dir
#     if os.path.exists(temp_dir):
#         try:
#             for file in os.listdir(temp_dir):
#                 file_path = os.path.join(temp_dir, file)
#                 try:
#                     if os.path.isfile(file_path):
#                         os.unlink(file_path)
#                         print(f"Deleted remaining temp file: {file}")
#                 except Exception as e:
#                     print(f"Error deleting {file_path}: {e}")
#         except Exception as e:
#             print(f"Error cleaning up temporary directory: {e}")

# # Register cleanup function to be called at exit
# import atexit
# atexit.register(cleanup_on_exit)


from langchain_ollama import OllamaEmbeddings
from langchain_chroma import Chroma
from langchain_core.documents import Document
import os
import pandas as pd
import json
import PyPDF2
import requests
from io import BytesIO
import re
import threading
import time
from datetime import datetime, timedelta
import tempfile

# Try to import gdown, install if not available
try:
    import gdown
except ImportError:
    print("Installing gdown package for Google Drive support...")
    import subprocess
    subprocess.check_call(["pip", "install", "gdown"])
    import gdown

# Load the priority and ranking data
with open("Priority_and_ranking.json", "r") as f:
    ranking_data = json.load(f)

# Create a temp directory for downloads if it doesn't exist
temp_dir = os.path.join(os.getcwd(), "temp_downloads")
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
        "name": ["name", "full name", "candidate name"],
        "contact": ["contact", "phone", "phone number", "mobile", "email"],
        "resume": ["resume", "resume link", "resume path"]
    }

    col_map = {}
    columns_lower = df.columns.str.lower()

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
            col_map[expected] = matched
        else:
            raise ValueError(f"Could not find a column similar to '{expected}' in the Excel file.")

    return col_map

embeddings = OllamaEmbeddings(model="mxbai-embed-large")
db_location = "./chrome_langchain_db"

# Extract file ID from Google Drive URL
def extract_file_id(url):
    # Standard Google Drive link pattern
    file_id_pattern = r'\/d\/([a-zA-Z0-9_-]+)'
    match = re.search(file_id_pattern, url)
    if match:
        return match.group(1)
    
    # Alternative pattern for "open?id=" format
    alt_pattern = r'id=([a-zA-Z0-9_-]+)'
    match = re.search(alt_pattern, url)
    if match:
        return match.group(1)
    
    return None

# Extract text from PDF or URL
def extract_text_from_pdf(pdf_path):
    try:
        if pdf_path.startswith('http'):
            # Check if it's a Google Drive link
            if "drive.google.com" in pdf_path:
                file_id = extract_file_id(pdf_path)
                if file_id:
                    # Use temporary file
                    temp_pdf = os.path.join(temp_dir, f"{file_id}.pdf")
                    
                    # Use gdown to download the file
                    try:
                        gdown.download(id=file_id, output=temp_pdf, quiet=False)
                        if os.path.exists(temp_pdf):
                            # Track the downloaded file for auto-deletion
                            track_downloaded_file(temp_pdf)
                            
                            with open(temp_pdf, 'rb') as f:
                                pdf_reader = PyPDF2.PdfReader(f)
                                text = ""
                                for page in pdf_reader.pages:
                                    text += page.extract_text() + "\n"
                                return text
                    except Exception as e:
                        print(f"gdown download failed: {e}, trying alternative method...")
            
            # For non-Google Drive URLs or if gdown failed
            response = requests.get(pdf_path)
            
            # If it's a downloadable file, save it temporarily
            if "pdf" in response.headers.get('Content-Type', '').lower() or pdf_path.lower().endswith('.pdf'):
                temp_pdf = os.path.join(temp_dir, f"downloaded_{int(time.time())}.pdf")
                with open(temp_pdf, 'wb') as f:
                    f.write(response.content)
                
                # Track the downloaded file for auto-deletion
                track_downloaded_file(temp_pdf)
                
                with open(temp_pdf, 'rb') as f:
                    pdf_reader = PyPDF2.PdfReader(f)
                    text = ""
                    for page in pdf_reader.pages:
                        text += page.extract_text() + "\n"
                    return text
            else:
                # Try to extract directly from memory
                pdf_file = BytesIO(response.content)
                pdf_reader = PyPDF2.PdfReader(pdf_file)
                text = ""
                for page in pdf_reader.pages:
                    text += page.extract_text() + "\n"
                return text
        else:
            # Local file
            pdf_file = open(pdf_path, 'rb')
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
            pdf_file.close()
            return text
    except Exception as e:
        print(f"Error extracting text from {pdf_path}: {e}")
        
        # One last fallback for Google Drive files
        if "drive.google.com" in pdf_path:
            try:
                print("Attempting direct API extraction for Google Drive file...")
                file_id = extract_file_id(pdf_path)
                if file_id:
                    # Try the direct download method
                    direct_url = f"https://drive.google.com/uc?export=download&id={file_id}"
                    response = requests.get(direct_url)
                    
                    # Save to temporary file
                    temp_pdf = os.path.join(temp_dir, f"{file_id}_direct.pdf")
                    with open(temp_pdf, 'wb') as f:
                        f.write(response.content)
                    
                    # Track the downloaded file for auto-deletion
                    track_downloaded_file(temp_pdf)
                    
                    with open(temp_pdf, 'rb') as f:
                        pdf_reader = PyPDF2.PdfReader(f)
                        text = ""
                        for page in pdf_reader.pages:
                            text += page.extract_text() + "\n"
                        return text
            except Exception as e2:
                print(f"All extraction methods failed: {e2}")
        
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
                                criterion_score = (keyword_matches / len(keywords)) * weight

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

    for i, row in df.iterrows():
        try:
            resume_path = row[column_map["resume"]]
            print(f"Processing resume for {row[column_map['name']]}...")
            resume_text = extract_text_from_pdf(resume_path)
            if not resume_text:
                print(f"Warning: Could not extract text from resume for {row[column_map['name']]}")
            
            score, scores_by_criterion = calculate_resume_score(resume_text, job_category, job_role)

            page_content = (
                f"Name: {row[column_map['name']]}\n"
                f"Contact: {row[column_map['contact']]}\n"
                f"Resume Text: {resume_text[:500]}..."
            )

            document = Document(
                page_content=page_content,
                metadata={
                    "name": row[column_map["name"]],
                    "contact": row[column_map["contact"]],
                    "resume_path": resume_path,
                    "job_category": job_category,
                    "job_role": job_role,
                    "score": score,
                    "scores_by_criterion": json.dumps(scores_by_criterion),
                    "full_resume_text": resume_text
                },
                id=f"{i}{job_category}{job_role}"
            )
            ids.append(f"{i}{job_category}{job_role}")
            documents.append(document)
        except Exception as e:
            print(f"Error processing resume for row {i}: {e}")
            continue

    return documents, ids

# Setup Chroma vector store
def setup_vector_store(df, column_map, job_category, job_role):
    sanitized_category = re.sub(r'[^a-zA-Z0-9_-]', '_', job_category)
    sanitized_role = re.sub(r'[^a-zA-Z0-9_-]', '_', job_role)

    vector_store = Chroma(
        collection_name=f"resume_rankings_{sanitized_category}_{sanitized_role}",
        persist_directory=f"{db_location}{sanitized_category}_{sanitized_role}",
        embedding_function=embeddings
    )

    documents, ids = process_resumes(df, column_map, job_category, job_role)
    if documents:
        vector_store.add_documents(documents=documents, ids=ids)

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
    current_df, current_column_map = process_excel_file(excel_file_path)
    
    # Track the file for cleanup
    track_downloaded_file(excel_file_path)
    
    return current_df is not None

# Public API to get retriever
def get_retriever(job_category, job_role, k=5):
    """
    Get a retriever for the given job category and role
    
    Args:
        job_category: Job category
        job_role: Job role
        k: Number of results to return
        
    Returns:
        Retriever for the given job category and role
    """
    global current_df, current_column_map
    
    if current_df is None:
        raise ValueError("No resume data loaded. Please upload an Excel file first.")
        
    vector_store = setup_vector_store(current_df, current_column_map, job_category, job_role)
    return vector_store.as_retriever(search_kwargs={"k": k})

# Public API to get all resumes
def get_all_resumes(job_category, job_role):
    """
    Get all resumes for the given job category and role
    
    Args:
        job_category: Job category
        job_role: Job role
        
    Returns:
        Dictionary with keys 'documents', 'metadatas', etc.
    """
    global current_df, current_column_map
    
    if current_df is None:
        raise ValueError("No resume data loaded. Please upload an Excel file first.")
        
    vector_store = setup_vector_store(current_df, current_column_map, job_category, job_role)
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
