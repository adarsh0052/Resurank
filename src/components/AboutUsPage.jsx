import React, { useEffect } from "react";

function AboutUsPage() {
  const principles = [
    {
      eyebrow: "Engineering Principle 01",
      title: "Local Vector Security",
      desc: "Candidate resume files contain sensitive personal identifiable information (PII). In order to protect your candidate pool, we process embeddings entirely on local models, ensuring that data is never sent to third-party endpoints.",
    },
    {
      eyebrow: "Engineering Principle 02",
      title: "Mathematical Score Criteria",
      desc: "Candidate profiles are evaluated against multidimensional vectors across weighted role criteria. Our scoring logic utilizes cosine similarity parameters, yielding precise grades rather than simple pattern matching.",
    },
    {
      eyebrow: "Engineering Principle 03",
      title: "Semantic Indexing Focus",
      desc: 'Standard search systems miss qualified talent due to spellings or synonyms. By mapping candidates to conceptual spaces, we can match "ML Engineer" to "Deep Learning Specialist" or identify relevant projects automatically.',
    },
    {
      eyebrow: "Engineering Principle 04",
      title: "Enterprise Scaling Logs",
      desc: "ResuRank scales candidate evaluations to support large pipelines. Spreadsheet queues process in parallel background tasks, feeding structured candidate indices to local models for quick recruiters dashboard lookups.",
    },
  ];

  const systemDetails = [
    {
      title: "System Architecture",
      desc: "Built on Python FastAPI backend and React Vite frontend. Uses LangChain packages for local vector lookup flows and Ollama container servers.",
    },
    {
      title: "Compliance & Security",
      desc: "Files are downloaded temporarily into isolated server nodes and auto-expire in 10 minutes. Custom cursor scripts run on secure local variables.",
    },
    {
      title: "Technical Support",
      desc: "Recruiters can contact technical support for spreadsheet layout mapping problems or Ollama inference optimization.",
    },
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
      <div className="about-grid" aria-hidden="true" />
      <div className="about-glow" aria-hidden="true" />

      <section className="mx-auto max-w-[1200px] px-6 pb-16 pt-40 sm:px-12">
        <div className="reveal-on-scroll max-w-3xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#E1D7C8] bg-white/70 px-2 py-1.5 shadow-sm backdrop-blur">
            <span className="rounded-full bg-[#FF5A1F] px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-white">
              Mission
            </span>
            <span className="pr-2 text-xs font-bold text-[#6F675E]">
              Customers and engineering recruiters
            </span>
          </div>

          <h1 className="text-5xl font-black leading-[1.02] tracking-tight text-[#090907] sm:text-6xl lg:text-[5.3rem]">
            Built for
            <br />
            <span className="text-[#B8AFA1]">engineering recruiters.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#6F675E]">
            We design software tools that help companies bypass superficial
            keyword matches and evaluate talent using local semantic models.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-6 sm:px-12">
        <section className="reveal-on-scroll">
          <div className="mb-8 flex items-center gap-4">
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[#E5DCCF] bg-white shadow-sm">
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
              >
                <path d="M12 2 21 7v10l-9 5-9-5V7l9-5Z" />
                <path d="M12 22V12" />
                <path d="m3.3 7 8.7 5 8.7-5" />
              </svg>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-[#090907]">
              Values and Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {principles.map((principle) => (
              <article
                key={principle.title}
                className="light-panel light-card-hover rounded-[24px] p-6 sm:p-8"
              >
                <span className="mb-3 block font-mono text-[10px] font-black uppercase tracking-widest text-[#A99F91]">
                  {principle.eyebrow}
                </span>
                <h3 className="mb-3 text-xl font-black tracking-tight text-[#0B0B09]">
                  {principle.title}
                </h3>
                <p className="text-sm leading-7 text-[#6F675E]">
                  {principle.desc}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="reveal-on-scroll pt-16">
          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0B0B09] p-6 text-white shadow-[0_30px_80px_rgba(11,11,9,0.24)] sm:p-8 lg:p-10">
            <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#FF5A1F]/30 blur-3xl" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(ellipse_at_bottom,rgba(255,90,31,0.25),transparent_70%)]" />

            <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-3">
              {systemDetails.map((detail) => (
                <div key={detail.title}>
                  <span className="mb-3 block font-mono text-[10px] font-black uppercase tracking-widest text-white/38">
                    {detail.title}
                  </span>
                  <p className="text-sm leading-7 text-white/62">
                    {detail.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap');

        .about-grid {
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

        .about-glow {
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
      `}</style>
    </div>
  );
}

export default AboutUsPage;