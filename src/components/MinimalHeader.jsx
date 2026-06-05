import React from "react";
import { Link } from "react-router-dom";

function MinimalHeader() {
  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-900/[0.06]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8" style={{ height: '72px' }}>
        
        {/* Brand Logo & Monogram */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center bg-gradient-to-tr from-blue-600 to-indigo-650 text-white transition-transform duration-300 group-hover:rotate-6">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5">
              <rect x="3" y="14" width="3.5" height="6" />
              <rect x="10" y="8" width="3.5" height="12" />
              <rect x="17" y="2" width="3.5" height="18" />
            </svg>
          </div>
          <span className="text-[14px] font-bold tracking-widest uppercase text-slate-900">
            ResuRank <span className="text-slate-400 font-normal ml-1">// CONSOLE</span>
          </span>
        </Link>

        {/* Back Link */}
        <Link 
          to="/" 
          className="text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-950 transition-colors"
        >
          ← Exit Terminal
        </Link>

      </div>
    </header>
  );
}

export default MinimalHeader;
