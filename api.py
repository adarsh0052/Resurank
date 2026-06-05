from fastapi import FastAPI, UploadFile, Form, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from backend.vector import set_resume_data, get_all_resumes, get_retriever
import os
import shutil
import json

try:
    from langchain_ollama.llms import OllamaLLM
    from langchain_core.prompts import ChatPromptTemplate
    has_llm = True
except ImportError:
    has_llm = False

app = FastAPI(title="ResuRank Unified API")

# Configure CORS to allow access from any local host port (Vite uses 5173, etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

is_serverless = os.environ.get("VERCEL") is not None or os.environ.get("AWS_LAMBDA_FUNCTION_NAME") is not None
UPLOAD_DIR = "/tmp/uploads" if is_serverless else "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Initialize Ollama model for candidate Q&A
chain = None
if has_llm:
    try:
        model = OllamaLLM(model="llama3.2")
        template = """
        You are an expert HR assistant specialized in resume analysis and candidate ranking for {job_role} positions in the {job_category} field.

        Here is the scoring criteria used for this position:
        {scoring_criteria}

        Here are the top matching resumes based on the search: {resumes}

        Answer the following query about these candidates: {question}

        If asked for rankings, provide detailed explanations about why candidates were ranked in this order based on their qualifications and the job criteria.
        """
        prompt = ChatPromptTemplate.from_template(template)
        chain = prompt | model
    except Exception as e:
        print(f"Warning: Could not initialize Ollama LLM: {e}. Q&A features might be unavailable.")
        chain = None

# Load priority and ranking config for criteria reference
def get_scoring_criteria_text(job_category, job_role):
    try:
        try:
            with open("priority_and_ranking.json", "r") as f:
                ranking_data = json.load(f)
        except FileNotFoundError:
            with open("Priority_and_ranking.json", "r") as f:
                ranking_data = json.load(f)
        
        for category in ranking_data["job_categories"]:
            if category.lower() == job_category.lower():
                for role in ranking_data["job_categories"][category]["roles"]:
                    if role["title"].lower() == job_role.lower():
                        criteria = role["resume_scoring"]
                        text = "Scoring criteria weights (out of 100):\n"
                        for criterion, weight in criteria.items():
                            text += f"- {criterion.replace('_', ' ').title()}: {weight}%\n"
                        return text
    except Exception as e:
        print(f"Error loading criteria text: {e}")
    return "No specific scoring criteria found."


@app.get("/")
async def read_root():
    return {"status": "success", "message": "ResuRank Unified API is running"}


@app.post("/upload-resumes/")
async def upload_resumes(
    file: UploadFile = File(...),
    job_category: str = Form(...),
    job_role: str = Form(...)
):
    try:
        # Save Excel file
        file_path = os.path.join(UPLOAD_DIR, "resume.xlsx")
        with open(file_path, "wb") as f:
            shutil.copyfileobj(file.file, f)
        
        # Load the spreadsheet into memory
        success = set_resume_data(file_path)
        if not success:
            return JSONResponse(
                status_code=400,
                content={"status": "error", "message": "Failed to parse Excel file columns or read file. Please ensure it has Name, Resume Link (or Resume URL), and Contact columns."}
            )

        # Get the processed and ranked resumes
        result = get_all_resumes(job_category, job_role)
        
        # Format the result for JSON response
        if result and "documents" in result:
            formatted_results = []
            for i, doc_text in enumerate(result["documents"]):
                metadata = {}
                for key in result["metadatas"][i]:
                    if key == "scores_by_criterion":
                        if isinstance(result["metadatas"][i][key], str):
                            try:
                                metadata[key] = json.loads(result["metadatas"][i][key])
                            except:
                                metadata[key] = {}
                        else:
                            metadata[key] = result["metadatas"][i][key]
                    else:
                        metadata[key] = result["metadatas"][i][key]
                
                formatted_results.append({
                    "content": doc_text,
                    "metadata": metadata
                })
            
            # Sort by score desc
            formatted_results = sorted(formatted_results, key=lambda x: x["metadata"].get('score', 0), reverse=True)
            return {"status": "success", "results": formatted_results}
        
        return {"status": "error", "message": "No resumes found or database indexing failed"}
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"status": "error", "message": f"Server error processing resumes: {str(e)}"}
        )


