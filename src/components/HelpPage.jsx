import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HelpPage() {
  const [activeFaq, setActiveFaq] = useState(null);

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

  const faqs = [
    {
      q: "Can I upload multiple resumes at once?",
      a: "Yes. ResuRank supports uploading bulk candidate lists via standard Excel spreadsheets for parallel background parsing and scoring across your local environment."
    },
    {
      q: "Is candidate data secure?",
      a: "Absolutely. The system relies on local embeddings and runs vector queries directly on your hardware. Files never touch external cloud APIs and are purged instantly after indexing."
    },
    {
      q: "How accurate is the evaluation engine?",
      a: "Our semantic scoring matches manual human keyword validation methods with a verified 94.8% alignment across standard technical and engineering criteria."
    }
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#09090B] font-sans selection:bg-zinc-900 selection:text-white relative overflow-hidden pb-32">
      
      {/* ----------------------------------------------------------------------
          INJECTED CUSTOM STYLES
      ---------------------------------------------------------------------- */}
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-panel {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        .glass-card-hover {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .glass-card-hover:hover {
          background: rgba(255, 255, 255, 0.9);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        .reveal-on-scroll { opacity: 0; transform: translateY(20px); transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-on-scroll.is-visible { opacity: 1; transform: translateY(0); }

        .faq-content {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .faq-content.open {
          grid-template-rows: 1fr;
        }
        .faq-inner {
          overflow: hidden;
        }
      `}} />

      {/* Abstract Background Topology */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-zinc-200/40 to-transparent pointer-events-none -z-10" />
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-emerald-100/30 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* ----------------------------------------------------------------------
          HERO SECTION
      ---------------------------------------------------------------------- */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 pt-40 pb-20">
        <div className="reveal-on-scroll space-y-6 max-w-2xl">
          <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-zinc-200 bg-white/50 backdrop-blur-md shadow-sm w-max">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-zinc-500"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-zinc-500 uppercase">
              Knowledge Base
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight text-zinc-900 leading-[1.1]">
            System architecture <br/>
            <span className="text-zinc-400">& documentation.</span>
          </h1>
          <p className="text-lg text-zinc-500 leading-relaxed font-light">
            Reference instructions on configuring your local workspace, mapping vector search parameters, and deploying the AI evaluation engine.
          </p>
        </div>
      </div>

      {/* ----------------------------------------------------------------------
          MAIN LAYOUT (Spatial Asymmetric Grid)
      ---------------------------------------------------------------------- */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
        
        {/* LEFT COLUMN: Sticky Navigation & Support Node */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-8 reveal-on-scroll">
          
          {/* Quick Nav Panel */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8">
            <h3 className="text-[11px] font-mono font-semibold tracking-widest text-zinc-400 uppercase mb-6">
              Directory
            </h3>
            <ul className="space-y-4">
              {["System Configuration", "Engine Capabilities", "Vector Architecture", "Security Protocols"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="group flex items-center text-[13px] font-medium text-zinc-600 hover:text-zinc-900 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-200 mr-3 group-hover:bg-zinc-900 transition-colors" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Premium Support Card */}
          <div className="bg-zinc-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl">
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full pointer-events-none" />
            
            <h3 className="text-[11px] font-mono font-semibold tracking-widest text-zinc-400 uppercase mb-4 relative z-10">
              Direct Support
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed mb-8 relative z-10">
              Need to escalate a pipeline layout mismatch or document indexing failure? Connect with our systems team.
            </p>

            <div className="space-y-4 mb-8 relative z-10">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Endpoint</span>
                <span className="text-[11px] font-mono text-zinc-200">support@resurank.com</span>
              </div>
              <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Latency</span>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  &lt; 2 Hours
                </span>
              </div>
            </div>

            <Link 
              to="/resume-screener-bot" 
              className="group relative w-full flex items-center justify-center h-12 bg-white text-zinc-950 rounded-xl text-xs font-semibold tracking-wide hover:scale-[1.02] transition-transform z-10"
            >
              Open Terminal Workspace
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: Content Stream */}
        <div className="lg:col-span-8 space-y-16">
          
          {/* SECTION: Pipeline Configuration */}
          <section className="reveal-on-scroll scroll-mt-32">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-white shadow-sm border border-zinc-100 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight">Pipeline Configuration</h2>
            </div>
            
            <p className="text-zinc-500 mb-10 leading-relaxed text-sm">
              Prepare your candidate spreadsheet, map the vector criteria profile, and initialize the parsing sequence.
            </p>

            {/* Premium Vertical Pipeline Timeline */}
            <div className="relative pl-6 sm:pl-8 border-l-2 border-zinc-100 space-y-12">
              {[
                { title: "Authenticate Session", desc: "Initialize your secure local environment by launching the console." },
                { title: "Prepare Data Structures", desc: "Format your CSV or Excel ledger with standard columns: Candidate Name and Resume Document URL." },
                { title: "Execute Upload", desc: "Drop the file into the active workspace. The engine automatically downloads, cleans, and indexes the raw documents." },
                { title: "Query & Rank", desc: "Interact directly with the localized candidate base via natural language or view the weighted matrix." }
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  {/* Node */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-5 h-5 rounded-full bg-white border-[3px] border-zinc-200 flex items-center justify-center z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
                  </div>
                  
                  <div className="glass-panel glass-card-hover rounded-2xl p-6 relative">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase mb-2 block">
                      Sequence 0{idx + 1}
                    </span>
                    <h3 className="text-lg font-medium text-zinc-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION: Engine Capabilities */}
          <section className="reveal-on-scroll pt-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-white shadow-sm border border-zinc-100 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/></svg>
              </div>
              <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight">Engine Capabilities</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Parallel Extraction", desc: "Parse text semantics from heavy PDF and DOCX payloads asynchronously." },
                { title: "Dynamic Scoring", desc: "Adjust priority sliders to instantly recalculate vector distances." },
                { title: "Editorial Layouts", desc: "Review standardized candidate matrices stripped of visual noise." },
                { title: "Llama 3.2 Dialogue", desc: "Chat directly with the indexed files to extract specific historical context." }
              ].map((feature, i) => (
                <div key={i} className="glass-panel glass-card-hover rounded-2xl p-6">
                  <h3 className="text-sm font-semibold text-zinc-900 mb-2">{feature.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION: FAQ Knowledge Base */}
          <section className="reveal-on-scroll pt-8">
             <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-white shadow-sm border border-zinc-100 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </div>
              <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div 
                    key={idx} 
                    className={`glass-panel rounded-2xl transition-all duration-300 overflow-hidden cursor-pointer ${isOpen ? 'bg-white/90 shadow-md' : 'hover:bg-white/70'}`}
                    onClick={() => toggleFaq(idx)}
                  >
                    <div className="p-6 flex justify-between items-center">
                      <span className="text-[14px] font-medium text-zinc-900 pr-8">{faq.q}</span>
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center transition-transform duration-300" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                      </div>
                    </div>
                    <div className={`faq-content ${isOpen ? 'open' : ''}`}>
                      <div className="faq-inner">
                        <div className="px-6 pb-6 pt-0 text-sm text-zinc-500 leading-relaxed border-t border-zinc-100/50 mt-2 pt-4">
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}