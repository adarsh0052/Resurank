import React, { useState, useEffect } from "react";
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

    if (password !== confirmPassword) {
      alert("System Error: Passwords do not match. Please verify your input.");
      return;
    }

    setIsSubmitting(true);

    // Simulated local database generation delay for premium feel
    setTimeout(() => {
      localStorage.setItem("resurank-user", JSON.stringify({ name, email }));
      localStorage.setItem("resurank-logged-in", "true");
      localStorage.setItem("authToken", "resurank-auth-token-123");
      
      // Redirect to workspace
      navigate("/resume-screener-bot");
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans selection:bg-zinc-200 selection:text-zinc-900 relative overflow-hidden">
      
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
          border: 1px solid rgba(228, 228, 231, 0.8);
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.02);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .input-luxury:focus {
          background: #ffffff;
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.05), inset 0 2px 4px rgba(0, 0, 0, 0.01);
          outline: none;
        }

        .cta-button {
          position: relative;
          border: 1px solid transparent;
          background-clip: padding-box, border-box;
          background-origin: border-box;
          background-image: linear-gradient(to right, #ffffff, #ffffff), linear-gradient(to right, #3b82f6, #6366f1);
          color: #1e293b;
          font-weight: 600;
          box-shadow: 0 4px 12px 0 rgba(99, 102, 241, 0.05);
          transition: all 0.3s ease;
        }
        
        .cta-button:hover:not(:disabled) {
          background-image: linear-gradient(to right, #f8fafc, #f8fafc), linear-gradient(to right, #6366f1, #3b82f6);
          box-shadow: 0 4px 16px 0 rgba(99, 102, 241, 0.1);
          transform: translateY(-1px);
        }

        .cta-button:active:not(:disabled) {
          transform: scale(0.98);
        }

        .reveal-on-scroll { opacity: 0; transform: translateY(20px); transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-on-scroll.is-visible { opacity: 1; transform: translateY(0); }

        .node-network {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .node-dot {
          position: absolute;
          border-radius: 50%;
          background: #1e293b;
          box-shadow: 0 0 0 4px rgba(30, 41, 59, 0.1);
        }
        .node-line {
          position: absolute;
          background: linear-gradient(90deg, rgba(30,41,59,0.15), transparent);
          height: 1px;
          transform-origin: left center;
        }
      `}} />

      {/* Abstract Background Topology */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.3] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[700px] h-[700px] bg-emerald-100/30 blur-[140px] rounded-full pointer-events-none -z-10" />

      <Header />
      
      <main className="flex-grow flex items-center justify-center pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="reveal-on-scroll w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-12 glass-panel rounded-[2.5rem] overflow-hidden shadow-2xl">
          
          {/* LEFT COLUMN: Visual Narrative & Architecture Node */}
          <div className="lg:col-span-5 relative p-10 sm:p-14 flex flex-col justify-between bg-zinc-50/50 border-b lg:border-b-0 lg:border-r border-zinc-200/60 overflow-hidden">
            
            {/* Ambient Background for Left Col */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-200/40 blur-[60px] rounded-full" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 bg-white/60 backdrop-blur-sm shadow-sm w-max mb-8">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-zinc-500"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-zinc-500 uppercase">
                  Engine Initialization
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 leading-[1.1] mb-4">
                Deploy your <br/> workspace.
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-sm">
                Create a local index instance to parse, map, and rank candidate profiles using embedded semantic evaluation models.
              </p>
            </div>

            {/* Abstract Graphic: Node Network */}
            <div className="relative z-10 mt-12 flex-grow min-h-[160px] max-h-[200px] w-full">
              <div className="node-network">
                {/* Main Hub */}
                <div className="absolute top-1/2 left-4 w-12 h-12 bg-white rounded-xl shadow-md border border-zinc-200 flex items-center justify-center z-20 -translate-y-1/2">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                
                {/* Connecting Lines */}
                <div className="node-line top-[30%] left-10 w-32 rotate-[-20deg]" />
                <div className="node-line top-[50%] left-16 w-40 rotate-[5deg]" />
                <div className="node-line top-[70%] left-10 w-24 rotate-[25deg]" />

                {/* Satellite Nodes */}
                <div className="node-dot w-2 h-2 top-[18%] left-[150px]" />
                <div className="node-dot w-3 h-3 top-[54%] left-[210px] bg-zinc-400" />
                <div className="node-dot w-2 h-2 top-[82%] left-[90px]" />

                {/* Processing Data Packets */}
                <div className="absolute top-[30%] left-10 w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_#10B981] animate-[slide_3s_ease-in-out_infinite]" style={{ transformOrigin: '0 0', transform: 'rotate(-20deg)' }} />
              </div>
            </div>
            
            <div className="relative z-10 mt-8 space-y-3 font-mono text-[10px]">
              <div className="flex items-center justify-between border-b border-zinc-200/60 pb-2">
                <span className="text-zinc-400 uppercase tracking-widest">Storage</span>
                <span className="text-zinc-900 font-semibold">Local ChromaDB</span>
              </div>
              <div className="flex items-center justify-between border-b border-zinc-200/60 pb-2">
                <span className="text-zinc-400 uppercase tracking-widest">Inference</span>
                <span className="text-zinc-900 font-semibold">Ollama Llama 3.2</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Minimalist Signup Form */}
          <div className="lg:col-span-7 p-10 sm:p-14 flex items-center bg-white">
            <div className="w-full max-w-md mx-auto">
              
              <div className="mb-10">
                <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight mb-2">Create Account</h1>
                <p className="text-sm text-zinc-500">Configure your administrator profile to begin sorting.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2 col-span-1 sm:col-span-2">
                    <label htmlFor="name" className="block text-[10px] font-mono font-semibold text-zinc-400 uppercase tracking-widest">
                      Full Name //
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="input-luxury w-full rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2 col-span-1 sm:col-span-2">
                    <label htmlFor="email" className="block text-[10px] font-mono font-semibold text-zinc-400 uppercase tracking-widest">
                      Email Address //
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="input-luxury w-full rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-[10px] font-mono font-semibold text-zinc-400 uppercase tracking-widest">
                      Password //
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="input-luxury w-full rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 font-mono tracking-widest"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-[10px] font-mono font-semibold text-zinc-400 uppercase tracking-widest">
                      Verify //
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="input-luxury w-full rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 font-mono tracking-widest"
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
                    className="cta-button w-full flex items-center justify-center rounded-xl py-4 text-[13px] font-semibold tracking-wide disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Mounting Workspace...
                      </span>
                    ) : (
                      "Initialize Account"
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-8 pt-6 border-t border-zinc-100 text-center text-[13px]">
                <span className="text-zinc-500">Existing terminal node? </span>
                <Link to="/login" className="font-semibold text-zinc-900 hover:text-emerald-600 transition-colors">
                  Authenticate
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