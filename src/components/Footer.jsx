import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-[#FAFAFA] pt-32 pb-8 overflow-hidden font-sans border-t border-zinc-200/50">
      
      {/* ----------------------------------------------------------------------
          INJECTED CUSTOM STYLES
      ---------------------------------------------------------------------- */}
      <style dangerouslySetInnerHTML={{ __html: `
        .footer-glass {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 1);
        }
        
        .giant-text {
          font-size: clamp(6rem, 15vw, 20rem);
          line-height: 0.8;
          background: linear-gradient(180deg, rgba(9,9,11,0.03) 0%, rgba(9,9,11,0.0) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          user-select: none;
        }

        .spec-row:hover .spec-dots {
          border-color: #A1A1AA;
        }
      `}} />

      {/* Abstract Ambient Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-zinc-200/30 to-transparent blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 pb-24">
          
          {/* Left Column: Brand & Mission */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link to="/" className="flex items-center gap-3 group w-max">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-white shadow-lg transition-transform duration-500 group-hover:scale-105 group-hover:rotate-[15deg]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-zinc-800 to-transparent opacity-50 rounded-xl" />
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[16px] font-semibold tracking-tight text-zinc-950 leading-none mb-1">
                    ResuRank
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase leading-none">
                    Intelligence Engine
                  </span>
                </div>
              </Link>
              
              <p className="mt-8 text-sm text-zinc-500 leading-relaxed max-w-sm">
                Next-generation vector indexing and semantic evaluation for enterprise talent pipelines. Operates entirely locally for zero-trust security.
              </p>
            </div>

            {/* Hardware-style Status Indicator */}
            <div className="mt-12 inline-flex items-center gap-3 px-4 py-2.5 rounded-full border border-zinc-200/80 bg-white/50 backdrop-blur-md shadow-sm w-max">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-mono font-semibold tracking-widest text-zinc-600 uppercase">
                System Active // v2.0
              </span>
            </div>
          </div>

          {/* Middle Column: Navigation */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8 lg:px-8">
            {/* Nav Group 1 */}
            <div className="space-y-6">
              <h4 className="text-[11px] font-mono font-semibold tracking-widest text-zinc-400 uppercase">
                Platform
              </h4>
              <ul className="space-y-4">
                {["Workspace", "Vector Store", "LLM Integration", "Security"].map((item) => (
                  <li key={item}>
                    <Link to="/tools" className="group flex items-center text-[13px] font-medium text-zinc-600 hover:text-zinc-950 transition-colors">
                      {item}
                      <svg className="w-3 h-3 ml-2 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Nav Group 2 */}
            <div className="space-y-6">
              <h4 className="text-[11px] font-mono font-semibold tracking-widest text-zinc-400 uppercase">
                Company
              </h4>
              <ul className="space-y-4">
                {["Customers", "Documentation", "Help Center", "Privacy Policy"].map((item) => (
                  <li key={item}>
                    <Link to="/about" className="group flex items-center text-[13px] font-medium text-zinc-600 hover:text-zinc-950 transition-colors">
                      {item}
                      <svg className="w-3 h-3 ml-2 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Premium Technical Readout Card */}
          <div className="lg:col-span-4">
            <div className="footer-glass rounded-3xl p-8 w-full relative overflow-hidden group">
              {/* Subtle top inner glow */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
              
              <div className="flex justify-between items-center mb-8 border-b border-zinc-200/50 pb-4">
                <h4 className="text-[11px] font-mono font-semibold tracking-widest text-zinc-900 uppercase">
                  Engine Specifications
                </h4>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Vector Index Store", val: "ChromaDB" },
                  { label: "Semantic Embeddings", val: "nomic-embed" },
                  { label: "LLM Integration", val: "Ollama L3.2" },
                  { label: "Precision Rate", val: "94.8%" }
                ].map((spec, i) => (
                  <div key={i} className="spec-row flex items-end justify-between group/row cursor-default">
                    <span className="text-[12px] font-medium text-zinc-500 transition-colors group-hover/row:text-zinc-900">
                      {spec.label}
                    </span>
                    <div className="spec-dots flex-grow mx-3 border-b border-dotted border-zinc-200 transition-colors" />
                    <span className="text-[12px] font-mono font-semibold text-zinc-900">
                      {spec.val}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-4 border-t border-zinc-200/50 flex justify-between items-center text-[10px] font-mono text-zinc-400 uppercase">
                <span>Latency</span>
                <span className="text-emerald-500 font-bold">&lt; 12ms</span>
              </div>
            </div>
          </div>

        </div>

        {/* Huge Architectural Typography */}
        <div className="w-full text-center mt-8 -mb-4 relative z-0 flex justify-center items-center overflow-hidden">
          <h1 className="giant-text font-semibold tracking-tighter">
            RESURANK
          </h1>
        </div>

        {/* Absolute Bottom Copyright Bar */}
        <div className="border-t border-zinc-200/50 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-medium text-zinc-500 relative z-10">
          <p>© {new Date().getFullYear()} ResuRank AI Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-zinc-900 cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-zinc-900 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-zinc-900 cursor-pointer transition-colors">System Status</span>
          </div>
        </div>

      </div>
    </footer>
  );
}