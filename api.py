from fastapi import FastAPI, UploadFile, Form, File
from fastapi.middleware.cors import CORSMiddleware
from vector import get_all_resumes
import os
import shutil
import json
from fastapi.responses import JSONResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/upload-resumes/")
async def upload_resumes(
    file: UploadFile = File(...),
    job_category: str = Form(...),
    job_role: str = Form(...)
):
    file_path = os.path.join(UPLOAD_DIR, "resume.xlsx")
    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)
    
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
        
        # Sort by score
        formatted_results = sorted(formatted_results, key=lambda x: x["metadata"].get('score', 0), reverse=True)
        return {"status": "success", "results": formatted_results}
    
    return {"status": "error", "message": "No resumes found or error processing resumes"}

@app.get("/job-categories/")
async def get_job_categories():
    try:
        with open("priority_and_ranking.json", "r") as f:
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
        with open("priority_and_ranking.json", "r") as f:
            ranking_data = json.load(f)
        
        if category in ranking_data["job_categories"]:
            roles = [role["title"] for role in ranking_data["job_categories"][category]["roles"]]
            return {"roles": roles}
        else:
            return JSONResponse(
                status_code=404,
                content={"status": "error", "message": f"Category '{category}' not found"}
            )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"status": "error", "message": f"Error loading job roles: {str(e)}"}
        )