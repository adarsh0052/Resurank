```markdown
# ResuRank 🎯

An AI-powered resume screening and ranking system that helps recruiters evaluate candidates efficiently using Large Language Models.

## 🚀 Features
- Upload Excel files with resume links
- Automatically fetches and analyzes resumes
- Ranks candidates based on job-specific criteria
- Supports multiple job categories and roles
- Semantic search across candidate pool
- Built with React + FastAPI + LangChain + Ollama

## 🛠 Tech Stack
**Frontend:** React, Vite, Tailwind CSS  
**Backend:** FastAPI, Python  
**AI/ML:** LangChain, Ollama (Llama 3.2), ChromaDB, mxbai-embed-large  

## 📁 Project Structure
```

```
Resurank/
├── frontend/         # React Vite frontend
├── api.py            # FastAPI backend
├── main.py           # CLI interface
├── vector.py         # Resume parsing & vector store
├── priority_and_ranking.json  # Scoring config
└── requirements.txt  # Python dependencies
```
``` 

## ⚙️ Setup & Installation

### Backend
```bash
pip install -r requirements.txt
ollama pull llama3.2
ollama pull mxbai-embed-large
uvicorn api:app --reload --port 8000
```



## 📄 Excel File Format
Your Excel file should have these columns:
- **Name** — Candidate's full name
- **Contact** — Phone or email
- **Resume** — Link to resume PDF (Google Drive or direct URL)

## 🧠 How It Works
1. Upload Excel file with resume links
2. Select job category and role
3. AI fetches, parses and scores each resume
4. Candidates are ranked by match score
5. View detailed breakdown per candidate

