import React from "react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-light-orange] pt-32 pb-8 font-sans">
      <div className="pointer-events-none absolute bottom-[-160px] left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[#FF5A1F]/2 blur-[120px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF5A1F]/5 to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-12">
        <div className="flex w-full items-center justify-center overflow-hidden pb-24 text-center">
          <h1 className="giant-footer-text font-black tracking-tight">
            RESURANK
          </h1>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-between gap-4 border-t border-[#E5DCCF] pt-8 text-[12px] font-bold text-[#6F675E] sm:flex-row">
          <p>
            © {new Date().getFullYear()} ResuRank AI Inc. All rights reserved.
          </p>

          <div className="flex gap-6">
            <button
              type="button"
              className="transition-colors hover:text-[#0B0B09]"
            >
              Terms
            </button>
            <button
              type="button"
              className="transition-colors hover:text-white"
            >
              Privacy
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .giant-footer-text {
          font-size: clamp(5rem, 15vw, 20rem);
          line-height: 0.8;
          user-select: none;
          background: linear-gradient(
            180deg,
            rgba(255, 90, 31, 0.28) 0%,
            rgba(255, 90, 31, 0.02) 72%,
            rgba(255, 90, 31, 0) 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </footer>
  );
}