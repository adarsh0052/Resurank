import React, { useState, useEffect } from "react";
import MinimalHeader from "./MinimalHeader";
import Footer from "./Footer";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [preferredTitles, setPreferredTitles] = useState("");
  const [industry, setIndustry] = useState("");
  
  // Premium interaction states
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("idle"); // 'idle' | 'saving' | 'saved'

  // Load existing profile on mount
  useEffect(() => {
    const saved = localStorage.getItem("resurank-profile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setName(parsed.name || "");
        setCompany(parsed.company || "");
        setRole(parsed.role || "");
        setPreferredTitles(parsed.preferredTitles || "");
        setIndustry(parsed.industry || "");
      } catch (e) {
        console.error("Failed to parse profile data");
      }
    }
  }, []);

  // Scroll reveal effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus("saving");

    // Simulated network delay for premium feel
    setTimeout(() => {
      const profileData = { name, company, role, preferredTitles, industry };
      localStorage.setItem("resurank-profile", JSON.stringify(profileData));
      
      setIsSaving(false);
      setSaveStatus("saved");
      
      // Reset status after a few seconds
      setTimeout(() => setSaveStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans selection:bg-zinc-200 selection:text-zinc-900 flex flex-col relative overflow-hidden">
      
      {/* ----------------------------------------------------------------------
          INJECTED CUSTOM STYLES
      ---------------------------------------------------------------------- */}
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-panel {
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
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
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.05), inset 0 2px 4px rgba(0, 0, 0, 0.01);
          outline: none;
        }

        .cta-button {
          position: relative;
          border: 1px solid transparent;
          background-clip: padding-box, border-box;
          background-origin: border-box;
          background-image: linear-gradient(to right, #ffffff, #ffffff), linear-gradient(to right, #3b82f6, #6366f1);
          color: #1e293b;
          font-weight: 600;
          box-shadow: 0 4px 12px 0 rgba(99, 102, 241, 0.05);
          transition: all 0.3s ease;
        }
        
        .cta-button:hover:not(:disabled) {
          background-image: linear-gradient(to right, #f8fafc, #f8fafc), linear-gradient(to right, #6366f1, #3b82f6);
          box-shadow: 0 4px 16px 0 rgba(99, 102, 241, 0.1);
          transform: translateY(-1px);
        }
        .cta-button:active:not(:disabled) { transform: scale(0.98); }

        .cta-success {
          background: #10B981 !important;
          color: white !important;
        }

        .reveal-on-scroll { opacity: 0; transform: translateY(20px); transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-on-scroll.is-visible { opacity: 1; transform: translateY(0); }

        .radar-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(16, 185, 129, 0.2);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
        }
        .radar-scan {
          position: absolute;
          top: 50%; left: 50%;
          width: 50%; height: 2px;
          background: linear-gradient(90deg, rgba(16,185,129,0.8), transparent);
          transform-origin: left center;
          animation: radar-spin 4s linear infinite;
        }

        @keyframes radar-spin { 100% { transform: translateY(-50%) rotate(360deg); } }
      `}} />

      {/* Spatial Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-[800px] bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.25] pointer-events-none -z-10" />
      <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-emerald-100/40 blur-[100px] rounded-full pointer-events-none -z-10" />

      <MinimalHeader />

      <main className="flex-grow flex items-center justify-center py-24 px-4 sm:px-6 lg:px-12 relative z-10">
        
        <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: Context & Storytelling Graphic */}
          <div className="lg:col-span-5 reveal-on-scroll space-y-8 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 bg-white/60 backdrop-blur-sm shadow-sm w-max">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-zinc-500"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-zinc-500 uppercase">
                System Parameters
              </span>
            </div>

            <div>
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-900 leading-[1.1] mb-6">
                Calibrate your <br/>
                <span className="text-zinc-400">vector target.</span>
              </h1>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-md">
                The engine uses your organization and role parameters to weight semantic distances. A recruiter searching for "Engineers" at a "Cloud Provider" receives dynamically adjusted relevance clusters.
              </p>
            </div>

            {/* Simulated Radar / Vector Targeting Graphic */}
            <div className="relative h-48 w-full max-w-md mt-12 bg-zinc-50/50 rounded-3xl border border-zinc-200/50 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-100/50" />
              
              <div className="relative w-full h-full">
                <div className="radar-ring w-16 h-16" />
                <div className="radar-ring w-32 h-32" />
                <div className="radar-ring w-48 h-48" />
                <div className="radar-scan" />
                
                {/* Data Nodes */}
                <div className="absolute top-[30%] left-[60%] w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                <div className="absolute top-[65%] left-[35%] w-1.5 h-1.5 rounded-full bg-zinc-400" />
                <div className="absolute top-[40%] left-[25%] w-2 h-2 rounded-full bg-emerald-400" />
              </div>

              <div className="absolute bottom-4 left-4 text-[9px] font-mono text-zinc-400 uppercase tracking-widest">
                Local Index Targeting
              </div>
            </div>
          </div>

          {/* RIGHT: Glassmorphic Configuration Form */}
          <div className="lg:col-span-7 reveal-on-scroll">
            <div className="glass-panel rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden shadow-2xl">
              
              {/* Form Header */}
              <div className="flex justify-between items-center mb-10 pb-6 border-b border-zinc-200/60">
                <h2 className="text-lg font-medium text-zinc-900 tracking-tight">Operator Profile</h2>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest bg-zinc-100 px-2 py-1 rounded">
                  Config.json
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Section 1: Identity */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono font-semibold text-zinc-500 uppercase tracking-widest">
                        Full Name //
                      </label>
                      <input
                        type="text"
                        className="input-luxury w-full rounded-xl px-4 py-3.5 text-sm text-zinc-900 placeholder-zinc-400"
                        placeholder="e.g. Jane Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono font-semibold text-zinc-500 uppercase tracking-widest">
                        Your Role //
                      </label>
                      <input
                        type="text"
                        className="input-luxury w-full rounded-xl px-4 py-3.5 text-sm text-zinc-900 placeholder-zinc-400"
                        placeholder="e.g. Technical Recruiter"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono font-semibold text-zinc-500 uppercase tracking-widest">
                      Organization //
                    </label>
                    <input
                      type="text"
                      className="input-luxury w-full rounded-xl px-4 py-3.5 text-sm text-zinc-900 placeholder-zinc-400"
                      placeholder="e.g. Acme Corp"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                </div>

                <div className="h-px w-full bg-zinc-200/60" />

                {/* Section 2: Targeting */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="flex justify-between text-[10px] font-mono font-semibold text-zinc-500 uppercase tracking-widest">
                      <span>Target Titles //</span>
                      <span className="font-normal opacity-60">Comma Separated</span>
                    </label>
                    <input
                      type="text"
                      className="input-luxury w-full rounded-xl px-4 py-3.5 text-sm text-zinc-900 placeholder-zinc-400"
                      placeholder="e.g. Software Engineer, Tech Lead"
                      value={preferredTitles}
                      onChange={(e) => setPreferredTitles(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono font-semibold text-zinc-500 uppercase tracking-widest">
                      Primary Industry //
                    </label>
                    <input
                      type="text"
                      className="input-luxury w-full rounded-xl px-4 py-3.5 text-sm text-zinc-900 placeholder-zinc-400"
                      placeholder="e.g. Fintech, Cloud Infrastructure"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={saveStatus === "saving" || saveStatus === "saved"}
                    className={`cta-button w-full flex items-center justify-center rounded-xl py-4 text-[13px] font-semibold tracking-wide transition-all duration-300 ${
                      saveStatus === "saved" ? "cta-success shadow-lg shadow-emerald-500/20" : "shadow-xl"
                    } ${saveStatus === "saving" ? "opacity-80" : ""}`}
                  >
                    {saveStatus === "idle" && "Sync Parameters"}
                    
                    {saveStatus === "saving" && (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Writing to Local Index...
                      </span>
                    )}

                    {saveStatus === "saved" && (
                      <span className="flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Parameters Synced
                      </span>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}