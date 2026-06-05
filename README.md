# RESURANK SYSTEM // VERSION 2.1
An enterprise-grade local resume intelligence engine and candidate match scoring terminal built on FastAPI, React Vite, and LangChain vector pipelines.

---

## Technical Architecture

ResuRank bypasses traditional key-phrase searches by parsing resume documents (PDF, DOCX, Google Drive) into local multi-dimensional vector spaces. 

```
                       [ Excel Spreadsheet Intake ]
                                    │
                                    ▼
                     [ Background Document Crawler ]
                                    │
       ┌────────────────────────────┴────────────────────────────┐
       ▼                                                         ▼
[ Text Extractor ]                                      [ Parser Signature ]
  PyPDF2 / Docx ZIP                                        gdown Drive Sync
       │                                                         │
       └────────────────────────────┬────────────────────────────┘
                                    ▼
                      [ Local Criteria Weighting ]
                     priority_and_ranking.json Cosine
                                    │
       ┌────────────────────────────┴────────────────────────────┐
       ▼                                                         ▼
[ Chroma Vector Index ]                                 [ Local LLM Inference ]
  SmartEmbeddings Fallback                                Ollama Llama 3.2 Q&A
```

---

## Key Capabilities

* **3D Spatial Dashboard**: Custom mouse-interactive perspective layout that responds with smooth card-tilt rotations and specular light highlights.
* **SmartEmbeddings Pipeline**: Graceful query fallbacks. If your local Ollama connection is offline or lacks the `mxbai-embed-large` model, the system automatically runs deterministic 384-dimensional vector hash calculations, preventing 500 API errors.
* **Weighted Criteria Weights**: Dynamic sliders in the frontend update match percentages in real-time based on criteria weights defined in the roles config.
* **Secure Local Execution**: Designed for enterprise data privacy. Spreadsheets, PDF files, and vector logs remain fully isolated on your local storage node (and auto-delete after 10 minutes).

---

## Directory Schema

```
ResuRank/
├── src/
│   ├── components/
│   │   ├── HomePage.jsx          # Interactive 3D Landing Page
│   │   ├── ResumeScreenerBot.jsx # Recruiting Console & Dialogue Chat
│   │   ├── ToolsPage.jsx         # Product Grid & Bento Box
│   │   ├── AboutUsPage.jsx       # Engineering & Compliance Narrative
│   │   ├── Header.jsx & Footer.jsx # Floating navigation & Diagnostic status
│   │   └── CustomCursor.jsx      # Square Trailing Cursor
│   ├── index.css                 # 3D transforms & Glassmorphism styles
│   └── main.jsx                  # Entry point React
├── backend/
│   ├── vector.py                 # Vector DB setup & PDF parsing
│   └── main.py                   # Local logic setup
├── api.py                        # FastAPI unified API routes
├── vercel.json                   # Serverless deployment configuration
├── requirements.txt              # Backend Python dependencies
└── package.json                  # Frontend Node dependencies
```

---

## Local Development

### 1. Setup Backend
Initialize your Python virtual environment, install requirements, and run uvicorn:
```bash
# Set up virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run FastAPI backend
python -m uvicorn api:app --port 8000 --reload
```

### 2. Setup Frontend
Install Node dependencies and launch the Vite hot-reloading development server:
```bash
# Install packages
npm install

# Start Vite dev server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Serverless Deployment via Vercel

We have pre-configured [vercel.json](file:///c:/Users/adars/OneDrive/Desktop/_/Resurank/vercel.json) to bundle the frontend and backend together:

1. **relative Routing**: API calls switch from `localhost:8000` to same-origin relative endpoints automatically in production.
2. **Stateless Processing**: On Vercel, the database and uploads redirect to `/tmp` paths, enabling full-featured spreadsheet grading sessions on serverless containers.

To deploy, push your code to a GitHub repository, connect it on Vercel, and click **Deploy**. Vercel will automatically compile both the Vite client assets and the Python Serverless functions.
