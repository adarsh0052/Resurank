import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GetStartedPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Initializing local engine...");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulated boot sequence for premium storytelling
    const statuses = [
      "Verifying secure session...",
      "Waking vector database...",
      "Resolving workspace route..."
    ];
    
    let step = 0;
    const interval = setInterval(() => {
      if (step < statuses.length) {
        setStatus(statuses[step]);
        setProgress((prev) => prev + 33);
        step++;
      }
    }, 250);

    const checkAuthAndRoute = setTimeout(() => {
      const user = JSON.parse(localStorage.getItem("resurank-user"));
      const loggedIn = localStorage.getItem("resurank-logged-in");

      if (user && loggedIn === "true") {
        navigate("/resume-screener-bot", { replace: true });
      } else if (user) {
        navigate("/login", { replace: true });
      } else {
        navigate("/signup", { replace: true });
      }
    }, 1000); // 1-second premium boot delay

    return () => {
      clearInterval(interval);
      clearTimeout(checkAuthAndRoute);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center relative overflow-hidden font-sans selection:bg-zinc-200 selection:text-zinc-900">
      
      {/* ----------------------------------------------------------------------
          INJECTED CUSTOM STYLES
      ---------------------------------------------------------------------- */}
      <style dangerouslySetInnerHTML={{ __html: `
        .loader-glass {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 1);
        }
        
        .orbit-container {
          animation: spin 8s linear infinite;
        }
        
        .orbit-node {
          animation: pulse-glow 2s ease-in-out infinite alternate;
        }

        @keyframes spin {
          100% { transform: rotate(360deg); }
        }

        @keyframes pulse-glow {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          100% { box-shadow: 0 0 20px 4px rgba(16, 185, 129, 0.1); }
        }
      `}} />

      {/* Spatial Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.4] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-100/30 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Initialization Interface */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Brand Node Icon */}
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-650 text-white shadow-2xl mb-12">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-800 to-transparent opacity-50 rounded-2xl" />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>

          {/* Orbiting Loading Ring */}
          <div className="absolute inset-[-12px] rounded-full border border-zinc-200/50 orbit-container">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-emerald-500 rounded-full orbit-node" />
          </div>
        </div>

        {/* Glass Status Card */}
        <div className="loader-glass w-full max-w-[320px] rounded-2xl p-6 flex flex-col items-center text-center">
          
          <div className="flex items-center gap-2 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-zinc-400 uppercase">
              System Boot
            </span>
          </div>

          <h2 className="text-[15px] font-medium text-zinc-900 mb-6 h-6 transition-all duration-300">
            {status}
          </h2>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="w-full flex justify-between mt-3 text-[9px] font-mono text-zinc-400">
            <span>RESURANK_V2.0</span>
            <span>{progress}%</span>
          </div>

        </div>

      </div>
    </div>
  );
}