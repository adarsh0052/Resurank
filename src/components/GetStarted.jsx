import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GetStartedPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Initializing local engine...");
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    const statuses = [
      "Verifying secure session...",
      "Waking candidate index...",
      "Resolving workspace route...",
    ];

    let step = 0;

    const interval = setInterval(() => {
      if (step < statuses.length) {
        setStatus(statuses[step]);
        setProgress(Math.min(100, (step + 1) * 33));
        step += 1;
      }
    }, 260);

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
    }, 1100);

    return () => {
      clearInterval(interval);
      clearTimeout(checkAuthAndRoute);
    };
  }, [navigate]);

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F6F1E8] px-6 text-[#0B0B09] selection:bg-[#FF5A1F]/20"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="boot-grid" aria-hidden="true" />
      <div className="boot-horizon" aria-hidden="true" />
      <div className="boot-glow" aria-hidden="true" />

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center">
        <div className="brand-node relative mb-12 grid h-16 w-16 place-items-center rounded-[22px] text-white">
          <div className="absolute inset-0 rounded-[22px] bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.2),transparent_38%)]" />

          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="relative z-10"
          >
            <path d="M4 20 20 4" />
            <path d="M7 5c5.5-2.2 10.7 1.5 10.3 7.1-.4 5.7-6.1 8.7-11.1 6" />
            <path d="M5.7 14.7C3.9 9.4 6.5 4.8 12 3.5" />
          </svg>

          <div className="orbit-container absolute inset-[-14px] rounded-full border border-[#D8CDBE]/80">
            <div className="orbit-node absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF5A1F]" />
          </div>
        </div>

        <div className="loader-panel w-full rounded-[26px] p-6 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF5A1F] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF5A1F]" />
            </span>
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-[#9A9083]">
              System Boot
            </span>
          </div>

          <h2 className="mb-6 h-6 text-[15px] font-bold text-[#0B0B09] transition-all duration-300">
            {status}
          </h2>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E8DFD2]">
            <div
              className="h-full rounded-full bg-[#FF5A1F] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-3 flex w-full justify-between font-mono text-[9px] font-bold text-[#A99F91]">
            <span>RESURANK_V2.0</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap');

        .boot-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(to right, rgba(211, 116, 42, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(211, 116, 42, 0.08) 1px, transparent 1px);
          background-size: 42px 42px;
          mask-image: radial-gradient(ellipse at center, black 16%, transparent 72%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 16%, transparent 72%);
        }

        .boot-horizon {
          position: absolute;
          left: 50%;
          bottom: -38%;
          width: 132%;
          height: 48%;
          transform: translateX(-50%);
          border-top-left-radius: 50% 100%;
          border-top-right-radius: 50% 100%;
          background: #0B0B09;
          box-shadow:
            0 -6px 54px rgba(255, 90, 31, 0.16),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .boot-horizon::before {
          content: "";
          position: absolute;
          left: 50%;
          top: -32%;
          width: 48%;
          height: 70%;
          transform: translateX(-50%);
          border-radius: 999px;
          background: radial-gradient(
            ellipse at 50% 60%,
            rgba(255, 138, 0, 0.78) 0%,
            rgba(255, 75, 0, 0.56) 30%,
            rgba(141, 20, 0, 0.34) 56%,
            transparent 82%
          );
          filter: blur(46px);
          opacity: 0.62;
        }

        .boot-glow {
          position: absolute;
          left: 50%;
          top: 46%;
          width: 420px;
          height: 420px;
          transform: translate(-50%, -50%);
          border-radius: 999px;
          pointer-events: none;
          background: radial-gradient(circle, rgba(255, 90, 31, 0.1), transparent 66%);
          filter: blur(28px);
        }

        .brand-node {
          background:
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.18),
              rgba(255, 255, 255, 0.06) 42%,
              rgba(10, 9, 8, 0.42)
            ),
            rgba(10, 9, 8, 0.64);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow:
            0 26px 70px rgba(43, 31, 18, 0.2),
            0 8px 24px rgba(255, 90, 31, 0.09),
            inset 0 1px 0 rgba(255, 255, 255, 0.18),
            inset 0 -1px 0 rgba(0, 0, 0, 0.18);
          backdrop-filter: blur(24px) saturate(145%);
          -webkit-backdrop-filter: blur(24px) saturate(145%);
        }

        .loader-panel {
          background: rgba(255, 255, 255, 0.64);
          border: 1px solid rgba(229, 220, 207, 0.92);
          box-shadow:
            0 28px 72px rgba(55, 38, 20, 0.1),
            0 8px 24px rgba(255, 90, 31, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(24px) saturate(135%);
          -webkit-backdrop-filter: blur(24px) saturate(135%);
        }

        .orbit-container {
          animation: boot-spin 7s linear infinite;
        }

        .orbit-node {
          box-shadow: 0 0 18px rgba(255, 90, 31, 0.55);
          animation: boot-pulse 1.7s ease-in-out infinite alternate;
        }

        @keyframes boot-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes boot-pulse {
          from {
            box-shadow: 0 0 0 0 rgba(255, 90, 31, 0.24);
          }

          to {
            box-shadow: 0 0 18px 4px rgba(255, 90, 31, 0.14);
          }
        }

        @media (max-width: 640px) {
          .boot-horizon {
            width: 180%;
            bottom: -40%;
          }

          .boot-horizon::before {
            width: 62%;
          }
        }
      `}</style>
    </div>
  );
}