@app.get("/job-categories/")
async def get_job_categories():
    try:
        try:
            with open("priority_and_ranking.json", "r") as f:
                ranking_data = json.load(f)
        except FileNotFoundError:
            with open("Priority_and_ranking.json", "r") as f:
                ranking_data = json.load(f)
        return {"categories": list(ranking_data["job_categories"].keys())}
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"status": "error", "message": f"Error loading job categories: {str(e)}"}
        )


@app.get("/job-roles/{category}")
async def get_job_roles(category: str):
    try:
        try:
            with open("priority_and_ranking.json", "r") as f:
                ranking_data = json.load(f)
        except FileNotFoundError:
            with open("Priority_and_ranking.json", "r") as f:
                ranking_data = json.load(f)
        
        if category in ranking_data["job_categories"]:
            roles = [role["title"] for role in ranking_data["job_categories"][category]["roles"]]
            return {"roles": roles}
        else:
            # Try a case-insensitive match
            for cat in ranking_data["job_categories"]:
                if cat.lower() == category.lower():
                    roles = [role["title"] for role in ranking_data["job_categories"][cat]["roles"]]
                    return {"roles": roles}
            return JSONResponse(
                status_code=404,
                content={"status": "error", "message": f"Category '{category}' not found"}
            )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"status": "error", "message": f"Error loading job roles: {str(e)}"}
        )


@app.post("/api/search-candidates")
async def search_candidates(
    job_category: str = Form(...),
    job_role: str = Form(...),
    query: str = Form(...)
):
    try:
        retriever = get_retriever(job_category, job_role, k=5)
        results = retriever.invoke(query)
        
        candidates = []
        for doc in results:
            # Parse scores_by_criterion if present
            scores_by_criterion = {}
            if "scores_by_criterion" in doc.metadata:
                if isinstance(doc.metadata["scores_by_criterion"], str):
                    try:
                        scores_by_criterion = json.loads(doc.metadata["scores_by_criterion"])
                    except:
                        pass
                else:
                    scores_by_criterion = doc.metadata["scores_by_criterion"]

            candidates.append({
                "name": doc.metadata.get("name", "Unknown"),
                "contact": doc.metadata.get("contact", "N/A"),
                "score": doc.metadata.get("score", 0.0),
                "scores_by_criterion": scores_by_criterion,
                "relevant_text": doc.page_content,
                "resume_path": doc.metadata.get("resume_path", "")
            })
        
        return {"status": "success", "candidates": candidates}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching candidates: {str(e)}")


@app.post("/api/query-candidates")
async def query_candidates(
    job_category: str = Form(...),
    job_role: str = Form(...),
    question: str = Form(...)
):
    if not chain:
        diagnostic_answer = "System Diagnostic: The local Ollama LLM service is offline or unavailable on this serverless deployment. However, your candidate match scoring dashboard is active and computed successfully using local criteria."
        return {"status": "success", "answer": diagnostic_answer}
    try:
        retriever = get_retriever(job_category, job_role, k=5)
        resumes = retriever.invoke(question)
        
        scoring_criteria = get_scoring_criteria_text(job_category, job_role)
        
        result = chain.invoke({
            "resumes": resumes,
            "question": question,
            "job_category": job_category,
            "job_role": job_role,
            "scoring_criteria": scoring_criteria
        })
        
        return {"status": "success", "answer": result}
    except Exception as e:
        print(f"Chatbot query failed ({e}). Returning offline diagnostic message.")
        diagnostic_answer = f"System Diagnostic: The local Ollama LLM service is offline or does not have the 'llama3.2' model pulled (Error: {e}). However, your spreadsheet upload is active and candidate rankings have been processed successfully using local rules."
        return {"status": "success", "answer": diagnostic_answer}