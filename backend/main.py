from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
import json
import os
import uvicorn
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import tempfile
import shutil

model = OllamaLLM(model="llama3.2")

# Load ranking data for reference
with open("priority_and_ranking.json", "r") as f:
    ranking_data = json.load(f)

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

# Create FastAPI app
app = FastAPI(title="Resume Ranking API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_job_categories():
    """Get all job categories from the ranking data"""
    return list(ranking_data["job_categories"].keys())

def get_job_roles(category):
    """Get all job roles for a given category"""
    if category in ranking_data["job_categories"]:
        return [role["title"] for role in ranking_data["job_categories"][category]["roles"]]
    return []

def get_scoring_criteria_text(job_category, job_role):
    """Get scoring criteria text for a given job category and role"""
    for category in ranking_data["job_categories"]:
        if category.lower() == job_category.lower():
            for role in ranking_data["job_categories"][category]["roles"]:
                if role["title"].lower() == job_role.lower():
                    criteria = role["resume_scoring"]
                    text = "Scoring criteria weights (out of 100):\n"
                    for criterion, weight in criteria.items():
                        text += f"- {criterion.replace('_', ' ').title()}: {weight}%\n"
                    return text
    return "No specific scoring criteria found."

@app.get("/")
def read_root():
    return {"message": "Resume Ranking API is running"}

@app.get("/api/job-categories")
def api_job_categories():
    """API endpoint to get all job categories"""
    categories = get_job_categories()
    return {"categories": categories}

@app.get("/api/job-roles/{category}")
def api_job_roles(category: str):
    """API endpoint to get all job roles for a given category"""
    roles = get_job_roles(category)
    return {"roles": roles}

@app.post("/api/upload-excel")
async def upload_excel_file(file: UploadFile = File(...)):
    """API endpoint to upload Excel file"""
    try:
        # Create a temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".xlsx") as temp_file:
            # Save uploaded file to the temporary file
            shutil.copyfileobj(file.file, temp_file)
            temp_file_path = temp_file.name
        
        # Process the Excel file
        from vector import set_resume_data
        success = set_resume_data(temp_file_path)
        
        if success:
            return {"message": "Excel file uploaded and processed successfully"}
        else:
            raise HTTPException(status_code=400, detail="Failed to process Excel file")
    except Exception as e:
        if os.path.exists(temp_file_path):
            os.unlink(temp_file_path)
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")

@app.post("/api/rank-candidates")
async def rank_candidates(job_category: str = Form(...), job_role: str = Form(...)):
    """API endpoint to rank candidates for a given job category and role"""
    try:
        from vector import get_all_resumes
        result = get_all_resumes(job_category, job_role)
        
        if result and "documents" in result:
            candidates = []
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
                
                candidates.append({
                    "name": metadata["name"],
                    "contact": metadata["contact"],
                    "score": metadata["score"],
                    "scores_by_criterion": metadata["scores_by_criterion"]
                })
            
            # Sort candidates by score
            candidates.sort(key=lambda x: x["score"], reverse=True)
            
            return {"candidates": candidates}
        else:
            return {"candidates": [], "message": "No resumes found for this position"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error ranking candidates: {str(e)}")

@app.post("/api/search-candidates")
async def search_candidates(job_category: str = Form(...), job_role: str = Form(...), query: str = Form(...)):
    """API endpoint to search candidates for a given job category, role, and query"""
    try:
        from vector import get_retriever
        retriever = get_retriever(job_category, job_role, k=5)
        results = retriever.invoke(query)
        
        candidates = []
        for doc in results:
            candidates.append({
                "name": doc.metadata["name"],
                "contact": doc.metadata["contact"],
                "score": doc.metadata["score"],
                "relevant_text": doc.page_content
            })
        
        return {"candidates": candidates}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching candidates: {str(e)}")

@app.post("/api/query-candidates")
async def query_candidates(job_category: str = Form(...), job_role: str = Form(...), question: str = Form(...)):
    """API endpoint to query about candidates for a given job category and role"""
    try:
        from vector import get_retriever
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
        
        return {"answer": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error querying candidates: {str(e)}")

def start_api():
    """Start the API server"""
    print("\n=== Starting Resume Ranking API ===")
    print("The API will be available at http://localhost:8000")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

def print_job_categories():
    """Print all job categories"""
    print("\nAvailable Job Categories:")
    for i, category in enumerate(ranking_data["job_categories"].keys()):
        print(f"{i+1}. {category}")
    print()

def print_job_roles(category):
    """Print all job roles for a given category"""
    print(f"\nAvailable Roles in {category}:")
    for i, role in enumerate(ranking_data["job_categories"][category]["roles"]):
        print(f"{i+1}. {role['title']}")
    print()

def select_job():
    """Interactive CLI function to select a job category and role"""
    print_job_categories()
    categories = list(ranking_data["job_categories"].keys())

    while True:
        try:
            cat_choice = int(input("Select job category (number): ")) - 1
            if 0 <= cat_choice < len(categories):
                category = categories[cat_choice]
                break
            else:
                print("Invalid selection. Please try again.")
        except ValueError:
            print("Please enter a number.")

    print_job_roles(category)
    roles = [role["title"] for role in ranking_data["job_categories"][category]["roles"]]

    while True:
        try:
            role_choice = int(input("Select job role (number): ")) - 1
            if 0 <= role_choice < len(roles):
                role = roles[role_choice]
                break
            else:
                print("Invalid selection. Please try again.")
        except ValueError:
            print("Please enter a number.")

    return category, role

def main():
    """Main CLI function"""
    print("\n=== Resume Ranking System ===")
    print("This system helps you analyze and rank resumes based on job requirements.")
    print("You need to upload an Excel file through the web interface.")

    print("\nChoose operation mode:")
    print("1. Interactive CLI mode")
    print("2. Start API server (for web interface)")
    
    mode_choice = input("\nEnter your choice (1/2): ")
    
    if mode_choice == "2":
        start_api()
        return
    
    # Original CLI mode continues below
    print("\nPlease upload an Excel file first:")
    excel_path = input("Enter path to Excel file: ")
    
    if not os.path.exists(excel_path):
        print(f"Error: File {excel_path} not found")
        return
    
    # Process the Excel file
    from vector import set_resume_data
    if not set_resume_data(excel_path):
        print("Error processing Excel file")
        return
    
    print("\nPlease select the position you're hiring for:")
    job_category, job_role = select_job()

    print(f"\nYou've selected: {job_role} in {job_category}")
    print("Processing resumes for this position...")

    scoring_criteria = get_scoring_criteria_text(job_category, job_role)

    while True:
        print("\n\n-------------------------------")
        print("Options:")
        print("1. Rank all candidates for this position")
        print("2. Search for specific skills or experience")
        print("3. Ask questions about candidates")
        print("4. Select a different position")
        print("q. Quit")

        choice = input("\nEnter your choice: ")

        if choice == "q":
            break

        if choice == "1":
            from vector import get_all_resumes
            result = get_all_resumes(job_category, job_role)

            if result and "documents" in result:
                from langchain_core.documents import Document
                resumes = []
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

                    doc = Document(page_content=doc_text, metadata=metadata)
                    resumes.append(doc)

                sorted_resumes = sorted(resumes, key=lambda x: x.metadata.get('score', 0), reverse=True)

                print(f"\nRanked candidates for {job_role} in {job_category} ({len(sorted_resumes)} total):")
                for i, resume in enumerate(sorted_resumes):
                    print(f"\n{i+1}. {resume.metadata['name']} - Score: {resume.metadata['score']:.1f}")
                    print(f"   Contact: {resume.metadata['contact']}")

                    if 'scores_by_criterion' in resume.metadata and resume.metadata['scores_by_criterion']:
                        print("   Scoring breakdown:")
                        for criterion, score in resume.metadata['scores_by_criterion'].items():
                            print(f"   - {criterion.replace('_', ' ').title()}: {score:.1f}")
            else:
                print("No resumes found for this position.")

        elif choice == "2":
            query = input("\nEnter skills or experience to search for: ")
            from vector import get_retriever
            retriever = get_retriever(job_category, job_role, k=5)
            resumes = retriever.invoke(query)

            print(f"\nTop matching candidates for '{query}':")
            for i, resume in enumerate(resumes):
                print(f"\n{i+1}. {resume.metadata['name']} - Score: {resume.metadata['score']:.1f}")
                print(f"   Contact: {resume.metadata['contact']}")

        elif choice == "3":
            question = input("\nEnter your question about the candidates: ")
            from vector import get_retriever
            retriever = get_retriever(job_category, job_role, k=5)
            resumes = retriever.invoke(question)

            result = chain.invoke({
                "resumes": resumes,
                "question": question,
                "job_category": job_category,
                "job_role": job_role,
                "scoring_criteria": scoring_criteria
            })

            print("\n", result)

        elif choice == "4":
            job_category, job_role = select_job()
            print(f"\nYou've selected: {job_role} in {job_category}")
            print("Processing resumes for this position...")
            scoring_criteria = get_scoring_criteria_text(job_category, job_role)

if __name__ == "__main__":
    main()
