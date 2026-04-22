import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./new.css";

function ResumeScreenerBot() {
  const [files, setFiles] = useState([]);
  const [screeningCriteria, setScreeningCriteria] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  
  // Sample data for the dashboard preview
  const sampleResults = [
    { name: "Jane Smith", match: 95, skills: ["Python", "Machine Learning", "Data Analysis"] },
    { name: "John Doe", match: 87, skills: ["React", "TypeScript", "UI/UX"] },
    { name: "Alex Johnson", match: 76, skills: ["Java", "Spring Boot", "AWS"] }
  ];

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0 || !screeningCriteria.trim()) {
      alert("Please upload at least one Excel file with resume links and enter screening criteria.");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append("files", file);
      });
      formData.append("criteria", screeningCriteria);

      const response = await fetch("http://127.0.0.1:8000/screen", {
        method: "POST",
        body: formData
      });

      const result = await response.json();
      console.log("Ranked Results:", result);
      
      setIsUploading(false);
      setActiveTab("results");
    } catch (error) {
      console.error("Error during resume screening:", error);
      alert("An error occurred during resume screening. Please try again.");
      setIsUploading(false);
    }
  };

  return (
    <div className="app-container">
      <Header />
      
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">AI-Powered Resume Screening</h1>
          <p className="hero-subtitle">Save time and find the best candidates with our advanced LLM-based resume screening technology</p>
          <button className="hero-cta" onClick={() => document.querySelector('.bot-wrapper').scrollIntoView({ behavior: 'smooth' })}>
            Start Screening Now
          </button>
        </div>
        <div className="hero-image">
          <div className="animated-resume-stack">
            <div className="resume-paper paper-1"></div>
            <div className="resume-paper paper-2"></div>
            <div className="resume-paper paper-3"></div>
          </div>
        </div>
      </div>
      
      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-number">10,000+</div>
          <div className="stat-label">Resumes Processed</div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-number">93%</div>
          <div className="stat-label">Accuracy Rate</div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-number">85%</div>
          <div className="stat-label">Time Saved</div>
        </div>
      </div>
      
      <div className="bot-wrapper" id="scanner">
        <div className="app-header">
          <h1>Resume Screening Bot</h1>
          <p className="subtitle">Upload Excel files containing resume links for intelligent screening</p>
        </div>

        <div className="info-alert">
          <div className="info-icon">ℹ️</div>
          <div className="info-content">
            <strong>Pro Tip:</strong> Your Excel file should contain a column with valid URLs to candidate resumes. Our AI will fetch and analyze these resumes automatically.
            <button className="info-button" onClick={() => setShowHowItWorks(!showHowItWorks)}>
              {showHowItWorks ? "Hide How It Works" : "How It Works"}
            </button>
          </div>
        </div>
        
        {showHowItWorks && (
          <div className="how-it-works">
            <div className="workflow">
              <div className="workflow-step">
                <div className="step-number">1</div>
                <div className="step-icon">📊</div>
                <div className="step-text">Upload Excel with Resume Links</div>
              </div>
              <div className="workflow-arrow">→</div>
              <div className="workflow-step">
                <div className="step-number">2</div>
                <div className="step-icon">🔍</div>
                <div className="step-text">AI Fetches & Analyzes Resumes</div>
              </div>
              <div className="workflow-arrow">→</div>
              <div className="workflow-step">
                <div className="step-number">3</div>
                <div className="step-icon">📊</div>
                <div className="step-text">Get Ranked Results</div>
              </div>
            </div>
            <div className="tech-explanation">
              Our system reads URLs from your Excel file, downloads the corresponding resumes, and processes them using Llama 3.2 to understand context, LangChain for workflow orchestration, and Ollama for efficient processing. The AI extracts key information from resumes and matches them against your criteria.
            </div>
          </div>
        )}

        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            Upload Excel Files
          </button>
        </div>

        {activeTab === 'upload' && (
          <>
            <form onSubmit={handleSubmit} className="bot-form">
              <div className="form-section">
                <label htmlFor="resume-upload" className="form-label">
                  Upload Excel Files with Resume Links
                </label>
                <p className="form-hint">Accepted formats: XLSX, XLS (must contain resume URLs)</p>
                <div className="upload-container">
                  <input
                    type="file"
                    id="resume-upload"
                    className="upload-input"
                    multiple
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                  />
                  <div className="upload-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>
                  <p className="upload-text">Drag & drop Excel files here or click to browse</p>
                </div>
                <p className="template-link">
                  <a href="#download-template">Download our template Excel file</a> for proper formatting
                </p>
              </div>

              <div className="form-section">
                <label htmlFor="criteria" className="form-label">Screening Parameters</label>
                <p className="form-hint">Enter skills, qualifications, and experience requirements</p>
                <textarea
                  id="criteria"
                  value={screeningCriteria}
                  onChange={(e) => setScreeningCriteria(e.target.value)}
                  placeholder="e.g. Python, 3+ years experience, Bachelor's in CS..."
                  className="criteria-textarea"
                />
                <div className="suggestions">
                  <span className="suggestion-label">Quick Add:</span>
                  <button type="button" className="suggestion-tag" onClick={() => setScreeningCriteria(prev => prev + " Python")}>Python</button>
                  <button type="button" className="suggestion-tag" onClick={() => setScreeningCriteria(prev => prev + " React")}>React</button>
                  <button type="button" className="suggestion-tag" onClick={() => setScreeningCriteria(prev => prev + " Java")}>Java</button>
                  <button type="button" className="suggestion-tag" onClick={() => setScreeningCriteria(prev => prev + " 3+ years")}>3+ Years</button>
                </div>
              </div>

              <div className="excel-format-guide">
                <h3>Excel File Format Requirements</h3>
                <div className="format-details">
                  <p>Your Excel file should include the following columns:</p>
                  <ul>
                    <li><strong>Name:</strong> Candidate's full name</li>
                    <li><strong>Resume_URL:</strong> Direct link to the candidate's resume (PDF/DOC/DOCX)</li>
                    <li><strong>Email:</strong> Contact email (optional)</li>
                    <li><strong>Additional_Info:</strong> Any other relevant details (optional)</li>
                  </ul>
                  <p>All resume links must be publicly accessible. Our system will access these links to download and analyze the resumes.</p>
                </div>
              </div>

              <div className="screening-options">
                <div className="option-group">
                  <h3 className="option-title">Screening Depth</h3>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input type="radio" name="depth" defaultChecked />
                      <span className="radio-label">Standard</span>
                    </label>
                    <label className="radio-option">
                      <input type="radio" name="depth" />
                      <span className="radio-label">Deep Analysis</span>
                    </label>
                  </div>
                </div>
                
                <div className="option-group">
                  <h3 className="option-title">Result Format</h3>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input type="radio" name="format" defaultChecked />
                      <span className="radio-label">Ranked List</span>
                    </label>
                    <label className="radio-option">
                      <input type="radio" name="format" />
                      <span className="radio-label">Detailed Report</span>
                    </label>
                  </div>
                </div>
              </div>

              <button type="submit" className="screen-btn" disabled={isUploading}>
                {isUploading ? (
                  <>
                    <span className="spinner"></span>
                    <span>Processing Resumes...</span>
                  </>
                ) : (
                  <>
                    <span className="btn-icon">🚀</span>
                    <span>Start Screening</span>
                  </>
                )}
              </button>
            </form>

            {files.length > 0 && (
              <div className="preview-section">
                <h3>
                  <span className="file-icon">📊</span>
                  Uploaded Files ({files.length})
                </h3>
                <ul className="file-list">
                  {files.map((file, idx) => (
                    <li key={idx} className="file-item">
                      <span className="file-name">{file.name}</span>
                      <span className="file-size">{(file.size / 1024).toFixed(1)} KB</span>
                      <button className="remove-file" onClick={() => setFiles(files.filter((_, i) => i !== idx))}>✕</button>
                    </li>
                  ))}
                </ul>
                <div className="file-actions">
                  <button className="secondary-btn" onClick={() => setFiles([])}>Clear All</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      <div className="features-section">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Bulk Processing</h3>
            <p>Screen hundreds of resumes in minutes instead of hours</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Precision Matching</h3>
            <p>Advanced AI algorithms find candidates that match your exact needs</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3>Link Processing</h3>
            <p>Automatically fetches resumes from URLs in your Excel spreadsheets</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Detailed Analytics</h3>
            <p>Comprehensive reports and insights from your candidate pool</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default ResumeScreenerBot;

// // ResumeScreenerBot.jsx - Updated to handle categories and roles from API
// import React, { useState, useEffect } from "react";

// function ResumeScreenerBot() {
//   const [file, setFile] = useState(null);
//   const [jobCategories, setJobCategories] = useState([]);
//   const [jobRoles, setJobRoles] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedRole, setSelectedRole] = useState("");
//   const [results, setResults] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Fetch job categories when component mounts
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/job-categories/");
//         const data = await response.json();
//         if (data.categories) {
//           setJobCategories(data.categories);
//         }
//       } catch (error) {
//         console.error("Error fetching job categories:", error);
//         setMessage("Error connecting to server. Please make sure the API is running.");
//       }
//     };

//     fetchCategories();
//   }, []);

//   // Fetch job roles when category changes
//   useEffect(() => {
//     if (selectedCategory) {
//       const fetchRoles = async () => {
//         try {
//           const response = await fetch(`http://localhost:8000/job-roles/${selectedCategory}`);
//           const data = await response.json();
//           if (data.roles) {
//             setJobRoles(data.roles);
//             setSelectedRole(""); // Reset selected role when category changes
//           }
//         } catch (error) {
//           console.error("Error fetching job roles:", error);
//         }
//       };

//       fetchRoles();
//     } else {
//       setJobRoles([]);
//     }
//   }, [selectedCategory]);

//   const handleSubmit = async () => {
//     if (!file || !selectedCategory || !selectedRole) {
//       setMessage("Please upload file and select job category and role.");
//       return;
//     }

//     setMessage("");
//     setLoading(true);
    
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("job_category", selectedCategory);
//     formData.append("job_role", selectedRole);

//     try {
//       const response = await fetch("http://localhost:8000/upload-resumes/", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await response.json();
      
//       if (data.status === "success") {
//         setResults(data.results);
//         setMessage("Resume analysis complete!");
//       } else {
//         setMessage(data.message || "Error processing resumes");
//       }
//     } catch (error) {
//       console.error("Error uploading:", error);
//       setMessage("Error connecting to server. Please make sure the API is running.");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">Resume Screener Bot</h1>
      
//       {message && (
//         <div className="mb-4 p-3 bg-blue-100 text-blue-800 rounded">
//           {message}
//         </div>
//       )}
      
//       <div className="mb-6">
//         <label className="block mb-2 font-medium">Upload Excel File</label>
//         <div className="upload-container">
//           <input
//             type="file"
//             accept=".xlsx,.xls"
//             onChange={(e) => setFile(e.target.files[0])}
//             className="upload-input"
//           />
//           <div className="upload-icon">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//             </svg>
//           </div>
//           <p className="upload-text">Drag and drop or click to select an Excel file</p>
//           {file && <p className="mt-2 text-green-600">Selected: {file.name}</p>}
//         </div>
//       </div>
      
//       <div className="mb-4">
//         <label className="block mb-2 font-medium">Job Category</label>
//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className="w-full p-2 border rounded"
//         >
//           <option value="">Select Job Category</option>
//           {jobCategories.map((category, index) => (
//             <option key={index} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>
//       </div>
      
//       <div className="mb-6">
//         <label className="block mb-2 font-medium">Job Role</label>
//         <select
//           value={selectedRole}
//           onChange={(e) => setSelectedRole(e.target.value)}
//           className="w-full p-2 border rounded"
//           disabled={!selectedCategory}
//         >
//           <option value="">Select Job Role</option>
//           {jobRoles.map((role, index) => (
//             <option key={index} value={role}>
//               {role}
//             </option>
//           ))}
//         </select>
//       </div>

//       <button
//         onClick={handleSubmit}
//         disabled={loading}
//         className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 w-full"
//       >
//         {loading ? "Processing..." : "Rank Resumes"}
//       </button>

//       {results && (
//         <div className="mt-8">
//           <h2 className="text-2xl font-semibold mb-4">Ranked Candidates:</h2>
//           {results.map((result, idx) => (
//             <div key={idx} className="mb-6 p-4 border rounded bg-white shadow-sm">
//               <div className="flex justify-between items-center mb-2">
//                 <h3 className="text-xl font-bold">{idx + 1}. {result.metadata.name}</h3>
//                 <span className="text-lg font-bold text-blue-600">
//                   Score: {result.metadata.score.toFixed(1)}
//                 </span>
//               </div>
//               <p className="mb-2"><strong>Contact:</strong> {result.metadata.contact}</p>
              
//               {result.metadata.scores_by_criterion && (
//                 <div className="mt-4">
//                   <h4 className="font-semibold mb-2">Scoring breakdown:</h4>
//                   <div className="bg-gray-50 p-3 rounded">
//                     {Object.entries(result.metadata.scores_by_criterion).map(([criterion, score], i) => (
//                       <div key={i} className="flex justify-between mb-1">
//                         <span>{criterion.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
//                         <span>{typeof score === 'number' ? score.toFixed(1) : score}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ResumeScreenerBot;