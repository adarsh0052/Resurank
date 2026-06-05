import React, { useState, useEffect, useRef } from "react";
import Footer from "./Footer";

const API_BASE = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://localhost:8000"
  : "";

const fallbackCategories = ["Technology", "Cybersecurity", "Management"];
const fallbackRoles = {
  "Technology": ["Software Engineer", "Full Stack Developer", "Frontend Developer", "Backend Developer"],
  "Cybersecurity": ["Ethical Hacker", "Security Analyst", "Network Defender"],
  "Management": ["Product Manager", "Project Manager", "HR Specialist"]
};

export default function ResumeScreenerBot() {
  // --- Original Logic State ---
  const [file, setFile] = useState(null);
  const [jobCategories, setJobCategories] = useState([]);
  const [jobRoles, setJobRoles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [activeTab, setActiveTab] = useState("upload");
  
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStep, setUploadStep] = useState(0); 
  
  const [results, setResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCandidate, setExpandedCandidate] = useState(null);
  
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "Vector space mapped successfully. Query specific profiles directly. For example: 'Who has the most years of experience in distributed systems?'" }
  ]);
  const [userQuestion, setUserQuestion] = useState("");
  const [isAsking, setIsAsking] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  
  const chatEndRef = useRef(null);

  // --- Effects ---
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE}/job-categories/`);
        const data = await response.json();
        if (data.categories && data.categories.length > 0) {
          setJobCategories(data.categories);
        } else {
          setJobCategories(fallbackCategories);
        }
      } catch (error) {
        console.error("Error fetching job categories:", error);
        setJobCategories(fallbackCategories);
        setApiMessage("Backend server unreachable. Operating in secure local fallback mode.");
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const fetchRoles = async () => {
        try {
          const response = await fetch(`${API_BASE}/job-roles/${selectedCategory}`);
          const data = await response.json();
          if (data.roles && data.roles.length > 0) {
            setJobRoles(data.roles);
          } else {
            setJobRoles(fallbackRoles[selectedCategory] || []);
          }
        } catch (error) {
          console.error("Error fetching job roles:", error);
          setJobRoles(fallbackRoles[selectedCategory] || []);
        }
      };
      fetchRoles();
    } else {
      setJobRoles([]);
    }
    setSelectedRole("");
  }, [selectedCategory]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  // --- Handlers ---
  const handleDragOver = (e) => e.preventDefault();
  
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.name.endsWith(".xlsx") || droppedFile.name.endsWith(".xls")) {
        setFile(droppedFile);
        setApiMessage("");
      } else {
        alert("System strictly requires an Excel spreadsheet (.xlsx or .xls)");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setApiMessage("");
    }
  };

  const triggerUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please map a valid spreadsheet node first.");
      return;
    }
    if (!selectedCategory || !selectedRole) {
      alert("Please configure pipeline target metrics.");
      return;
    }

    setIsUploading(true);
    setUploadStep(0);
    setApiMessage("");

    const stepIntervals = [
      setTimeout(() => setUploadStep(1), 1500),
      setTimeout(() => setUploadStep(2), 3500),
      setTimeout(() => setUploadStep(3), 5500),
    ];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_category", selectedCategory);
    formData.append("job_role", selectedRole);

    try {
      const response = await fetch(`${API_BASE}/upload-resumes/`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      
      stepIntervals.forEach(clearTimeout);

      if (data.status === "success" && data.results) {
        setResults(data.results);
        setActiveTab("dashboard");
      } else {
        setApiMessage(data.message || "Error processing vector embedding.");
      }
    } catch (error) {
      stepIntervals.forEach(clearTimeout);
      console.error("Error uploading:", error);
      setApiMessage("Error connecting to inference engine. Verify local FastAPI instance on port 8000.");
    }
    setIsUploading(false);
  };

  const handleAskQuestion = async (e) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;

    const question = userQuestion;
    setUserQuestion("");
    setChatMessages((prev) => [...prev, { sender: "user", text: question }]);
    setIsAsking(true);

    try {
      const formData = new FormData();
      formData.append("job_category", selectedCategory);
      formData.append("job_role", selectedRole);
      formData.append("question", question);

      const response = await fetch(`${API_BASE}/api/query-candidates`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("API call failed");

      const data = await response.json();
      if (data.status === "success" && data.answer) {
        setChatMessages((prev) => [...prev, { sender: "bot", text: data.answer }]);
      } else {
        setChatMessages((prev) => [...prev, { sender: "bot", text: "Warning: Engine returned an anomalous response structure." }]);
      }
    } catch (error) {
      console.error("Error calling Q&A API:", error);
      setChatMessages((prev) => [...prev, { sender: "bot", text: "Llama 3.2 service unreachable. Ensure Ollama is running and model is loaded." }]);
    }
    setIsAsking(false);
  };

  const filteredCandidates = results
    ? results.filter((item) =>
        item.metadata?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white overflow-hidden relative">
      
      {/* ----------------------------------------------------------------------
          INJECTED CUSTOM STYLES
      ---------------------------------------------------------------------- */}
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-panel {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        .input-luxury {
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(228, 228, 231, 0.8);
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.02);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .input-luxury:focus {
          background: #ffffff;
          border-color: #09090B;
          box-shadow: 0 0 0 4px rgba(9, 9, 11, 0.05), inset 0 2px 4px rgba(0, 0, 0, 0.01);
          outline: none;
        }

        .cta-button {
          position: relative;
          overflow: hidden;
          background: #09090B;
          color: white;
          transition: all 0.3s ease;
        }
        
        .cta-button::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%);
          transform: skewX(-20deg);
          transition: left 0.5s ease;
        }
        .cta-button:hover:not(:disabled)::after { left: 200%; }
        .cta-button:active:not(:disabled) { transform: scale(0.98); }

        /* Premium Scrollbar for Workspace */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #D4D4D8; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #A1A1AA; }

        .candidate-card {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}} />

      {/* Abstract Background Topology */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.3] pointer-events-none -z-10" />
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-100/40 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      {/* Dynamic Header System Status */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-zinc-200/60 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-xl bg-zinc-950 flex items-center justify-center text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <div>
            <h1 className="text-[13px] font-semibold tracking-tight leading-none text-zinc-900">ResuRank Console</h1>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest leading-none">Session // Local Node</span>
          </div>
        </div>

        <div className="flex bg-zinc-100/50 p-1 rounded-full border border-zinc-200/50">
          <button
            onClick={() => setActiveTab("upload")}
            className={`px-6 py-2 rounded-full text-[12px] font-semibold transition-all duration-300 ${
              activeTab === "upload" ? "bg-white text-zinc-950 shadow-sm border border-zinc-200/50" : "text-zinc-500 hover:text-zinc-900"
            }`}
          >
            Pipeline Configuration
          </button>
          <button
            onClick={() => results && setActiveTab("dashboard")}
            disabled={!results}
            className={`px-6 py-2 rounded-full text-[12px] font-semibold transition-all duration-300 ${
              !results ? "opacity-40 cursor-not-allowed text-zinc-400" : 
              activeTab === "dashboard" ? "bg-white text-zinc-950 shadow-sm border border-zinc-200/50" : "text-zinc-500 hover:text-zinc-900"
            }`}
          >
            Intelligence Dashboard
          </button>
        </div>

        <div className="flex items-center gap-3 px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-mono font-medium text-zinc-600 uppercase tracking-widest">
            {API_BASE.replace('http://', '')} // Secure
          </span>
        </div>
      </header>

      {/* Main Workspace Area */}
      <main className="flex-grow max-w-[1440px] mx-auto w-full px-6 sm:px-12 py-12 relative z-10">
        
        {/* Alerts */}
        {apiMessage && (
          <div className="mb-8 glass-panel bg-amber-50/80 border-amber-200/50 rounded-2xl p-4 flex items-center justify-between text-amber-900 shadow-sm animate-in fade-in slide-in-from-top-4">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              <span className="text-sm font-medium">{apiMessage}</span>
            </div>
            <button onClick={() => setApiMessage("")} className="text-amber-700/60 hover:text-amber-900 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
        )}

        {/* ----------------------------------------------------------------------
            TAB 1: INTAKE & CONFIGURATION
        ---------------------------------------------------------------------- */}
        {activeTab === "upload" && (
          <div className="w-full h-full min-h-[600px] flex items-center justify-center">
            
            {/* The Configuration Panel */}
            <div className={`glass-panel rounded-[2.5rem] w-full max-w-[900px] overflow-hidden transition-all duration-700 ${isUploading ? 'scale-95 opacity-0 pointer-events-none absolute' : 'scale-100 opacity-100 relative shadow-2xl'}`}>
              <div className="grid lg:grid-cols-5 h-full">
                
                {/* Storytelling Side */}
                <div className="lg:col-span-2 bg-zinc-50/50 p-10 border-b lg:border-b-0 lg:border-r border-zinc-200/60 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-zinc-200 flex items-center justify-center mb-6">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-700"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight leading-tight mb-3">
                      Initialize data <br/> pipeline.
                    </h2>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      Map your target vector search parameters and attach the candidate spreadsheet. The engine will automatically download, parse, and score semantic alignment.
                    </p>
                  </div>
                  
                  <div className="space-y-4 pt-12">
                    <div className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">Engine Status</div>
                    <div className="flex items-center justify-between text-xs font-mono border-b border-zinc-200/60 pb-2">
                      <span className="text-zinc-500">Vector Store</span>
                      <span className="text-emerald-600 font-medium">Ready</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono border-b border-zinc-200/60 pb-2">
                      <span className="text-zinc-500">LLM Inference</span>
                      <span className="text-emerald-600 font-medium">Active</span>
                    </div>
                  </div>
                </div>

                {/* Form Side */}
                <div className="lg:col-span-3 p-10 bg-white">
                  <form onSubmit={triggerUpload} className="space-y-8 h-full flex flex-col justify-between">
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-[10px] font-mono font-semibold text-zinc-500 uppercase tracking-widest">
                            Category Node //
                          </label>
                          <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="input-luxury w-full rounded-xl px-4 py-3 text-sm text-zinc-900 appearance-none"
                            required
                          >
                            <option value="">Select Domain</option>
                            {jobCategories.map((c, i) => <option key={i} value={c}>{c}</option>)}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-[10px] font-mono font-semibold text-zinc-500 uppercase tracking-widest">
                            Target Role //
                          </label>
                          <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="input-luxury w-full rounded-xl px-4 py-3 text-sm text-zinc-900 appearance-none disabled:opacity-50"
                            disabled={!selectedCategory}
                            required
                          >
                            <option value="">Select Role</option>
                            {jobRoles.map((r, i) => <option key={i} value={r}>{r}</option>)}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[10px] font-mono font-semibold text-zinc-500 uppercase tracking-widest">
                          Candidate Ledger //
                        </label>
                        <div
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                          className="border-2 border-dashed border-zinc-200 hover:border-zinc-400 bg-zinc-50/50 rounded-2xl p-8 text-center transition-colors cursor-pointer relative group"
                        >
                          <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                          
                          <div className="w-12 h-12 mx-auto bg-white rounded-xl shadow-sm border border-zinc-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                            {file ? (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                            ) : (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                            )}
                          </div>
                          <p className="text-sm font-medium text-zinc-900 mb-1">
                            {file ? file.name : "Drop spreadsheet here"}
                          </p>
                          <p className="text-xs text-zinc-500">
                            {file ? `${(file.size / 1024).toFixed(1)} KB` : "Supports standard .XLSX format"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!file || !selectedCategory || !selectedRole}
                      className="cta-button w-full flex items-center justify-center rounded-xl py-4 text-[13px] font-semibold tracking-wide disabled:opacity-50 mt-6"
                    >
                      Execute Scoring Pipeline
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* The Processing Overlay (Replaces card when active) */}
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${isUploading ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
              <div className="glass-panel w-full max-w-md rounded-3xl p-10 flex flex-col items-center text-center shadow-2xl">
                
                {/* Orbit Spinner */}
                <div className="relative w-24 h-24 mb-10">
                  <div className="absolute inset-0 rounded-full border border-dashed border-zinc-300 animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-2 rounded-full border border-dashed border-emerald-400/50 animate-[spin_5s_linear_infinite_reverse]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-zinc-900"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/></svg>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-zinc-900 mb-2">Compiling Vector Spaces</h3>
                <p className="text-xs text-zinc-500 mb-8 max-w-xs">Connecting to local embedding models to evaluate unstructured text semantics.</p>

                <div className="w-full space-y-3 font-mono text-[10px]">
                  {[
                    { label: "Initialize Spreadsheet Parser", active: uploadStep >= 0, done: uploadStep > 0 },
                    { label: "Extract & Download Documents", active: uploadStep >= 1, done: uploadStep > 1 },
                    { label: "Semantic Criteria Scoring", active: uploadStep >= 2, done: uploadStep > 2 },
                    { label: "Finalize Rank Matrix", active: uploadStep >= 3, done: uploadStep > 3 }
                  ].map((step, i) => (
                    <div key={i} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${step.active ? 'bg-white border-zinc-200/80 shadow-sm' : 'bg-transparent border-transparent opacity-40'}`}>
                      <span className={step.active ? 'text-zinc-900 font-bold' : 'text-zinc-500'}>{step.label}</span>
                      <span className={step.done ? 'text-emerald-500 font-bold' : step.active ? 'text-zinc-900 animate-pulse' : 'text-zinc-400'}>
                        {step.done ? '[ DONE ]' : step.active ? '[ PROCESSING ]' : '[ PENDING ]'}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ----------------------------------------------------------------------
            TAB 2: DASHBOARD
        ---------------------------------------------------------------------- */}
        {activeTab === "dashboard" && results && (
          <div className="w-full h-[calc(100vh-140px)] min-h-[600px] flex flex-col lg:flex-row gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {/* Left: Ranked Data Matrix */}
            <div className="lg:w-2/3 flex flex-col glass-panel rounded-3xl overflow-hidden shadow-xl border-zinc-200/80 bg-white/40">
              
              {/* Premium Header/Stats Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between p-6 border-b border-zinc-200/60 bg-white/60">
                <div className="flex gap-8 w-full sm:w-auto">
                  <div>
                    <div className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase mb-1">Index Volume</div>
                    <div className="text-2xl font-semibold text-zinc-900">{results.length}<span className="text-sm font-medium text-zinc-400 ml-1">Nodes</span></div>
                  </div>
                  <div className="w-px bg-zinc-200" />
                  <div>
                    <div className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase mb-1">Peak Score</div>
                    <div className="text-2xl font-semibold text-emerald-600">{results[0]?.metadata?.score ? results[0].metadata.score.toFixed(0) : "0"}%</div>
                  </div>
                </div>

                <div className="mt-4 sm:mt-0 w-full sm:w-64 relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input
                    type="text"
                    className="input-luxury w-full rounded-full pl-9 pr-4 py-2.5 text-xs text-zinc-900 placeholder-zinc-400"
                    placeholder="Search candidate nodes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Matrix List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-3">
                {filteredCandidates.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-400">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-4"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    <span className="text-sm font-medium">No vectors match query criteria.</span>
                  </div>
                ) : (
                  filteredCandidates.map((candidate, idx) => {
                    const isExpanded = expandedCandidate === idx;
                    const score = candidate.metadata?.score || 0;
                    const criteriaBreakdown = candidate.metadata?.scores_by_criterion || {};

                    return (
                      <div 
                        key={idx} 
                        className={`candidate-card rounded-2xl border overflow-hidden ${isExpanded ? 'bg-white border-zinc-300 shadow-md' : 'bg-white/60 border-zinc-200/80 hover:bg-white hover:border-zinc-300'}`}
                      >
                        <div 
                          className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none"
                          onClick={() => setExpandedCandidate(isExpanded ? null : idx)}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono text-xs font-bold border transition-colors ${isExpanded ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-zinc-50 text-zinc-600 border-zinc-200'}`}>
                              {String(idx + 1).padStart(2, '0')}
                            </div>
                            <div>
                              <h3 className="text-sm font-semibold text-zinc-900">{candidate.metadata?.name || "Unknown Identity"}</h3>
                              <p className="text-[11px] font-mono text-zinc-500 mt-1">{candidate.metadata?.contact || "No Contact Data"}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block mr-2">
                              <div className="text-[10px] font-mono text-zinc-400 uppercase">Match Score</div>
                              <div className="text-sm font-bold text-zinc-900">{score.toFixed(0)}%</div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-400 transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
                            </div>
                          </div>
                        </div>

                        {/* Expanded Payload Details */}
                        {isExpanded && (
                          <div className="px-5 pb-5 border-t border-zinc-100 pt-5 bg-zinc-50/50">
                            
                            <div className="flex justify-between items-start mb-6">
                              <div>
                                <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest block mb-2">Original Source</span>
                                <a href={candidate.metadata?.resume_path} target="_blank" rel="noreferrer" className="inline-flex items-center text-xs font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 transition-colors">
                                  <svg className="w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                                  View Raw Document
                                </a>
                              </div>
                            </div>

                            {/* Scoring Visualizer */}
                            {Object.keys(criteriaBreakdown).length > 0 && (
                              <div className="mb-6">
                                <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest block mb-3">Semantic Dimension Weights</span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                                  {Object.entries(criteriaBreakdown).map(([criterion, itemScore], k) => (
                                    <div key={k} className="space-y-2">
                                      <div className="flex justify-between text-xs">
                                        <span className="font-medium text-zinc-600 capitalize">{criterion.replace(/_/g, " ")}</span>
                                        <span className="font-mono text-zinc-900">{typeof itemScore === 'number' ? itemScore.toFixed(0) : 0}</span>
                                      </div>
                                      <div className="h-1.5 w-full bg-zinc-200/80 rounded-full overflow-hidden">
                                        <div 
                                          className="h-full bg-zinc-900 rounded-full" 
                                          style={{ width: `${Math.min(100, Math.max(0, typeof itemScore === 'number' ? itemScore : 0))}%` }}
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div>
                              <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest block mb-3">Extracted Entity Snapshot</span>
                              <div className="bg-white border border-zinc-200 rounded-xl p-4 text-xs text-zinc-600 leading-relaxed max-h-32 overflow-y-auto">
                                {candidate.metadata?.full_resume_text || "No parseable text extracted."}
                              </div>
                            </div>

                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right: Dialogue / Terminal Assistant */}
            <div className="lg:w-1/3 flex flex-col glass-panel rounded-3xl overflow-hidden shadow-xl border-zinc-200/80 bg-white/80 relative">
              
              {/* Header */}
              <div className="p-5 border-b border-zinc-200/60 bg-zinc-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900">Llama 3.2 Query</h3>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Natural Language UI</p>
                  </div>
                </div>
              </div>

              {/* Chat Canvas */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-white/40">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex flex-col w-full ${msg.sender === "bot" ? "items-start" : "items-end"}`}>
                    <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-zinc-400 mb-1.5 px-1">
                      {msg.sender === "bot" ? "System" : "Operator"}
                    </span>
                    <div className={`p-4 rounded-2xl max-w-[90%] text-[13px] leading-relaxed shadow-sm ${
                      msg.sender === "bot" 
                        ? "bg-white border border-zinc-200 text-zinc-700 rounded-tl-sm" 
                        : "bg-zinc-900 text-white rounded-tr-sm"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isAsking && (
                  <div className="flex flex-col items-start w-full">
                    <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-zinc-400 mb-1.5 px-1">System</span>
                    <div className="p-4 rounded-2xl bg-white border border-zinc-200 rounded-tl-sm shadow-sm flex gap-1.5 items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-zinc-50 border-t border-zinc-200/60">
                <form onSubmit={handleAskQuestion} className="relative flex items-center">
                  <input
                    type="text"
                    className="w-full bg-white border border-zinc-200 rounded-xl pl-4 pr-12 py-3.5 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 shadow-sm transition-colors"
                    placeholder="Ask about candidates..."
                    value={userQuestion}
                    onChange={(e) => setUserQuestion(e.target.value)}
                    disabled={isAsking}
                  />
                  <button
                    type="submit"
                    disabled={isAsking || !userQuestion.trim()}
                    className="absolute right-2 w-9 h-9 flex items-center justify-center bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg disabled:opacity-50 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                  </button>
                </form>
              </div>

            </div>
          </div>
        )}

      </main>
      
    </div>
  );
}