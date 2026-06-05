import React from "react";

function AboutUsPage() {
  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans selection:bg-zinc-200 selection:text-zinc-900">
      
      {/* Editorial Header */}
      <section className="py-20 border-b border-slate-900/[0.06] bg-slate-50/20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="max-w-3xl space-y-6">
            <span className="inline-block text-[11px] font-bold tracking-widest text-slate-400 uppercase font-mono">
              Customers & Engineering // Mission
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-extrabold tracking-tighter text-slate-950 leading-[1.05]">
              Built for engineering recruiters.
            </h1>
            <p className="text-slate-550 text-base sm:text-lg leading-relaxed max-w-2xl">
              We design software tools that help companies bypass superficial keyword matches and evaluate talent using local semantic models.
            </p>
          </div>
        </div>
      </section>

      {/* Grid of Values & Principles */}
      <section className="py-24 border-b border-slate-900/[0.06]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          
          <div className="editorial-grid">
            <div className="grid grid-cols-1 md:grid-cols-2">
              
              <div className="editorial-cell p-8 sm:p-12 space-y-4 bg-white">
                <span className="font-mono text-[10px] text-slate-400 font-bold block uppercase">ENGINEERING PRINCIPLE 01</span>
                <h3 className="text-xl font-bold text-slate-950 tracking-tight">Local Vector Security</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Candidate resume files contain sensitive personal identifiable information (PII). In order to protect your candidate pool, we process embeddings entirely on local models, ensuring that data is never sent to third-party endpoints.
                </p>
              </div>

              <div className="editorial-cell p-8 sm:p-12 space-y-4 bg-slate-50/35">
                <span className="font-mono text-[10px] text-slate-400 font-bold block uppercase">ENGINEERING PRINCIPLE 02</span>
                <h3 className="text-xl font-bold text-slate-950 tracking-tight">Mathematical Score Criteria</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Candidate profiles are evaluated against multidimensional vectors across weighted role criteria. Our scoring logic utilizes cosine similarity parameters, yielding precise grades rather than simple pattern matching.
                </p>
              </div>

              <div className="editorial-cell p-8 sm:p-12 space-y-4 bg-slate-50/35">
                <span className="font-mono text-[10px] text-slate-400 font-bold block uppercase">ENGINEERING PRINCIPLE 03</span>
                <h3 className="text-xl font-bold text-slate-950 tracking-tight">Semantic Indexing Focus</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Standard search systems miss qualified talent due to spellings or synonyms. By mapping candidates to conceptual spaces, we can match "ML Engineer" to "Deep Learning Specialist" or identify relevant projects automatically.
                </p>
              </div>

              <div className="editorial-cell p-8 sm:p-12 space-y-4 bg-white">
                <span className="font-mono text-[10px] text-slate-400 font-bold block uppercase">ENGINEERING PRINCIPLE 04</span>
                <h3 className="text-xl font-bold text-slate-950 tracking-tight">Enterprise Scaling Logs</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  ResuRank scales candidate evaluations to support large pipelines. Spreadsheet queues process in parallel background tasks, feeding structured candidate indices to local models for quick recruiters dashboard lookups.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Corporate Info Footer details */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 font-mono text-[11px] text-slate-550">
            
            <div className="space-y-2">
              <span className="font-bold text-slate-950 uppercase block">System Architecture</span>
              <p className="text-slate-400 leading-relaxed font-sans text-xs">
                Built on Python FastAPI backend and React Vite frontend. Uses LangChain packages for local vector lookup flows and Ollama container servers.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-slate-950 uppercase block">Compliance & Security</span>
              <p className="text-slate-400 leading-relaxed font-sans text-xs">
                Files are downloaded temporarily into isolated server nodes and auto-expire in 10 minutes. Custom cursor scripts run on secure local variables.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-slate-950 uppercase block">Technical Support</span>
              <p className="text-slate-400 leading-relaxed font-sans text-xs">
                Recruiters can contact technical support for spreadsheet layout mapping problems or Ollama inference optimization.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

export default AboutUsPage;