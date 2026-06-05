import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const mockCandidates = [
  {
    id: "c_101",
    name: "Sarah Chen",
    role: "Lead ML Architect",
    match: 98,
    status: "Top 1%",
    traits: ["Distributed Systems", "PyTorch", "Kubernetes"],
  },
  {
    id: "c_102",
    name: "Marcus Aurelius",
    role: "Product Director",
    match: 92,
    status: "Strong Fit",
    traits: ["Product Strategy", "Growth", "SQL"],
  },
  {
    id: "c_103",
    name: "Priya Nair",
    role: "Infra Lead",
    match: 89,
    status: "Viable",
    traits: ["Go", "Terraform", "Cassandra"],
  },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeEngineStep, setActiveEngineStep] = useState(0);
  const [weights, setWeights] = useState({
    technical: 85,
    experience: 90,
    academic: 40,
  });

  const calculateDynamicScore = () => {
    const raw =
      0.98 * weights.technical +
      0.95 * weights.experience +
      0.6 * weights.academic;
    const max = weights.technical + weights.experience + weights.academic;

    return max > 0 ? ((raw / max) * 100).toFixed(0) : 0;
  };

  const handleHeroMouseMove = (event) => {
    if (!heroRef.current) return;

    const rect = heroRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;

    setRotation({
      x: -(mouseY / (rect.height / 2)) * 7,
      y: (mouseX / (rect.width / 2)) * 7,
    });
  };

  const handleHeroMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
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
      className="min-h-screen overflow-hidden bg-[#F6F1E8] text-[#0B0B09]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
     

      <section className="relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-32">
        <div className="warp-grid-container" aria-hidden="true">
          <div className="warp-grid" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-[1200px] items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="reveal-on-scroll max-w-2xl">
            

            <h1 className="max-w-[680px] text-[3.9rem] font-black leading-[0.95] tracking-tight text-[#090907] sm:text-[5.2rem] lg:text-[6rem]">
              Hire the right{" "}
              <span className="text-[#B8AFA1]">talent faster.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-[#6F675E] sm:text-xl">
              ResuRank turns resumes into structured hiring intelligence, ranks
              each profile against your priorities, and helps teams move from
              screening to shortlisting in seconds.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/signup"
                className="inline-flex h-14 items-center justify-center rounded-2xl bg-[#0B0B09] px-8 text-sm font-bold text-white shadow-[0_14px_35px_rgba(0,0,0,0.18)] transition hover:bg-[#211D19] active:scale-95"
              >
                Start for free
              </Link>
              <a
                href="#platform"
                className="inline-flex h-14 items-center justify-center rounded-2xl border border-[#DDD3C4] bg-white/60 px-8 text-sm font-bold text-[#0B0B09] transition hover:bg-white"
              >
                Explore platform
              </a>
            </div>
          </div>

          <div
            ref={heroRef}
            onMouseMove={(event) => {
              setIsHovering(true);
              handleHeroMouseMove(event);
            }}
            onMouseLeave={handleHeroMouseLeave}
            className="spatial-parent reveal-on-scroll relative flex min-h-[560px] items-center justify-center"
          >
            <div
              className={`spatial-child relative w-full max-w-[520px] ${
                isHovering ? "spatial-hovered" : ""
              }`}
              style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              }}
            >
              <div className="relative overflow-hidden rounded-[2rem] border border-[#E5DCCF] bg-white/80 p-5 shadow-[0_30px_90px_rgba(39,28,16,0.18)] backdrop-blur-xl">
                <div
                  className="specular-overlay rounded-[2rem]"
                  style={{
                    "--mouse-x": `${rotation.y * 5 + 50}%`,
                    "--mouse-y": `${rotation.x * 5 + 50}%`,
                  }}
                />

                <div className="layer-1 rounded-3xl border border-[#E8DFD2] bg-[#F7F1E8] p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-bold text-[#12110F]">
                      Hiring criteria
                    </span>
                    <span className="rounded-full bg-[#111]/5 px-3 py-1 text-[11px] font-bold text-[#70675D]">
                      Live profile
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 w-4/5 rounded-full bg-[#0B0B09]/20" />
                    <div className="h-2 w-2/3 rounded-full bg-[#0B0B09]/10" />
                    <div className="h-2 w-1/2 rounded-full bg-[#0B0B09]/10" />
                  </div>
                </div>

                <div className="layer-2 mt-4 rounded-3xl border border-[#E8DFD2] bg-[#FBF8F1] p-6 shadow-xl">
                  <div className="mb-6 flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-black text-[#0B0B09]">
                        Sarah Chen
                      </h3>
                      <p className="mt-1 text-sm font-medium text-[#8C8378]">
                        Lead ML Architect
                      </p>
                    </div>
                    <div className="rounded-full bg-[#FF5A1F] px-3 py-1.5 text-xs font-black text-white">
                      {calculateDynamicScore()}% Match
                    </div>
                  </div>

                  <div className="grid gap-3 border-t border-[#E7DED1] pt-5">
                    {["Distributed Systems", "PyTorch", "Kubernetes"].map(
                      (skill) => (
                        <div
                          key={skill}
                          className="flex items-center justify-between rounded-2xl bg-white px-4 py-3"
                        >
                          <span className="text-sm font-semibold text-[#6F675E]">
                            {skill}
                          </span>
                          <span className="h-2 w-16 rounded-full bg-[#FF5A1F]/70" />
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  {mockCandidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="rounded-2xl border border-[#E8DFD2] bg-white/70 p-3"
                    >
                      <div className="text-xs font-black text-[#0B0B09]">
                        {candidate.match}%
                      </div>
                      <div className="mt-1 truncate text-[11px] font-semibold text-[#8C8378]">
                        {candidate.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="platform"
        className="relative flex flex-col items-center overflow-hidden bg-[#F6F1E8] px-6 py-32 text-center"
      >
        <div className="perspective-grid absolute inset-0 opacity-45" />

        <div className="reveal-on-scroll relative z-10 mx-auto max-w-4xl">
          <div className="mb-9 inline-flex items-center gap-3 rounded-full border border-[#E1D7C8] bg-white px-2 py-1.5 shadow-sm">
            <span className="rounded-full bg-[#FF5A1F] px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-white">
              Smart
            </span>
            <span className="pr-2 text-xs font-bold text-[#6F675E]">
              Context-aware ranking for modern hiring teams
            </span>
          </div>

          <h2 className="text-5xl font-black leading-[1.02] tracking-tight text-[#090907] md:text-[4.4rem]">
            Every candidate pulled
            <br />
            into one focused view
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[#6F675E]">
            Organize pipelines, compare resumes, tune scoring weights, and
            explain every ranking in one connected workspace.
          </p>

          <Link
            to="/signup"
            className="mt-9 inline-flex h-14 items-center justify-center rounded-2xl bg-[#0B0B09] px-9 text-sm font-bold text-white shadow-[0_14px_35px_rgba(0,0,0,0.16)] transition hover:bg-[#211D19]"
          >
            Get started
          </Link>
        </div>
      </section>

      <section id="workflow" className="relative overflow-hidden bg-[#F6F1E8]">
        <div className="horizon-arch relative z-10 flex flex-col items-center">
          <div className="absolute left-1/2 top-12 flex -translate-x-1/2 items-center gap-8 opacity-70 sm:gap-14">
            {["Parse", "Rank", "Shortlist"].map((label) => (
              <div
                key={label}
                className="flex items-center gap-2 text-sm font-black text-white/80 sm:text-lg"
              >
                <span className="h-4 w-4 rounded-full border-2 border-white/45" />
                {label}
              </div>
            ))}
          </div>

          <div className="reveal-on-scroll mt-48 max-w-3xl px-6 text-center">
            <h2 className="text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
              All the essentials for
              <br />
              sharper recruitment
            </h2>
            <p className="mt-5 text-lg text-[#A59C92]">
              Extraction, automation, scoring controls, and team-ready insights
              in sync from upload to decision.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#090907] px-6 pb-32 pt-12">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-5 md:grid-cols-12">
          <div className="reveal-on-scroll flex flex-col justify-between rounded-[28px] border border-white/[0.07] bg-[#11110F] p-6 transition hover:bg-[#151513] sm:p-8 md:col-span-4">
            <div>
              <h3 className="mb-6 text-xl font-black text-white">
                Pipeline Sandbox
              </h3>

              {[
                { title: "Intake", desc: "Batch ingest candidate PDFs." },
                { title: "Extraction", desc: "Parse skills and experience." },
                { title: "Priorities", desc: "Tune evaluation criteria." },
                { title: "Decision Matrix", desc: "Review ranked results." },
              ].map((step, index) => (
                <button
                  key={step.title}
                  onClick={() => setActiveEngineStep(index)}
                  className={`w-full rounded-2xl border p-5 text-left transition ${
                    activeEngineStep === index
                      ? "border-white/[0.08] bg-white/[0.05]"
                      : "border-transparent bg-transparent hover:bg-white/[0.03]"
                  }`}
                >
                  <div
                    className={`mb-1 text-base font-bold ${
                      activeEngineStep === index
                        ? "text-white"
                        : "text-white/35"
                    }`}
                  >
                    {step.title}
                  </div>
                  <div className="text-xs font-medium text-white/30">
                    {step.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="reveal-on-scroll relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#11110F] p-8 transition hover:bg-[#151513] sm:p-12 md:col-span-8">
            <div className="mb-8 flex items-center justify-between border-b border-white/[0.06] pb-4">
              <span className="font-mono text-[11px] uppercase tracking-widest text-white/35">
                Interactive Component
              </span>
              <span className="rounded bg-[#FF5A1F]/10 px-2 py-1 font-mono text-[11px] text-[#FF6B35]">
                STAGE_0{activeEngineStep + 1}
              </span>
            </div>

            <div className="flex min-h-[320px] flex-col justify-center">
              {activeEngineStep === 0 && (
                <div className="space-y-6 text-center">
                  <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-dashed border-white/20 bg-white/[0.04]">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-white/45"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <path d="M17 8l-5-5-5 5" />
                      <path d="M12 3v12" />
                    </svg>
                  </div>
                  <div className="text-sm font-bold text-white">
                    Drop engineering_candidates.zip here
                  </div>
                  <div className="text-xs font-medium text-white/35">
                    Local processing keeps candidate data private.
                  </div>
                </div>
              )}

              {activeEngineStep === 1 && (
                <div className="space-y-4 font-mono text-sm text-white/45">
                  <div>// Parsing: candidate_schen.pdf</div>
                  <div className="space-y-2 rounded-2xl border border-white/[0.06] bg-black/35 p-5">
                    <div>
                      <span className="text-white/20">1</span>{" "}
                      <span className="text-[#FF6B35]">const</span> candidate = {"{"}
                    </div>
                    <div>
                      <span className="text-white/20">2</span> &nbsp;name:{" "}
                      <span className="text-white">"Sarah Chen"</span>,
                    </div>
                    <div>
                      <span className="text-white/20">3</span> &nbsp;skills: [
                      <span className="text-white">"PyTorch"</span>,{" "}
                      <span className="text-white">"Distributed Systems"</span>],
                    </div>
                    <div>
                      <span className="text-white/20">4</span>{" "}
                      &nbsp;vector_embedding:{" "}
                      <span className="text-[#FF6B35]">
                        [0.042, -0.912, 0.551]
                      </span>
                    </div>
                    <div>
                      <span className="text-white/20">5</span> {"}"}
                    </div>
                  </div>
                </div>
              )}

              {activeEngineStep === 2 && (
                <div className="mx-auto w-full max-w-md space-y-8">
                  <div className="text-center">
                    <div className="mb-2 text-lg font-black text-white">
                      Adjust Vector Weights
                    </div>
                    <div className="text-sm font-medium text-white/35">
                      Recalculate ranking signals in real time.
                    </div>
                  </div>

                  {[
                    { label: "Technical Depth", key: "technical" },
                    { label: "Experience Fit", key: "experience" },
                    { label: "Academic Baseline", key: "academic" },
                  ].map((slider) => (
                    <div key={slider.key} className="space-y-3">
                      <div className="flex justify-between text-xs font-bold text-white/55">
                        <span>{slider.label}</span>
                        <span className="text-white">
                          {weights[slider.key]}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={weights[slider.key]}
                        onChange={(event) =>
                          setWeights((prev) => ({
                            ...prev,
                            [slider.key]: Number(event.target.value),
                          }))
                        }
                        className="resurank-slider"
                      />
                    </div>
                  ))}
                </div>
              )}

              {activeEngineStep === 3 && (
                <div className="space-y-4">
                  <div className="mb-4 border-b border-white/[0.06] pb-2 font-mono text-xs text-white/30">
                    RANKED RESULTS
                  </div>

                  <div className="relative flex items-center justify-between overflow-hidden rounded-2xl border border-[#FF5A1F]/35 bg-white/[0.06] p-5">
                    <div className="absolute bottom-0 left-0 top-0 w-1 bg-[#FF5A1F]" />
                    <div>
                      <div className="mb-1 font-bold text-white">
                        Sarah Chen
                      </div>
                      <div className="text-xs font-medium text-white/35">
                        Lead ML Architect
                      </div>
                    </div>
                    <div className="text-lg font-black text-[#FF6B35]">
                      {calculateDynamicScore()}% Match
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-black/30 p-5">
                    <div>
                      <div className="mb-1 font-bold text-white/65">
                        Marcus Aurelius
                      </div>
                      <div className="text-xs font-medium text-white/30">
                        Product Director
                      </div>
                    </div>
                    <div className="text-lg font-black text-white/30">
                      74% Match
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            id="candidates"
            className="reveal-on-scroll rounded-[28px] border border-white/[0.07] bg-[#11110F] p-8 text-center transition hover:bg-[#151513] sm:p-12 md:col-span-6"
          >
            <h3 className="mb-3 text-2xl font-black text-white">
              Say hello to ResuRank AI
            </h3>
            <p className="mx-auto mb-10 max-w-sm leading-7 text-white/35">
              Automate repetitive review work, extract exact context, and keep
              hiring conversations focused on evidence.
            </p>

            <div className="rounded-2xl border border-white/[0.07] bg-black/35 p-4 text-left">
              <div className="mb-1 text-sm font-bold text-white">
                Summarize context instantly
              </div>
              <div className="text-xs font-medium text-white/30">
                Populate fields and evaluate skills automatically through your
                scoring model.
              </div>
            </div>
          </div>

          <div
            id="insights"
            className="reveal-on-scroll relative overflow-hidden rounded-[28px] bg-[#FF5A1F] p-8 sm:p-12 md:col-span-6"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(255,255,255,0.34),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.15),rgba(0,0,0,0.24))]" />

            <div className="relative z-10 mb-12 flex w-max items-center gap-2 rounded-full border border-white/15 bg-black/20 px-4 py-2 backdrop-blur-md">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-white">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A1F]" />
              </span>
              <span className="text-xs font-black text-white">
                Capture data automatically
              </span>
            </div>

            <div className="relative z-10 mt-auto">
              <h3 className="mb-3 text-2xl font-black text-white">
                Smooth team handoff
              </h3>
              <p className="max-w-sm leading-7 text-white/80">
                Export matrices, share candidate profiles, and bring structured
                evidence into every hiring decision.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap');

        .warp-grid-container {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          overflow: hidden;
          pointer-events: none;
        }

        .warp-grid {
          width: 170%;
          height: 78%;
          background-image:
            linear-gradient(to right, rgba(211, 116, 42, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(211, 116, 42, 0.2) 1px, transparent 1px);
          background-size: 58px 58px;
          transform: perspective(950px) rotateX(56deg) scaleX(1.15);
          transform-origin: bottom center;
          mask-image: radial-gradient(ellipse 82% 82% at 50% 100%, black 28%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 82% 82% at 50% 100%, black 28%, transparent 100%);
        }

        .spatial-parent {
          perspective: 2000px;
        }

        .spatial-child {
          transform-style: preserve-3d;
          transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .spatial-hovered {
          transition: transform 0.12s linear;
        }

        .layer-1 {
          transform: translateZ(22px);
        }

        .layer-2 {
          transform: translateZ(62px);
        }

        .specular-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
          mix-blend-mode: screen;
          background: radial-gradient(
            circle 220px at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(255, 255, 255, 0.18),
            transparent 78%
          );
        }

        .perspective-grid {
          background-image:
            linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
          transform: perspective(1000px) rotateX(60deg) scale(1.5);
          transform-origin: top;
          pointer-events: none;
        }

        .horizon-arch {
          width: 150%;
          height: 460px;
          margin-left: -25%;
          border-top-left-radius: 50% 100%;
          border-top-right-radius: 50% 100%;
          background: #090907;
          box-shadow:
            0 -5px 85px rgba(255, 90, 31, 0.26),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
          overflow: hidden;
        }

        .horizon-arch::before {
          content: "";
          position: absolute;
          left: 50%;
          top: -23%;
          width: 62%;
          height: 82%;
          transform: translateX(-50%);
          border-radius: 50%;
          background: radial-gradient(
            ellipse at 50% 60%,
            #ff8a00 0%,
            #ff4b00 26%,
            #8d1400 55%,
            #1b0500 78%,
            transparent 100%
          );
          filter: blur(46px);
          opacity: 0.84;
        }

        .resurank-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 4px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.12);
          outline: none;
        }

        .resurank-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          cursor: pointer;
          border-radius: 999px;
          border: 3px solid #171714;
          background: #ff5a1f;
          transition: transform 0.12s ease;
        }

        .resurank-slider::-webkit-slider-thumb:hover {
          transform: scale(1.18);
        }

        .resurank-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          cursor: pointer;
          border-radius: 999px;
          border: 3px solid #171714;
          background: #ff5a1f;
        }

        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(28px);
          transition:
            opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .horizon-arch {
            width: 180%;
            margin-left: -40%;
          }

          .warp-grid {
            width: 220%;
            background-size: 46px 46px;
          }
        }
      `}</style>
    </div>
  );
}