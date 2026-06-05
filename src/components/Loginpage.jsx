import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    if (email && password) {
      setIsSubmitting(true);

      setTimeout(() => {
        localStorage.setItem("authToken", "resurank-auth-token-123");
        localStorage.setItem("lastEnteredEmail", email);
        localStorage.setItem("resurank-logged-in", "true");
        navigate("/resume-screener-bot");
      }, 1200);
    } else {
      alert("Please enter valid credentials to access the terminal.");
    }
  };

  return (
    <div
      className="relative flex min-h-screen flex-col overflow-hidden bg-[#F6F1E8] text-[#0B0B09] selection:bg-[#FF5A1F]/20"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="login-grid" aria-hidden="true" />
      <div className="login-glow" aria-hidden="true" />

      <Header />

      <main className="relative z-10 flex flex-grow items-center justify-center px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="reveal-on-scroll light-panel grid w-full max-w-[1000px] grid-cols-1 overflow-hidden rounded-[28px] lg:grid-cols-2">
          <div className="relative flex flex-col justify-between overflow-hidden border-b border-[#E5DCCF] bg-white/34 p-8 sm:p-12 lg:border-b-0 lg:border-r lg:p-14">
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#FF5A1F]/12 blur-3xl" />

            <div className="relative z-10">
              <div className="mb-8 inline-flex w-max items-center gap-2 rounded-full border border-[#E1D7C8] bg-white/70 px-2 py-1.5 shadow-sm backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A1F]" />
                <span className="pr-2 font-mono text-[10px] font-black uppercase tracking-widest text-[#6F675E]">
                  Secure Workspace
                </span>
              </div>

              <h2 className="mb-4 text-4xl font-black leading-[1.05] tracking-tight text-[#090907]">
                Access local
                <br />
                <span className="text-[#B8AFA1]">vector pipeline.</span>
              </h2>

              <p className="max-w-sm text-sm leading-7 text-[#6F675E]">
                Authenticate to interact with your indexed candidate database.
                All queries and document weights are processed entirely in your
                local environment.
              </p>
            </div>

            <div className="relative z-10 mt-16 flex h-48 items-center justify-center">
              <div className="orbit-ring absolute h-48 w-48" />
              <div
                className="orbit-ring absolute h-32 w-32"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "15s",
                }}
              />

              <div className="relative z-20 grid h-16 w-16 place-items-center rounded-2xl border border-[#E5DCCF] bg-white shadow-xl">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>

              <div className="absolute bottom-0 right-0 rounded-xl border border-[#E5DCCF] bg-white/80 px-3 py-2 font-mono text-[10px] font-black text-[#6F675E] shadow-sm backdrop-blur">
                NODE: ACTIVE
              </div>
            </div>

            <div className="relative z-10 mt-12 flex items-center justify-between border-t border-[#E8DFD2] pt-6 font-mono text-[10px] uppercase tracking-widest text-[#A99F91]">
              <span>RR_ENGINE // v2.0</span>
              <span>Encrypted</span>
            </div>
          </div>

          <div className="flex items-center bg-white/72 p-8 sm:p-12 lg:p-14">
            <div className="mx-auto w-full max-w-sm">
              <div className="mb-10">
                <h1 className="mb-2 text-3xl font-black tracking-tight text-[#090907]">
                  Authenticate
                </h1>
                <p className="text-sm leading-7 text-[#6F675E]">
                  Enter your credentials to enter the terminal.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block font-mono text-[10px] font-black uppercase tracking-widest text-[#A99F91]"
                  >
                    Email Address //
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="input-resurank w-full rounded-2xl px-4 py-3.5 text-sm text-[#0B0B09] placeholder:text-[#A99F91]"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block font-mono text-[10px] font-black uppercase tracking-widest text-[#A99F91]"
                    >
                      Password //
                    </label>
                    <Link
                      to="/help"
                      className="text-[11px] font-bold text-[#6F675E] transition hover:text-[#FF5A1F]"
                    >
                      Recover
                    </Link>
                  </div>

                  <input
                    type="password"
                    id="password"
                    className="input-resurank w-full rounded-2xl px-4 py-3.5 font-mono text-sm tracking-widest text-[#0B0B09] placeholder:text-[#A99F91]"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#0B0B09] text-xs font-black text-white transition hover:bg-[#FF5A1F] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
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
                      Verifying Node...
                    </span>
                  ) : (
                    "Initialize Session"
                  )}
                </button>
              </form>

              <div className="mt-10 text-center text-[13px]">
                <span className="text-[#6F675E]">Unregistered node? </span>
                <Link
                  to="/signup"
                  className="font-black text-[#0B0B09] transition hover:text-[#FF5A1F]"
                >
                  Create workspace
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap');

        .login-grid {
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

        .login-glow {
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

        .orbit-ring {
          border-radius: 999px;
          border: 1px dashed rgba(255, 90, 31, 0.3);
          animation: spin 20s linear infinite;
        }

        @keyframes spin {
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}