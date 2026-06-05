import React, { useEffect, useRef, useState } from "react";

const API_BASE =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:8000"
    : "";

const fallbackCategories = ["Technology", "Cybersecurity", "Management"];

const fallbackRoles = {
  Technology: [
    "Software Engineer",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
  ],
  Cybersecurity: ["Ethical Hacker", "Security Analyst", "Network Defender"],
  Management: ["Product Manager", "Project Manager", "HR Specialist"],
};

export default function ResumeScreenerBot() {
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
    {
      sender: "bot",
      text: "Vector space mapped successfully. Query specific profiles directly. For example: 'Who has the most years of experience in distributed systems?'",
    },
  ]);
  const [userQuestion, setUserQuestion] = useState("");
  const [isAsking, setIsAsking] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  const chatEndRef = useRef(null);

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
        setApiMessage(
          "Backend server unreachable. Operating in secure local fallback mode."
        );
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const fetchRoles = async () => {
        try {
          const response = await fetch(
            `${API_BASE}/job-roles/${selectedCategory}`
          );
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

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];

      if (
        droppedFile.name.endsWith(".xlsx") ||
        droppedFile.name.endsWith(".xls")
      ) {
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
      setApiMessage(
        "Error connecting to inference engine. Verify local FastAPI instance on port 8000."
      );
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
        setChatMessages((prev) => [
          ...prev,
          { sender: "bot", text: data.answer },
        ]);
      } else {
        setChatMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Warning: Engine returned an anomalous response structure.",
          },
        ]);
      }
    } catch (error) {
      console.error("Error calling Q&A API:", error);
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Llama 3.2 service unreachable. Ensure Ollama is running and model is loaded.",
        },
      ]);
    }

    setIsAsking(false);
  };

  const filteredCandidates = results
    ? results.filter(
        (item) =>
          item.metadata?.name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item.content?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div
      className="relative flex min-h-screen flex-col overflow-hidden bg-[#F6F1E8] text-[#0B0B09] selection:bg-[#FF5A1F]/20"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="console-grid" aria-hidden="true" />
      <div className="console-glow" aria-hidden="true" />

      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#E5DCCF] bg-[#F6F1E8]/82 px-3 py-3 shadow-sm backdrop-blur-md sm:px-6 sm:py-4">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-2xl bg-[#0B0B09] text-white shadow-md">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2 21 7v10l-9 5-9-5V7l9-5Z" />
              <path d="M12 22V12" />
              <path d="m3.3 7 8.7 5 8.7-5" />
            </svg>
          </div>

          <div>
            <h1 className="text-[12px] font-black leading-none tracking-tight text-[#090907] sm:text-[13px]">
              ResuRank Console
            </h1>
            <span className="mt-1 hidden font-mono text-[9px] uppercase tracking-widest text-[#A99F91] sm:inline">
              Session // Local Node
            </span>
          </div>
        </div>

        <div className="flex rounded-full border border-[#E5DCCF] bg-white/52 p-0.5">
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`rounded-full px-3 py-1.5 text-[10px] font-black transition sm:px-6 sm:py-2 sm:text-[12px] ${
              activeTab === "upload"
                ? "border border-[#E5DCCF] bg-white text-[#0B0B09] shadow-sm"
                : "text-[#6F675E] hover:text-[#0B0B09]"
            }`}
          >
            Pipeline Configuration
          </button>

          <button
            type="button"
            onClick={() => results && setActiveTab("dashboard")}
            disabled={!results}
            className={`rounded-full px-3 py-1.5 text-[10px] font-black transition sm:px-6 sm:py-2 sm:text-[12px] ${
              !results
                ? "cursor-not-allowed text-[#A99F91] opacity-40"
                : activeTab === "dashboard"
                ? "border border-[#E5DCCF] bg-white text-[#0B0B09] shadow-sm"
                : "text-[#6F675E] hover:text-[#0B0B09]"
            }`}
          >
            Intelligence Dashboard
          </button>
        </div>

        <div className="hidden items-center gap-3 rounded-full border border-[#E5DCCF] bg-white/62 px-4 py-2 md:flex">
          <span className="h-2 w-2 rounded-full bg-[#FF5A1F]" />
          <span className="font-mono text-[10px] font-black uppercase tracking-widest text-[#6F675E]">
            {API_BASE.replace("http://", "") || "local"} // Secure
          </span>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-[1440px] flex-grow px-6 py-12 sm:px-12">
        {apiMessage && (
          <div className="light-panel mb-8 flex items-center justify-between rounded-[24px] border-[#F1CBAF] bg-[#FFF4EA]/84 p-4 text-[#7A3211] shadow-sm">
            <div className="flex items-center gap-3">
              <svg
                className="h-5 w-5 text-[#FF5A1F]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span className="text-sm font-bold">{apiMessage}</span>
            </div>

            <button
              type="button"
              onClick={() => setApiMessage("")}
              className="text-[#7A3211]/60 transition hover:text-[#7A3211]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {activeTab === "upload" && (
          <div className="flex min-h-[600px] w-full items-center justify-center">
            <div
              className={`light-panel w-full max-w-[900px] overflow-hidden rounded-[28px] transition-all duration-700 ${
                isUploading
                  ? "pointer-events-none absolute scale-95 opacity-0"
                  : "relative scale-100 opacity-100"
              }`}
            >
              <div className="grid h-full lg:grid-cols-5">
                <div className="flex flex-col justify-between border-b border-[#E5DCCF] bg-white/34 p-8 sm:p-10 lg:col-span-2 lg:border-b-0 lg:border-r">
                  <div>
                    <div className="mb-6 grid h-11 w-11 place-items-center rounded-2xl border border-[#E5DCCF] bg-white shadow-sm">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <path d="m17 8-5-5-5 5" />
                        <path d="M12 3v12" />
                      </svg>
                    </div>

                    <h2 className="mb-3 text-3xl font-black leading-tight tracking-tight text-[#090907]">
                      Initialize data
                      <br />
                      <span className="text-[#B8AFA1]">pipeline.</span>
                    </h2>

                    <p className="text-sm leading-7 text-[#6F675E]">
                      Map your target vector search parameters and attach the
                      candidate spreadsheet. The engine will automatically
                      download, parse, and score semantic alignment.
                    </p>
                  </div>

                  <div className="space-y-4 pt-12">
                    <div className="font-mono text-[10px] font-black uppercase tracking-widest text-[#A99F91]">
                      Engine Status
                    </div>

                    <div className="flex items-center justify-between border-b border-[#E8DFD2] pb-2 font-mono text-xs">
                      <span className="text-[#6F675E]">Vector Store</span>
                      <span className="font-black text-[#FF5A1F]">Ready</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-[#E8DFD2] pb-2 font-mono text-xs">
                      <span className="text-[#6F675E]">LLM Inference</span>
                      <span className="font-black text-[#FF5A1F]">Active</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/72 p-8 sm:p-10 lg:col-span-3">
                  <form
                    onSubmit={triggerUpload}
                    className="flex h-full flex-col justify-between space-y-8"
                  >
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="space-y-2">
                          <label className="block font-mono text-[10px] font-black uppercase tracking-widest text-[#A99F91]">
                            Category Node //
                          </label>
                          <select
                            value={selectedCategory}
                            onChange={(e) =>
                              setSelectedCategory(e.target.value)
                            }
                            className="input-resurank w-full appearance-none rounded-2xl px-4 py-3 text-sm text-[#0B0B09]"
                            required
                          >
                            <option value="">Select Domain</option>
                            {jobCategories.map((category, index) => (
                              <option key={index} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="block font-mono text-[10px] font-black uppercase tracking-widest text-[#A99F91]">
                            Target Role //
                          </label>
                          <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="input-resurank w-full appearance-none rounded-2xl px-4 py-3 text-sm text-[#0B0B09] disabled:opacity-50"
                            disabled={!selectedCategory}
                            required
                          >
                            <option value="">Select Role</option>
                            {jobRoles.map((role, index) => (
                              <option key={index} value={role}>
                                {role}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block font-mono text-[10px] font-black uppercase tracking-widest text-[#A99F91]">
                          Candidate Ledger //
                        </label>

                        <div
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                          className="group relative cursor-pointer rounded-[24px] border-2 border-dashed border-[#E5DCCF] bg-[#F6F1E8]/56 p-8 text-center transition hover:border-[#FF5A1F] hover:bg-white/72"
                        >
                          <input
                            type="file"
                            accept=".xlsx,.xls"
                            onChange={handleFileChange}
                            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                          />

                          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl border border-[#E5DCCF] bg-white shadow-sm transition group-hover:scale-105">
                            {file ? (
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#FF5A1F"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <path d="M14 2v6h6" />
                                <path d="M16 13H8" />
                                <path d="M16 17H8" />
                                <path d="M10 9H8" />
                              </svg>
                            ) : (
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#6F675E"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <path d="m17 8-5-5-5 5" />
                                <path d="M12 3v12" />
                              </svg>
                            )}
                          </div>

                          <p className="mb-1 text-sm font-black text-[#0B0B09]">
                            {file ? file.name : "Drop spreadsheet here"}
                          </p>
                          <p className="text-xs text-[#6F675E]">
                            {file
                              ? `${(file.size / 1024).toFixed(1)} KB`
                              : "Supports standard .XLSX format"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!file || !selectedCategory || !selectedRole}
                      className="mt-6 flex h-12 w-full items-center justify-center rounded-2xl bg-[#0B0B09] text-xs font-black text-white transition hover:bg-[#FF5A1F] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Execute Scoring Pipeline
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                isUploading
                  ? "scale-100 opacity-100"
                  : "pointer-events-none scale-95 opacity-0"
              }`}
            >
              <div className="light-panel flex w-full max-w-md flex-col items-center rounded-[28px] p-10 text-center">
                <div className="relative mb-10 h-24 w-24">
                  <div className="absolute inset-0 animate-[spin_10s_linear_infinite] rounded-full border border-dashed border-[#D8CDBE]" />
                  <div className="absolute inset-2 animate-[spin_5s_linear_infinite_reverse] rounded-full border border-dashed border-[#FF5A1F]/50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                    </svg>
                  </div>
                </div>

                <h3 className="mb-2 text-lg font-black text-[#090907]">
                  Compiling Vector Spaces
                </h3>
                <p className="mb-8 max-w-xs text-xs leading-6 text-[#6F675E]">
                  Connecting to local embedding models to evaluate unstructured
                  text semantics.
                </p>

                <div className="w-full space-y-3 font-mono text-[10px]">
                  {[
                    {
                      label: "Initialize Spreadsheet Parser",
                      active: uploadStep >= 0,
                      done: uploadStep > 0,
                    },
                    {
                      label: "Extract & Download Documents",
                      active: uploadStep >= 1,
                      done: uploadStep > 1,
                    },
                    {
                      label: "Semantic Criteria Scoring",
                      active: uploadStep >= 2,
                      done: uploadStep > 2,
                    },
                    {
                      label: "Finalize Rank Matrix",
                      active: uploadStep >= 3,
                      done: uploadStep > 3,
                    },
                  ].map((step) => (
                    <div
                      key={step.label}
                      className={`flex items-center justify-between rounded-2xl border p-3 transition ${
                        step.active
                          ? "border-[#E5DCCF] bg-white shadow-sm"
                          : "border-transparent opacity-40"
                      }`}
                    >
                      <span
                        className={
                          step.active
                            ? "font-black text-[#0B0B09]"
                            : "text-[#6F675E]"
                        }
                      >
                        {step.label}
                      </span>
                      <span
                        className={
                          step.done
                            ? "font-black text-[#FF5A1F]"
                            : step.active
                            ? "animate-pulse font-black text-[#0B0B09]"
                            : "text-[#A99F91]"
                        }
                      >
                        {step.done
                          ? "[ DONE ]"
                          : step.active
                          ? "[ PROCESSING ]"
                          : "[ PENDING ]"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "dashboard" && results && (
          <div className="flex w-full flex-col gap-6 lg:h-[calc(100vh-160px)] lg:flex-row">
            <div className="light-panel flex h-[550px] w-full flex-col overflow-hidden rounded-[28px] bg-white/48 lg:h-full lg:w-2/3">
              <div className="flex flex-col items-center justify-between border-b border-[#E5DCCF] bg-white/62 p-6 sm:flex-row">
                <div className="flex w-full gap-8 sm:w-auto">
                  <div>
                    <div className="mb-1 font-mono text-[10px] font-black uppercase tracking-widest text-[#A99F91]">
                      Index Volume
                    </div>
                    <div className="text-2xl font-black text-[#090907]">
                      {results.length}
                      <span className="ml-1 text-sm font-bold text-[#A99F91]">
                        Nodes
                      </span>
                    </div>
                  </div>

                  <div className="w-px bg-[#E5DCCF]" />

                  <div>
                    <div className="mb-1 font-mono text-[10px] font-black uppercase tracking-widest text-[#A99F91]">
                      Peak Score
                    </div>
                    <div className="text-2xl font-black text-[#FF5A1F]">
                      {results[0]?.metadata?.score
                        ? results[0].metadata.score.toFixed(0)
                        : "0"}
                      %
                    </div>
                  </div>
                </div>

                <div className="relative mt-4 w-full sm:mt-0 sm:w-64">
                  <svg
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A99F91]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  <input
                    type="text"
                    className="input-resurank w-full rounded-full py-2.5 pl-9 pr-4 text-xs text-[#0B0B09] placeholder:text-[#A99F91]"
                    placeholder="Search candidate nodes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto p-6">
                {filteredCandidates.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-[#A99F91]">
                    <span className="text-sm font-bold">
                      No vectors match query criteria.
                    </span>
                  </div>
                ) : (
                  filteredCandidates.map((candidate, index) => {
                    const isExpanded = expandedCandidate === index;
                    const score = candidate.metadata?.score || 0;
                    const criteriaBreakdown =
                      candidate.metadata?.scores_by_criterion || {};

                    return (
                      <div
                        key={index}
                        className={`candidate-card overflow-hidden rounded-[24px] border ${
                          isExpanded
                            ? "border-[#D8CDBE] bg-white shadow-md"
                            : "border-[#E5DCCF] bg-white/62 hover:bg-white"
                        }`}
                      >
                        <div
                          className="flex cursor-pointer select-none items-center justify-between p-4 sm:p-5"
                          onClick={() =>
                            setExpandedCandidate(isExpanded ? null : index)
                          }
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`grid h-10 w-10 place-items-center rounded-2xl border font-mono text-xs font-black transition ${
                                isExpanded
                                  ? "border-transparent bg-[#FF5A1F] text-white"
                                  : "border-[#E5DCCF] bg-[#F6F1E8] text-[#6F675E]"
                              }`}
                            >
                              {String(index + 1).padStart(2, "0")}
                            </div>

                            <div>
                              <h3 className="text-sm font-black text-[#0B0B09]">
                                {candidate.metadata?.name ||
                                  "Unknown Identity"}
                              </h3>
                              <p className="mt-1 font-mono text-[11px] text-[#6F675E]">
                                {candidate.metadata?.contact ||
                                  "No Contact Data"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="mr-2 hidden text-right sm:block">
                              <div className="font-mono text-[10px] uppercase text-[#A99F91]">
                                Match Score
                              </div>
                              <div className="text-sm font-black text-[#0B0B09]">
                                {score.toFixed(0)}%
                              </div>
                            </div>

                            <div
                              className="grid h-8 w-8 place-items-center rounded-full border border-[#E5DCCF] bg-[#F6F1E8] text-[#6F675E] transition-transform duration-300"
                              style={{
                                transform: isExpanded
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                              }}
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <path d="m6 9 6 6 6-6" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="border-t border-[#E8DFD2] bg-[#F6F1E8]/46 px-5 pb-5 pt-5">
                            <div className="mb-6">
                              <span className="mb-2 block font-mono text-[9px] font-black uppercase tracking-widest text-[#A99F91]">
                                Original Source
                              </span>
                              <a
                                href={candidate.metadata?.resume_path}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center rounded-xl border border-[#F1CBAF] bg-[#FFF4EA] px-3 py-1.5 text-xs font-black text-[#FF5A1F] transition hover:bg-white"
                              >
                                View Raw Document
                              </a>
                            </div>

                            {Object.keys(criteriaBreakdown).length > 0 && (
                              <div className="mb-6">
                                <span className="mb-3 block font-mono text-[9px] font-black uppercase tracking-widest text-[#A99F91]">
                                  Semantic Dimension Weights
                                </span>

                                <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                                  {Object.entries(criteriaBreakdown).map(
                                    ([criterion, itemScore]) => (
                                      <div
                                        key={criterion}
                                        className="space-y-2"
                                      >
                                        <div className="flex justify-between text-xs">
                                          <span className="font-bold capitalize text-[#6F675E]">
                                            {criterion.replace(/_/g, " ")}
                                          </span>
                                          <span className="font-mono text-[#0B0B09]">
                                            {typeof itemScore === "number"
                                              ? itemScore.toFixed(0)
                                              : 0}
                                          </span>
                                        </div>

                                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E5DCCF]">
                                          <div
                                            className="h-full rounded-full bg-[#FF5A1F]"
                                            style={{
                                              width: `${Math.min(
                                                100,
                                                Math.max(
                                                  0,
                                                  typeof itemScore === "number"
                                                    ? itemScore
                                                    : 0
                                                )
                                              )}%`,
                                            }}
                                          />
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            )}

                            <div>
                              <span className="mb-3 block font-mono text-[9px] font-black uppercase tracking-widest text-[#A99F91]">
                                Extracted Entity Snapshot
                              </span>
                              <div className="max-h-32 overflow-y-auto rounded-2xl border border-[#E5DCCF] bg-white p-4 text-xs leading-6 text-[#6F675E]">
                                {candidate.metadata?.full_resume_text ||
                                  "No parseable text extracted."}
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

            <div className="light-panel relative flex h-[550px] w-full flex-col overflow-hidden rounded-[28px] bg-white/78 lg:h-full lg:w-1/3">
              <div className="flex items-center justify-between border-b border-[#E5DCCF] bg-white/52 p-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-xl bg-[#FFF4EA] text-[#FF5A1F]">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-[#0B0B09]">
                      Llama 3.2 Query
                    </h3>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#A99F91]">
                      Natural Language UI
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-5 overflow-y-auto bg-white/34 p-5">
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex w-full flex-col ${
                      message.sender === "bot" ? "items-start" : "items-end"
                    }`}
                  >
                    <span className="mb-1.5 px-1 font-mono text-[9px] font-black uppercase tracking-widest text-[#A99F91]">
                      {message.sender === "bot" ? "System" : "Operator"}
                    </span>

                    <div
                      className={`max-w-[90%] rounded-2xl p-4 text-[13px] leading-6 shadow-sm ${
                        message.sender === "bot"
                          ? "rounded-tl-sm border border-[#E5DCCF] bg-white text-[#6F675E]"
                          : "rounded-tr-sm bg-[#0B0B09] text-white"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}

                {isAsking && (
                  <div className="flex w-full flex-col items-start">
                    <span className="mb-1.5 px-1 font-mono text-[9px] font-black uppercase tracking-widest text-[#A99F91]">
                      System
                    </span>
                    <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-[#E5DCCF] bg-white p-4 shadow-sm">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#A99F91]" />
                      <span
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#A99F91]"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#A99F91]"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              <div className="border-t border-[#E5DCCF] bg-[#F6F1E8]/72 p-4">
                <form
                  onSubmit={handleAskQuestion}
                  className="relative flex items-center"
                >
                  <input
                    type="text"
                    className="input-resurank w-full rounded-2xl py-3.5 pl-4 pr-12 text-sm text-[#0B0B09] placeholder:text-[#A99F91]"
                    placeholder="Ask about candidates..."
                    value={userQuestion}
                    onChange={(e) => setUserQuestion(e.target.value)}
                    disabled={isAsking}
                  />

                  <button
                    type="submit"
                    disabled={isAsking || !userQuestion.trim()}
                    className="absolute right-2 grid h-9 w-9 place-items-center rounded-xl bg-[#FF5A1F] text-white transition hover:scale-105 disabled:opacity-50"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M22 2 11 13" />
                      <path d="m22 2-7 20-4-9-9-4 20-7z" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap');

        .console-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(to right, rgba(211, 116, 42, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(211, 116, 42, 0.1) 1px, transparent 1px);
          background-size: 54px 54px;
          mask-image: linear-gradient(to bottom, black, transparent 82%);
          -webkit-mask-image: linear-gradient(to bottom, black, transparent 82%);
        }

        .console-glow {
          position: absolute;
          top: 120px;
          right: -180px;
          width: 620px;
          height: 620px;
          pointer-events: none;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(255, 90, 31, 0.16), transparent 66%);
          filter: blur(32px);
        }

        .light-panel {
          background: rgba(255, 255, 255, 0.62);
          border: 1px solid rgba(229, 220, 207, 0.9);
          box-shadow:
            0 28px 70px rgba(55, 38, 20, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }

        .input-resurank {
          background: rgba(255, 255, 255, 0.72);
          border: 1px solid rgba(229, 220, 207, 0.95);
          box-shadow: inset 0 1px 2px rgba(55, 38, 20, 0.03);
          transition:
            background 0.3s cubic-bezier(0.16, 1, 0.3, 1),
            border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .input-resurank:focus {
          background: #ffffff;
          border-color: #FF5A1F;
          box-shadow:
            0 0 0 4px rgba(255, 90, 31, 0.1),
            inset 0 1px 2px rgba(55, 38, 20, 0.02);
          outline: none;
        }

        .candidate-card {
          transition:
            background 0.35s cubic-bezier(0.16, 1, 0.3, 1),
            border-color 0.35s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: #D8CDBE;
          border-radius: 999px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #B8AFA1;
        }
      `}</style>
    </div>
  );
}