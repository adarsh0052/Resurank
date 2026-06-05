import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsSubmitting(true);
      
      // Simulated secure authentication delay for premium feel
      setTimeout(() => {
        const fakeToken = "resurank-auth-token-123";
        localStorage.setItem("authToken", fakeToken);
        localStorage.setItem("lastEnteredEmail", email);
        localStorage.setItem("resurank-logged-in", "true");
        navigate("/resume-screener-bot");
      }, 1200);
    } else {
      // Elegant alert (in a real app, use a toast notification)
      alert("Please enter valid credentials to access the terminal.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white relative overflow-hidden">
      
      {/* ----------------------------------------------------------------------
          INJECTED CUSTOM STYLES
      ---------------------------------------------------------------------- */}
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-panel {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        .input-luxury {
          background: rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(228, 228, 231, 0.8); /* zinc-200 */
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.02);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .input-luxury:focus {
          background: #ffffff;
          border-color: #09090B; /* zinc-950 */
          box-shadow: 0 0 0 4px rgba(9, 9, 11, 0.05), inset 0 2px 4px rgba(0, 0, 0, 0.01);
          outline: none;
        }

        .cta-button {
          position: relative;
          overflow: hidden;
          background: #09090B;
          color: white;
          box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }
        
        .cta-button::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%);
          transform: skewX(-20deg);
          transition: left 0.5s ease;
        }

        .cta-button:hover:not(:disabled)::after {
          left: 200%;
        }

        .cta-button:active:not(:disabled) {
          transform: scale(0.98);
        }

        .reveal-on-scroll { opacity: 0; transform: translateY(20px); transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-on-scroll.is-visible { opacity: 1; transform: translateY(0); }

        .orbit-ring {
          border-radius: 50%;
          border: 1px dashed rgba(16, 185, 129, 0.3);
          animation: spin 20s linear infinite;
        }
        
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />

      {/* Abstract Background Topology */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.3] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-[20%] -translate-y-1/2 w-[600px] h-[600px] bg-emerald-100/40 blur-[120px] rounded-full pointer-events-none -z-10" />

      <Header />
      
      <main className="flex-grow flex items-center justify-center pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="reveal-on-scroll w-full max-w-[1000px] grid grid-cols-1 lg:grid-cols-2 glass-panel rounded-[2.5rem] overflow-hidden shadow-2xl">
          
          {/* LEFT COLUMN: Visual Narrative & Authentication Node */}
          <div className="relative p-10 sm:p-14 lg:p-16 flex flex-col justify-between bg-zinc-50/50 border-b lg:border-b-0 lg:border-r border-zinc-200/60 overflow-hidden">
            
            {/* Ambient Background for Left Col */}
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-zinc-200/50 blur-[60px] rounded-full" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 bg-white/60 backdrop-blur-sm shadow-sm w-max mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-zinc-500 uppercase">
                  Secure Workspace
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 leading-[1.1] mb-4">
                Access local <br/> vector pipeline.
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-sm">
                Authenticate to interact with your indexed candidate database. All queries and document weights are processed entirely in your local environment.
              </p>
            </div>

            {/* Abstract Graphic: Secure Node Auth */}
            <div className="relative z-10 mt-16 flex items-center justify-center h-48">
              <div className="absolute w-48 h-48 orbit-ring" />
              <div className="absolute w-32 h-32 orbit-ring" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />
              
              <div className="relative w-16 h-16 bg-white rounded-2xl shadow-xl border border-zinc-100 flex items-center justify-center z-20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-900">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>

              {/* Status Labels */}
              <div className="absolute bottom-0 right-0 bg-white/80 backdrop-blur-md border border-zinc-200 px-3 py-2 rounded-xl shadow-sm text-[10px] font-mono font-medium text-zinc-500">
                NODE: ACTIVE
              </div>
            </div>
            
            <div className="relative z-10 mt-12 pt-6 border-t border-zinc-200/60 flex justify-between items-center text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
              <span>RR_ENGINE // v2.0</span>
              <span>Encrypted</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Minimalist Login Form */}
          <div className="p-10 sm:p-14 lg:p-16 flex items-center bg-white">
            <div className="w-full max-w-sm mx-auto">
              
              <div className="mb-10">
                <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight mb-2">Authenticate</h1>
                <p className="text-sm text-zinc-500">Enter your credentials to enter the terminal.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-[10px] font-mono font-semibold text-zinc-400 uppercase tracking-widest">
                    Email Address //
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="input-luxury w-full rounded-xl px-4 py-3.5 text-sm text-zinc-900 placeholder-zinc-400"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="block text-[10px] font-mono font-semibold text-zinc-400 uppercase tracking-widest">
                      Password //
                    </label>
                    <Link to="/help" className="text-[11px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
                      Recover
                    </Link>
                  </div>
                  <input
                    type="password"
                    id="password"
                    className="input-luxury w-full rounded-xl px-4 py-3.5 text-sm text-zinc-900 placeholder-zinc-400 font-mono tracking-widest"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cta-button w-full flex items-center justify-center rounded-xl py-4 text-[13px] font-semibold tracking-wide disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Verifying Node...
                    </span>
                  ) : (
                    "Initialize Session"
                  )}
                </button>
              </form>

              <div className="mt-10 text-center text-[13px]">
                <span className="text-zinc-500">Unregistered node? </span>
                <Link to="/signup" className="font-semibold text-zinc-900 hover:text-emerald-600 transition-colors">
                  Create workspace
                </Link>
              </div>

            </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}