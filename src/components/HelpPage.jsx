import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HelpPage() {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: "Can I upload multiple resumes at once?",
      a: "Yes. ResuRank supports bulk candidate uploads through standard spreadsheets, then parses and scores each profile through the same structured ranking workflow.",
    },
    {
      q: "Is candidate data secure?",
      a: "Candidate data is processed in your local workspace. Resumes are converted into searchable context for ranking without requiring external cloud review.",
    },
    {
      q: "How accurate is the evaluation engine?",
      a: "The engine combines semantic matching, weighted criteria, and explainable scoring so hiring teams can review why a candidate ranked highly before making a decision.",
    },
  ];

  const directory = [
    "System Configuration",
    "Engine Capabilities",
    "Vector Architecture",
    "Security Protocols",
  ];

  const pipelineSteps = [
    {
      title: "Authenticate Session",
      desc: "Launch your secure workspace and prepare the screening environment.",
    },
    {
      title: "Prepare Data Structures",
      desc: "Format your spreadsheet with candidate names, roles, and resume document links.",
    },
    {
      title: "Execute Upload",
      desc: "Drop the file into the active workspace so the engine can clean, parse, and index documents.",
    },
    {
      title: "Query & Rank",
      desc: "Ask questions, adjust scoring priorities, or review the generated candidate matrix.",
    },
  ];

  const capabilities = [
    {
      title: "Parallel Extraction",
      desc: "Parse semantic detail from PDF and DOCX payloads asynchronously.",
    },
    {
      title: "Dynamic Scoring",
      desc: "Adjust priority sliders and recalculate candidate fit instantly.",
    },
    {
      title: "Candidate Matrices",
      desc: "Review standardized shortlists with evidence attached to every rank.",
    },
    {
      title: "AI Dialogue",
      desc: "Chat with indexed resume context to find exact experience signals.",
    },
  ];

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

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
      className="relative min-h-screen overflow-hidden bg-[#F6F1E8] pb-32 text-[#0B0B09] selection:bg-[#FF5A1F]/20"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="help-grid" aria-hidden="true" />
      <div className="help-glow" aria-hidden="true" />

      <section className="mx-auto max-w-[1200px] px-6 pb-18 pt-40 sm:px-12">
        <div className="reveal-on-scroll max-w-3xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#E1D7C8] bg-white/70 px-2 py-1.5 shadow-sm backdrop-blur">
            <span className="rounded-full bg-[#FF5A1F] px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-white">
              Help
            </span>
            <span className="pr-2 text-xs font-bold text-[#6F675E]">
              Knowledge base and workspace setup
            </span>
          </div>

          <h1 className="text-5xl font-black leading-[1.02] tracking-tight text-[#090907] sm:text-6xl lg:text-[5.3rem]">
            System support
            <br />
            <span className="text-[#B8AFA1]">for hiring workflows.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#6F675E]">
            Reference instructions for configuring your local workspace,
            mapping ranking criteria, and running the ResuRank evaluation engine
            with confidence.
          </p>
        </div>
      </section>

      <main className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-10 px-6 sm:px-12 lg:grid-cols-12 lg:gap-16">
        <aside className="reveal-on-scroll space-y-5 lg:sticky lg:top-28 lg:col-span-4">
          <div className="light-panel rounded-[28px] p-6 sm:p-8">
            <h3 className="mb-6 font-mono text-[11px] font-black uppercase tracking-widest text-[#9A9083]">
              Directory
            </h3>

            <ul className="space-y-2">
              {directory.map((item) => (
                <li key={item}>
                  <a
                    href="#configuration"
                    className="group flex items-center rounded-2xl px-3 py-3 text-sm font-bold text-[#6F675E] transition hover:bg-white hover:text-[#0B0B09]"
                  >
                    <span className="mr-3 h-1.5 w-1.5 rounded-full bg-[#D8CDBE] transition group-hover:bg-[#FF5A1F]" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0B0B09] p-6 text-white shadow-[0_30px_80px_rgba(11,11,9,0.24)] sm:p-8">
            <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#FF5A1F]/30 blur-3xl" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(ellipse_at_bottom,rgba(255,90,31,0.25),transparent_70%)]" />

            <div className="relative z-10">
              <h3 className="mb-4 font-mono text-[11px] font-black uppercase tracking-widest text-white/38">
                Direct Support
              </h3>

              <p className="mb-8 text-sm leading-7 text-white/62">
                Need to escalate a pipeline mismatch or indexing failure?
                Connect with the systems team and keep your screening flow
                moving.
              </p>

              <div className="mb-8 space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <span className="font-mono text-[10px] uppercase text-white/32">
                    Endpoint
                  </span>
                  <span className="font-mono text-[11px] text-white/78">
                    support@resurank.com
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <span className="font-mono text-[10px] uppercase text-white/32">
                    Latency
                  </span>
                  <span className="flex items-center gap-2 font-mono text-[11px] text-[#FF8B5F]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A1F]" />
                    &lt; 2 Hours
                  </span>
                </div>
              </div>

              <Link
                to="/resume-screener-bot"
                className="flex h-12 w-full items-center justify-center rounded-2xl bg-white text-xs font-black text-[#0B0B09] transition hover:bg-[#F6F1E8] active:scale-[0.98]"
              >
                Open Workspace
              </Link>
            </div>
          </div>
        </aside>

        <div className="space-y-16 lg:col-span-8">
          <section id="configuration" className="reveal-on-scroll scroll-mt-32">
            <div className="mb-8 flex items-center gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[#E5DCCF] bg-white shadow-sm">
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h10" />
                  <path d="M17 15l3 3-3 3" />
                </svg>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-[#090907]">
                Pipeline Configuration
              </h2>
            </div>

            <p className="mb-10 max-w-2xl text-sm leading-7 text-[#6F675E]">
              Prepare your candidate spreadsheet, map the ranking profile, and
              initialize the parsing sequence from your workspace.
            </p>

            <div className="relative space-y-7 border-l-2 border-[#E5DCCF] pl-7 sm:pl-9">
              {pipelineSteps.map((step, index) => (
                <div key={step.title} className="relative">
                  <div className="absolute -left-[38px] top-6 grid h-6 w-6 place-items-center rounded-full border-[3px] border-[#E5DCCF] bg-[#F6F1E8] sm:-left-[46px]">
                    <span className="h-2 w-2 rounded-full bg-[#FF5A1F]" />
                  </div>

                  <div className="light-panel light-card-hover rounded-[24px] p-6">
                    <span className="mb-2 block font-mono text-[10px] font-black uppercase tracking-widest text-[#A99F91]">
                      Sequence 0{index + 1}
                    </span>
                    <h3 className="mb-2 text-lg font-black text-[#0B0B09]">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-7 text-[#6F675E]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="reveal-on-scroll pt-4">
            <div className="mb-8 flex items-center gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[#E5DCCF] bg-white shadow-sm">
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2 21 7v10l-9 5-9-5V7l9-5Z" />
                  <path d="M12 22V12" />
                  <path d="m3.3 7 8.7 5 8.7-5" />
                </svg>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-[#090907]">
                Engine Capabilities
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {capabilities.map((feature) => (
                <div
                  key={feature.title}
                  className="light-panel light-card-hover rounded-[24px] p-6"
                >
                  <h3 className="mb-2 text-sm font-black text-[#0B0B09]">
                    {feature.title}
                  </h3>
                  <p className="text-xs leading-6 text-[#6F675E]">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="reveal-on-scroll pt-4">
            <div className="mb-8 flex items-center gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[#E5DCCF] bg-white shadow-sm">
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                  <path d="M9 9h6" />
                  <path d="M9 13h4" />
                </svg>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-[#090907]">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;

                return (
                  <div
                    key={faq.q}
                    className={`light-panel overflow-hidden rounded-[24px] transition-all duration-300 ${
                      isOpen ? "bg-white shadow-md" : "hover:bg-white/82"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="flex w-full items-center justify-between gap-6 p-6 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm font-black text-[#0B0B09]">
                        {faq.q}
                      </span>
                      <span
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#F0E8DC] text-[#0B0B09] transition-transform duration-300"
                        style={{
                          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        }}
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                        >
                          <path d="M12 5v14" />
                          <path d="M5 12h14" />
                        </svg>
                      </span>
                    </button>

                    <div className={`faq-content ${isOpen ? "open" : ""}`}>
                      <div className="faq-inner">
                        <div className="mx-6 border-t border-[#E8DFD2] pb-6 pt-4 text-sm leading-7 text-[#6F675E]">
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
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap');

        .help-grid {
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

        .help-glow {
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

        .faq-content {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.38s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .faq-content.open {
          grid-template-rows: 1fr;
        }

        .faq-inner {
          overflow: hidden;
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
      `}</style>
    </div>
  );
}