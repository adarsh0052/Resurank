import React, { useEffect, useState } from "react";
import MinimalHeader from "./MinimalHeader";
import Footer from "./Footer";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [preferredTitles, setPreferredTitles] = useState("");
  const [industry, setIndustry] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("idle");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus("saving");

    setTimeout(() => {
      const profileData = {
        name,
        company,
        role,
        preferredTitles,
        industry,
      };

      localStorage.setItem("resurank-profile", JSON.stringify(profileData));
      setIsSaving(false);
      setSaveStatus("saved");

      setTimeout(() => setSaveStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <div
      className="relative flex min-h-screen flex-col overflow-hidden bg-[#F6F1E8] text-[#0B0B09] selection:bg-[#FF5A1F]/20"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="profile-grid" aria-hidden="true" />
      <div className="profile-glow" aria-hidden="true" />

      <MinimalHeader />

      <main className="relative z-10 flex flex-grow items-center justify-center px-4 py-24 sm:px-6 lg:px-12">
        <div className="grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="reveal-on-scroll relative space-y-8 lg:col-span-5">
            <div className="inline-flex w-max items-center gap-2 rounded-full border border-[#E1D7C8] bg-white/70 px-2 py-1.5 shadow-sm backdrop-blur">
              <span className="rounded-full bg-[#FF5A1F] px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-white">
                Profile
              </span>
              <span className="pr-2 text-xs font-bold text-[#6F675E]">
                System parameters
              </span>
            </div>

            <div>
              <h1 className="mb-6 text-5xl font-black leading-[1.05] tracking-tight text-[#090907] sm:text-6xl">
                Calibrate your
                <br />
                <span className="text-[#B8AFA1]">vector target.</span>
              </h1>

              <p className="max-w-md text-sm leading-7 text-[#6F675E]">
                The engine uses your organization and role parameters to weight
                semantic distances. A recruiter searching for engineers at a
                cloud provider receives dynamically adjusted relevance clusters.
              </p>
            </div>

            <div className="light-panel relative mt-12 flex h-48 w-full max-w-md items-center justify-center overflow-hidden rounded-[28px]">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/44" />

              <div className="relative h-full w-full">
                <div className="radar-ring h-16 w-16" />
                <div className="radar-ring h-32 w-32" />
                <div className="radar-ring h-48 w-48" />
                <div className="radar-scan" />

                <div className="absolute left-[60%] top-[30%] h-2 w-2 rounded-full bg-[#FF5A1F] shadow-[0_0_14px_rgba(255,90,31,0.65)]" />
                <div className="absolute left-[35%] top-[65%] h-1.5 w-1.5 rounded-full bg-[#B8AFA1]" />
                <div className="absolute left-[25%] top-[40%] h-2 w-2 rounded-full bg-[#0B0B09]" />
              </div>

              <div className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-widest text-[#A99F91]">
                Local Index Targeting
              </div>
            </div>
          </div>

          <div className="reveal-on-scroll lg:col-span-7">
            <div className="light-panel relative overflow-hidden rounded-[28px] p-8 sm:p-12">
              <div className="mb-10 flex items-center justify-between border-b border-[#E8DFD2] pb-6">
                <h2 className="text-lg font-black tracking-tight text-[#090907]">
                  Operator Profile
                </h2>
                <span className="rounded bg-[#F0E8DC] px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-[#6F675E]">
                  Config.json
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="block font-mono text-[10px] font-black uppercase tracking-widest text-[#A99F91]">
                        Full Name //
                      </label>
                      <input
                        type="text"
                        className="input-resurank w-full rounded-2xl px-4 py-3.5 text-sm text-[#0B0B09] placeholder:text-[#A99F91]"
                        placeholder="e.g. Jane Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block font-mono text-[10px] font-black uppercase tracking-widest text-[#A99F91]">
                        Your Role //
                      </label>
                      <input
                        type="text"
                        className="input-resurank w-full rounded-2xl px-4 py-3.5 text-sm text-[#0B0B09] placeholder:text-[#A99F91]"
                        placeholder="e.g. Technical Recruiter"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] font-black uppercase tracking-widest text-[#A99F91]">
                      Organization //
                    </label>
                    <input
                      type="text"
                      className="input-resurank w-full rounded-2xl px-4 py-3.5 text-sm text-[#0B0B09] placeholder:text-[#A99F91]"
                      placeholder="e.g. Acme Corp"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                </div>

                <div className="h-px w-full bg-[#E8DFD2]" />

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="flex justify-between font-mono text-[10px] font-black uppercase tracking-widest text-[#A99F91]">
                      <span>Target Titles //</span>
                      <span className="font-bold opacity-60">
                        Comma Separated
                      </span>
                    </label>
                    <input
                      type="text"
                      className="input-resurank w-full rounded-2xl px-4 py-3.5 text-sm text-[#0B0B09] placeholder:text-[#A99F91]"
                      placeholder="e.g. Software Engineer, Tech Lead"
                      value={preferredTitles}
                      onChange={(e) => setPreferredTitles(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] font-black uppercase tracking-widest text-[#A99F91]">
                      Primary Industry //
                    </label>
                    <input
                      type="text"
                      className="input-resurank w-full rounded-2xl px-4 py-3.5 text-sm text-[#0B0B09] placeholder:text-[#A99F91]"
                      placeholder="e.g. Fintech, Cloud Infrastructure"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={saveStatus === "saving" || saveStatus === "saved"}
                    className={`flex h-12 w-full items-center justify-center rounded-2xl text-xs font-black transition active:scale-[0.98] disabled:cursor-not-allowed ${
                      saveStatus === "saved"
                        ? "bg-[#FF5A1F] text-white"
                        : "bg-[#0B0B09] text-white hover:bg-[#FF5A1F]"
                    } ${saveStatus === "saving" ? "opacity-80" : ""}`}
                  >
                    {saveStatus === "idle" && "Sync Parameters"}

                    {saveStatus === "saving" && (
                      <span className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Writing to Local Index...
                      </span>
                    )}

                    {saveStatus === "saved" && (
                      <span className="flex items-center gap-2">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
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

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap');

        .profile-grid {
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

        .profile-glow {
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

        .radar-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 999px;
          border: 1px solid rgba(255, 90, 31, 0.22);
          transform: translate(-50%, -50%);
        }

        .radar-scan {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 50%;
          height: 2px;
          background: linear-gradient(90deg, rgba(255,90,31,0.8), transparent);
          transform-origin: left center;
          animation: radar-spin 4s linear infinite;
        }

        @keyframes radar-spin {
          100% {
            transform: translateY(-50%) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}