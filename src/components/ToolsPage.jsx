import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function ToolsPage() {
  const sliders = [
    { label: "Technical Execution", val: 85 },
    { label: "Systems Architecture", val: 92 },
    { label: "Academic Baseline", val: 40 },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[#F6F1E8] pb-28 text-[#0B0B09] selection:bg-[#FF5A1F]/20"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="tools-grid" aria-hidden="true" />
      <div className="tools-glow" aria-hidden="true" />

      <section className="relative z-10 mx-auto max-w-[1200px] px-6 pb-16 pt-40 text-center sm:px-12">
        <div className="reveal-on-scroll mx-auto max-w-4xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#E1D7C8] bg-white/70 px-2 py-1.5 shadow-sm backdrop-blur">
            <span className="rounded-full bg-[#FF5A1F] px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-white">
              Tools
            </span>
            <span className="pr-2 text-xs font-bold text-[#6F675E]">
              Platform architecture
            </span>
          </div>

          <h1 className="text-5xl font-black leading-[1.02] tracking-tight text-[#090907] sm:text-6xl lg:text-[5.3rem]">
            Designed for speed.
            <br />
            <span className="text-[#B8AFA1]">Optimized for fit.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[#6F675E]">
            ResuRank bypasses brittle keyword filters. We run local vector
            engines to grade bulk datasets, dynamically adjust criteria logic,
            and query deep candidate structures securely.
          </p>
        </div>
      </section>

      <main className="relative z-10 mx-auto max-w-[1200px] px-6 sm:px-12">
        <section className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="reveal-on-scroll light-panel light-card-hover relative overflow-hidden rounded-[28px] p-6 sm:p-8 md:col-span-7 lg:p-10">
            <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#FF5A1F]/10 blur-3xl" />

            <div className="relative z-10 mb-12">
              <span className="mb-4 block font-mono text-[10px] font-black uppercase tracking-widest text-[#A99F91]">
                01 // Evaluation Engine
              </span>
              <h3 className="mb-4 text-3xl font-black tracking-tight text-[#0B0B09]">
                Dynamic Matrix Weighting
              </h3>
              <p className="max-w-md text-sm leading-7 text-[#6F675E]">
                Slide logic parameters to instantly recalculate the vector
                distance of your entire candidate database. Prioritize
                architecture over academics in milliseconds.
              </p>
            </div>

            <div className="relative z-10 space-y-6 rounded-[24px] border border-[#E5DCCF] bg-white/80 p-6 shadow-sm">
              {sliders.map((item) => (
                <div key={item.label} className="space-y-3">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="font-mono uppercase tracking-wider text-[#6F675E]">
                      {item.label}
                    </span>
                    <span className="font-mono text-[#0B0B09]">
                      {item.val}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue={item.val}
                    className="weight-slider pointer-events-none"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-on-scroll light-panel light-card-hover relative overflow-hidden rounded-[28px] p-6 sm:p-8 md:col-span-5 lg:p-10">
            <div className="relative z-10 mb-12">
              <span className="mb-4 block font-mono text-[10px] font-black uppercase tracking-widest text-[#A99F91]">
                02 // Storage Layer
              </span>
              <h3 className="mb-4 text-3xl font-black tracking-tight text-[#0B0B09]">
                Local Indexing
              </h3>
              <p className="text-sm leading-7 text-[#6F675E]">
                We embed text structures locally. No APIs. No cloud leaks.
                Absolute privacy via ChromaDB.
              </p>
            </div>

            <div className="relative z-10 overflow-hidden rounded-[24px] bg-[#0B0B09] p-6 font-mono text-[10px] leading-relaxed shadow-[0_30px_80px_rgba(11,11,9,0.24)]">
              <div className="mb-4 flex gap-1.5 border-b border-white/[0.08] pb-3">
                <div className="h-2.5 w-2.5 rounded-full bg-white/18" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/18" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#FF5A1F]" />
              </div>
              <div className="space-y-1.5 text-white/62">
                <p>
                  <span className="text-[#FF8B5F]">import</span> chroma_db
                </p>
                <p className="pt-2 text-white/32"># Map semantic dimensions</p>
                <p>nodes = model.embed(resume_chunks)</p>
                <p>chroma_db.insert(</p>
                <p className="pl-4">vectors=nodes,</p>
                <p className="pl-4">
                  privacy_lock=<span className="text-[#FF8B5F]">True</span>
                </p>
                <p>)</p>
              </div>
            </div>
          </div>

          <div className="reveal-on-scroll light-panel light-card-hover relative overflow-hidden rounded-[28px] p-6 sm:p-8 md:col-span-6 lg:p-10">
            <div className="relative z-10 mb-12">
              <span className="mb-4 block font-mono text-[10px] font-black uppercase tracking-widest text-[#A99F91]">
                03 // Llama Inference
              </span>
              <h3 className="mb-4 text-3xl font-black tracking-tight text-[#0B0B09]">
                Conversational Search
              </h3>
              <p className="text-sm leading-7 text-[#6F675E]">
                Query your parsed pool using natural language. The integrated
                Llama 3.2 model extracts contexts standard search completely
                misses.
              </p>
            </div>

            <div className="relative z-10 space-y-4">
              <div className="ml-auto w-[85%] rounded-2xl rounded-tr-sm border border-[#E5DCCF] bg-white p-4 shadow-sm">
                <span className="mb-1 block font-mono text-[9px] font-black uppercase tracking-widest text-[#A99F91]">
                  Operator
                </span>
                <p className="text-xs leading-6 text-[#6F675E]">
                  "Who has built distributed GPU orchestration pipelines?"
                </p>
              </div>

              <div className="w-[85%] rounded-2xl rounded-tl-sm bg-[#0B0B09] p-4 shadow-xl">
                <span className="mb-1 block font-mono text-[9px] font-black uppercase tracking-widest text-white/32">
                  System
                </span>
                <p className="text-xs leading-6 text-white/62">
                  "Sarah Chen has 4+ years of scale experience writing CUDA and
                  PyTorch workload packages."
                </p>
              </div>
            </div>
          </div>

          <div className="reveal-on-scroll light-panel light-card-hover relative overflow-hidden rounded-[28px] p-6 sm:p-8 md:col-span-6 lg:p-10">
            <div className="relative z-10 mb-12">
              <span className="mb-4 block font-mono text-[10px] font-black uppercase tracking-widest text-[#FF5A1F]">
                04 // Protocol
              </span>
              <h3 className="mb-4 text-3xl font-black tracking-tight text-[#0B0B09]">
                Zero-Trust Security
              </h3>
              <p className="text-sm leading-7 text-[#6F675E]">
                Candidate PII never leaves your machine. Temporary files are
                ingested, vectorized into mathematical hashes, and purged
                automatically after 10 minutes.
              </p>
            </div>

            <div className="relative z-10 rounded-[24px] border border-[#E5DCCF] bg-white/80 p-6 font-mono text-[10px] shadow-sm">
              <div className="space-y-4 text-[#6F675E]">
                <div className="flex items-center justify-between gap-4 border-b border-[#E8DFD2] pb-3">
                  <span className="uppercase tracking-widest">
                    Network Extrapolation
                  </span>
                  <span className="rounded bg-[#F0E8DC] px-2 py-1 font-black text-[#0B0B09]">
                    ISOLATED / NONE
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b border-[#E8DFD2] pb-3">
                  <span className="uppercase tracking-widest">
                    File Ingestion Cache
                  </span>
                  <span className="rounded bg-[#F0E8DC] px-2 py-1 font-black text-[#0B0B09]">
                    10 MINUTE EXPIRY
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="uppercase tracking-widest">
                    System Status
                  </span>
                  <span className="flex items-center gap-2 font-black text-[#FF5A1F]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A1F]" />
                    SECURE_NODE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="reveal-on-scroll pt-16 text-center">
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0B0B09] p-8 text-white shadow-[0_30px_80px_rgba(11,11,9,0.24)] sm:p-12">
            <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#FF5A1F]/30 blur-3xl" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(ellipse_at_bottom,rgba(255,90,31,0.25),transparent_70%)]" />

            <div className="relative z-10">
              <div className="mx-auto mb-7 grid h-16 w-16 place-items-center rounded-2xl bg-[#FF5A1F] text-white shadow-lg">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v20" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>

              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                Ready to initialize the engine?
              </h2>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/62">
                Launch your secure local workspace and evaluate your first batch
                of resumes in seconds.
              </p>

              <div className="pt-8">
                <Link
                  to="/resume-screener-bot"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-white px-8 text-xs font-black text-[#0B0B09] transition hover:bg-[#F6F1E8] active:scale-[0.98]"
                >
                  Launch Console Terminal
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap');

        .tools-grid {
          position: absolute;
          inset: 0 0 auto 0;
          height: 640px;
          pointer-events: none;
          background-image:
            linear-gradient(to right, rgba(211, 116, 42, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(211, 116, 42, 0.1) 1px, transparent 1px);
          background-size: 54px 54px;
          mask-image: linear-gradient(to bottom, black, transparent 76%);
          -webkit-mask-image: linear-gradient(to bottom, black, transparent 76%);
        }

        .tools-glow {
          position: absolute;
          top: 160px;
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

        .light-card-hover {
          transition:
            transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
            background 0.35s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .light-card-hover:hover {
          transform: translateY(-3px);
          background: rgba(255, 255, 255, 0.9);
          box-shadow:
            0 24px 58px rgba(55, 38, 20, 0.09),
            inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(24px);
          transition:
            opacity 0.78s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.78s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .weight-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 3px;
          border-radius: 999px;
          background: #E5DCCF;
          outline: none;
        }

        .weight-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 999px;
          background: #FF5A1F;
          border: 3px solid #FFFFFF;
          box-shadow: 0 4px 10px rgba(55, 38, 20, 0.18);
        }
      `}</style>
    </div>
  );
}