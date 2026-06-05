import React from "react";
import { Link } from "react-router-dom";

export default function MinimalHeader() {
  return (
    <>
      <header className="sticky top-0 z-50 w-full minimal-glass border-b border-white/[0.04]">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 sm:px-12" style={{ height: '80px' }}>
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white transition-all duration-300 group-hover:bg-white/10 group-hover:scale-105">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <span className="text-[17px] font-medium tracking-tight text-white">
              ResuRank
            </span>
          </Link>

          {/* Clean Exit Link */}
          <Link 
            to="/" 
            className="text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Exit to site
          </Link>

        </div>
      </header>

      {/* ----------------------------------------------------------------------
          INJECTED CUSTOM STYLES AT BOTTOM
      ---------------------------------------------------------------------- */}
      <style dangerouslySetInnerHTML={{ __html: `
        .minimal-glass {
          background: rgba(5, 5, 5, 0.8);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }
      `}} />
    </>
  );
}