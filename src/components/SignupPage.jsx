import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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

    if (password !== confirmPassword) {
      alert("System Error: Passwords do not match. Please verify your input.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      localStorage.setItem("resurank-user", JSON.stringify({ name, email }));
      localStorage.setItem("resurank-logged-in", "true");
      localStorage.setItem("authToken", "resurank-auth-token-123");

      navigate("/resume-screener-bot");
    }, 1500);
  };

  return (
    <div
      className="relative flex min-h-screen flex-col overflow-hidden bg-[#F6F1E8] text-[#0B0B09] selection:bg-[#FF5A1F]/20"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="signup-grid" aria-hidden="true" />
      <div className="signup-glow" aria-hidden="true" />

      <Header />

      <main className="relative z-10 flex flex-grow items-center justify-center px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="reveal-on-scroll light-panel grid w-full max-w-[1100px] grid-cols-1 overflow-hidden rounded-[28px] lg:grid-cols-12">
          <div className="relative overflow-hidden border-b border-[#E5DCCF] bg-white/34 p-8 sm:p-12 lg:col-span-5 lg:border-b-0 lg:border-r">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#FF5A1F]/12 blur-3xl" />

            <div className="relative z-10">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#E1D7C8] bg-white/70 px-2 py-1.5 shadow-sm backdrop-blur">
                <span className="rounded-full bg-[#FF5A1F] px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-white">
                  Signup
                </span>
                <span className="pr-2 text-xs font-bold text-[#6F675E]">
                  Engine initialization
                </span>
              </div>

              <h2 className="mb-4 text-4xl font-black leading-[1.05] tracking-tight text-[#090907]">
                Deploy your
                <br />
                <span className="text-[#B8AFA1]">workspace.</span>
              </h2>

              <p className="max-w-sm text-sm leading-7 text-[#6F675E]">
                Create a local index instance to parse, map, and rank candidate
                profiles using embedded semantic evaluation models.
              </p>
            </div>

            <div className="relative z-10 mt-12 min-h-[180px]">
              <div className="node-network">
                <div className="absolute left-4 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-2xl border border-[#E5DCCF] bg-white shadow-md">
                  <div className="h-4 w-4 rounded-full bg-[#FF5A1F]" />
                </div>

                <div className="node-line left-10 top-[30%] w-32 rotate-[-20deg]" />
                <div className="node-line left-16 top-[50%] w-40 rotate-[5deg]" />
                <div className="node-line left-10 top-[70%] w-24 rotate-[25deg]" />

                <div className="node-dot left-[150px] top-[18%] h-2 w-2" />
                <div className="node-dot left-[210px] top-[54%] h-3 w-3 bg-[#B8AFA1]" />
                <div className="node-dot left-[90px] top-[82%] h-2 w-2" />
              </div>
            </div>

            <div className="relative z-10 mt-8 space-y-3 font-mono text-[10px]">
              <div className="flex items-center justify-between border-b border-[#E8DFD2] pb-3">
                <span className="uppercase tracking-widest text-[#A99F91]">
                  Storage
                </span>
                <span className="font-black text-[#0B0B09]">
                  Local ChromaDB
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#E8DFD2] pb-3">
                <span className="uppercase tracking-widest text-[#A99F91]">
                  Inference
                </span>
                <span className="font-black text-[#0B0B09]">
                  Ollama Llama 3.2
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white/72 p-8 sm:p-12 lg:col-span-7">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-10">
                <h1 className="mb-2 text-3xl font-black tracking-tight text-[#090907]">
                  Create Account
                </h1>
                <p className="text-sm leading-7 text-[#6F675E]">
                  Configure your administrator profile to begin sorting.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <label
                      htmlFor="name"
                      className="block font-mono text-[10px] font-black uppercase tracking-widest text-[#A99F91]"
                    >
                      Full Name //
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="input-resurank w-full rounded-2xl px-4 py-3 text-sm text-[#0B0B09] placeholder:text-[#A99F91]"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label
                      htmlFor="email"
                      className="block font-mono text-[10px] font-black uppercase tracking-widest text-[#A99F91]"
                    >
                      Email Address //
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="input-resurank w-full rounded-2xl px-4 py-3 text-sm text-[#0B0B09] placeholder:text-[#A99F91]"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="block font-mono text-[10px] font-black uppercase tracking-widest text-[#A99F91]"
                    >
                      Password //
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="input-resurank w-full rounded-2xl px-4 py-3 font-mono text-sm tracking-widest text-[#0B0B09] placeholder:text-[#A99F91]"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="confirmPassword"
                      className="block font-mono text-[10px] font-black uppercase tracking-widest text-[#A99F91]"
                    >
                      Verify //
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="input-resurank w-full rounded-2xl px-4 py-3 font-mono text-sm tracking-widest text-[#0B0B09] placeholder:text-[#A99F91]"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex h-12 w-full items-center justify-center rounded-2xl bg-[#0B0B09] text-xs font-black text-white transition hover:bg-[#FF5A1F] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? (
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
                        Mounting Workspace...
                      </span>
                    ) : (
                      "Initialize Account"
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-8 border-t border-[#E8DFD2] pt-6 text-center text-[13px]">
                <span className="text-[#6F675E]">Existing terminal node? </span>
                <Link
                  to="/login"
                  className="font-black text-[#0B0B09] transition hover:text-[#FF5A1F]"
                >
                  Authenticate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap');

        .signup-grid {
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

        .signup-glow {
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

        .node-network {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .node-dot {
          position: absolute;
          border-radius: 999px;
          background: #0B0B09;
          box-shadow: 0 0 0 4px rgba(11, 11, 9, 0.08);
        }

        .node-line {
          position: absolute;
          height: 1px;
          transform-origin: left center;
          background: linear-gradient(90deg, rgba(255, 90, 31, 0.32), transparent);
        }
      `}</style>
    </div>
  );
}