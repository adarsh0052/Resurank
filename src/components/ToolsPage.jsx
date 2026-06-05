import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function ToolsPage() {
  
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

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white relative overflow-hidden">
      
      {/* ----------------------------------------------------------------------
          INJECTED CUSTOM STYLES
      ---------------------------------------------------------------------- */}
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-panel {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        .glass-card-hover {
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .glass-card-hover:hover {
          background: rgba(255, 255, 255, 0.85);
          transform: translateY(-4px);
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 1);
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
        
        .cta-button:hover {
          background-image: linear-gradient(to right, #f8fafc, #f8fafc), linear-gradient(to right, #6366f1, #3b82f6);
          box-shadow: 0 4px 16px 0 rgba(99, 102, 241, 0.1);
          transform: translateY(-1px);
        }
        .cta-button:active { transform: scale(0.98); }

        .reveal-on-scroll { opacity: 0; transform: translateY(30px); transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-on-scroll.is-visible { opacity: 1; transform: translateY(0); }

        .weight-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 2px;
          background: #E4E4E7;
          border-radius: 2px;
          outline: none;
        }
        .weight-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #1e293b;
          cursor: pointer;
          border: 2px solid #FAFAFA;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}} />

      {/* Abstract Background Topology */}
      <div className="absolute top-0 left-0 right-0 h-[800px] bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.25] pointer-events-none -z-10" />
      <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-emerald-100/30 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* ----------------------------------------------------------------------
          HERO SECTION (Narrative Driven)
      ---------------------------------------------------------------------- */}
      <section className="pt-40 pb-24 relative z-10 px-6 sm:px-12">
        <div className="max-w-[1200px] mx-auto text-center reveal-on-scroll">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-zinc-200 bg-white/60 backdrop-blur-md shadow-sm mb-8">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-zinc-500"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-zinc-500 uppercase">
              Platform Architecture
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-semibold tracking-tighter text-zinc-900 leading-[1.05] mb-8">
            Designed for speed. <br className="hidden sm:block" />
            <span className="text-zinc-400">Optimized for fit.</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-zinc-500 font-light leading-relaxed max-w-2xl mx-auto">
            ResuRank bypasses brittle keyword filters. We run local vector engines to grade bulk datasets, dynamically adjust criteria logic, and query deep candidate structures securely.
          </p>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          ASYMMETRIC CAPABILITIES GRID
      ---------------------------------------------------------------------- */}
      <section className="py-12 px-6 sm:px-12 relative z-10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">

          {/* BLOCK 1: Dynamic Weighting (Col-span-7) */}
          <div className="md:col-span-7 glass-panel glass-card-hover rounded-[2.5rem] p-10 sm:p-12 flex flex-col justify-between overflow-hidden relative reveal-on-scroll">
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-zinc-200/50 blur-[60px] rounded-full pointer-events-none" />
            
            <div className="mb-16 relative z-10">
              <span className="font-mono text-[10px] text-zinc-400 font-bold block uppercase tracking-widest mb-4">
                01 // Evaluation Engine
              </span>
              <h3 className="text-3xl font-semibold text-zinc-900 tracking-tight mb-4">
                Dynamic Matrix Weighting
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-md">
                Slide logic parameters to instantly recalculate the vector distance of your entire candidate database. Prioritize architecture over academics in milliseconds.
              </p>
            </div>

            {/* Simulated UI: Sliders */}
            <div className="bg-white/80 border border-zinc-200/60 rounded-2xl p-6 shadow-sm relative z-10 space-y-6">
              {[
                { label: "Technical Execution", val: 85 },
                { label: "Systems Architecture", val: 92 },
                { label: "Academic Baseline", val: 40 }
              ].map((item, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between text-xs font-mono font-medium">
                    <span className="text-zinc-500 uppercase tracking-wider">{item.label}</span>
                    <span className="text-zinc-900">{item.val}%</span>
                  </div>
                  <input type="range" min="0" max="100" defaultValue={item.val} className="weight-slider pointer-events-none" />
                </div>
              ))}
            </div>
          </div>

          {/* BLOCK 2: Local Vector Store (Col-span-5) */}
          <div className="md:col-span-5 glass-panel glass-card-hover rounded-[2.5rem] p-10 sm:p-12 flex flex-col justify-between overflow-hidden relative reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
            <div className="mb-16 relative z-10">
              <span className="font-mono text-[10px] text-zinc-400 font-bold block uppercase tracking-widest mb-4">
                02 // Storage Layer
              </span>
              <h3 className="text-3xl font-semibold text-zinc-900 tracking-tight mb-4">
                Local Indexing
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                We embed text structures locally. No APIs. No cloud leaks. Absolute privacy via ChromaDB.
              </p>
            </div>

            {/* Simulated UI: Code Environment */}
            <div className="bg-slate-950 rounded-2xl p-6 shadow-2xl relative z-10 font-mono text-[10px] leading-relaxed overflow-hidden">
              <div className="flex gap-1.5 mb-4 border-b border-zinc-800 pb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              </div>
              <div className="text-zinc-400 space-y-1.5">
                <p><span className="text-emerald-400">import</span> chroma_db</p>
                <p className="pt-2"># Map to semantic dimensions</p>
                <p>nodes = model.embed(resume_chunks)</p>
                <p>chroma_db.insert(</p>
                <p className="pl-4">vectors=nodes,</p>
                <p className="pl-4">privacy_lock=<span className="text-amber-300">True</span></p>
                <p>)</p>
              </div>
            </div>
          </div>

          {/* BLOCK 3: Llama Q&A (Col-span-6) */}
          <div className="md:col-span-6 glass-panel glass-card-hover rounded-[2.5rem] p-10 sm:p-12 flex flex-col justify-between overflow-hidden relative reveal-on-scroll">
            <div className="mb-16 relative z-10">
              <span className="font-mono text-[10px] text-zinc-400 font-bold block uppercase tracking-widest mb-4">
                03 // Llama Inference
              </span>
              <h3 className="text-3xl font-semibold text-zinc-900 tracking-tight mb-4">
                Conversational Search
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Query your parsed pool using natural language. The integrated Llama 3.2 model extracts contexts standard search completely misses.
              </p>
            </div>

            {/* Simulated UI: Chat bubbles */}
            <div className="space-y-4 relative z-10">
              <div className="bg-white border border-zinc-200/80 rounded-2xl rounded-tr-sm p-4 w-[85%] shadow-sm ml-auto">
                <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest block mb-1">Operator</span>
                <p className="text-xs text-zinc-700 leading-relaxed">"Who has built distributed GPU orchestration pipelines?"</p>
              </div>
              <div className="bg-slate-900 rounded-2xl rounded-tl-sm p-4 w-[85%] shadow-xl">
                <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block mb-1">System</span>
                <p className="text-xs text-zinc-300 leading-relaxed">"Sarah Chen has 4+ years of scale experience writing CUDA and PyTorch workload packages."</p>
              </div>
            </div>
          </div>

          {/* BLOCK 4: Security (Col-span-6) */}
          <div className="md:col-span-6 glass-panel glass-card-hover rounded-[2.5rem] p-10 sm:p-12 flex flex-col justify-between overflow-hidden relative reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
            <div className="mb-16 relative z-10">
              <span className="font-mono text-[10px] text-emerald-500 font-bold block uppercase tracking-widest mb-4">
                04 // Protocol
              </span>
              <h3 className="text-3xl font-semibold text-zinc-900 tracking-tight mb-4">
                Zero-Trust Security
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Candidate PII never leaves your machine. Temporary files are ingested, vectorized into mathematical hashes, and purged automatically after 10 minutes.
              </p>
            </div>

            {/* Simulated UI: Security Terminal */}
            <div className="bg-white/80 border border-zinc-200/60 rounded-2xl p-6 shadow-sm relative z-10 font-mono text-[10px]">
              <div className="space-y-4 text-zinc-500">
                <div className="flex items-center justify-between border-b border-zinc-200/80 pb-3">
                  <span className="uppercase tracking-widest">Network Extrapolation</span>
                  <span className="px-2 py-1 bg-zinc-100 rounded text-zinc-900 font-semibold">ISOLATED / NONE</span>
                </div>
                <div className="flex items-center justify-between border-b border-zinc-200/80 pb-3">
                  <span className="uppercase tracking-widest">File Ingestion Cache</span>
                  <span className="px-2 py-1 bg-zinc-100 rounded text-zinc-900 font-semibold">10 MINUTE EXPIRY</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="uppercase tracking-widest">System Status</span>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-emerald-600 font-bold">SECURE_NODE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ----------------------------------------------------------------------
          FINAL CTA SECTION
      ---------------------------------------------------------------------- */}
      <section className="py-32 px-6 relative z-10 text-center reveal-on-scroll">
        <div className="max-w-2xl mx-auto space-y-8 glass-panel rounded-[3rem] p-12 shadow-2xl">
          <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-blue-600 to-indigo-650 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-900 tracking-tight">
            Ready to initialize the engine?
          </h2>
          <p className="text-zinc-500 text-sm">
            Launch your secure local workspace and evaluate your first batch of resumes in seconds.
          </p>
          <div className="pt-4">
            <Link
              to="/resume-screener-bot"
              className="cta-button inline-flex items-center justify-center px-10 py-4 text-[13px] font-semibold tracking-wide rounded-full shadow-xl"
            >
              Launch Console Terminal
              <svg className="ml-2 w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}