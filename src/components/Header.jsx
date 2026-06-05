import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Platform", path: "/tools" },
    { name: "Workspace", path: "/resume-screener-bot" },
    { name: "Customers", path: "/about" },
    { name: "Help Center", path: "/help" },
  ];

  const isActive = (path) => location.pathname === path;

  // Handle scroll effect for dynamic island sizing/shadows
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ----------------------------------------------------------------------
          INJECTED CUSTOM STYLES FOR PREMIUM NAVIGATION
      ---------------------------------------------------------------------- */}
      <style dangerouslySetInnerHTML={{ __html: `
        .nav-glass {
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 4px 24px -6px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 1);
        }
        
        .nav-glass-scrolled {
          background: rgba(255, 255, 255, 0.85);
          box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        .cta-button {
          position: relative;
          overflow: hidden;
          background: #09090B;
          color: white;
          box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.1);
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

        .cta-button:hover::after {
          left: 200%;
        }

        .mobile-menu-glass {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
        }
      `}} />

      {/* Floating Spatial Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center ${scrolled ? 'pt-2 sm:pt-4' : 'pt-4 sm:pt-6'} px-4 sm:px-6 pointer-events-none`}>
        
        <div className={`pointer-events-auto w-full max-w-[1200px] flex items-center justify-between rounded-full transition-all duration-500 px-4 sm:px-6 nav-glass ${scrolled ? 'h-14 sm:h-16 nav-glass-scrolled' : 'h-16 sm:h-[72px]'}`}>
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* Minimalist Vector Node Logo */}
            <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-950 text-white shadow-md transition-transform duration-500 group-hover:scale-105 group-hover:rotate-[15deg]">
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-800 to-transparent opacity-50 rounded-xl" />
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[15px] font-semibold tracking-tight text-zinc-950">
                ResuRank
              </span>
              <span className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[9px] font-mono font-medium tracking-widest text-zinc-500 uppercase">
                Engine
              </span>
            </div>
          </Link>

          {/* Center Navigation (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-100/50 p-1 rounded-full border border-zinc-200/50">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-5 py-2 text-[13px] font-medium tracking-wide transition-all duration-300 rounded-full ${
                    active 
                      ? "text-zinc-950 bg-white shadow-sm ring-1 ring-zinc-200/50" 
                      : "text-zinc-500 hover:text-zinc-950 hover:bg-zinc-200/30"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right: Auth Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <Link 
              to="/login" 
              className="px-4 py-2 text-[13px] font-medium tracking-wide text-zinc-500 hover:text-zinc-950 transition-colors rounded-full hover:bg-zinc-100"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="cta-button inline-flex items-center justify-center rounded-full px-5 py-2 text-[13px] font-medium tracking-wide"
            >
              Initialize
              <svg className="ml-2 w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative h-10 w-10 flex items-center justify-center rounded-full bg-zinc-100/50 text-zinc-600 hover:bg-zinc-200/50 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1.5 items-end">
              <span className={`h-[2px] bg-current rounded-full transition-all duration-300 ${isOpen ? 'w-5 rotate-45 translate-y-[8px]' : 'w-5'}`} />
              <span className={`h-[2px] bg-current rounded-full transition-all duration-300 ${isOpen ? 'w-0 opacity-0' : 'w-4'}`} />
              <span className={`h-[2px] bg-current rounded-full transition-all duration-300 ${isOpen ? 'w-5 -rotate-45 -translate-y-[8px]' : 'w-3'}`} />
            </div>
          </button>

        </div>
      </header>

      {/* Mobile Menu Dropdown (Spatial Overlay) */}
      <div 
        className={`fixed inset-x-4 top-[88px] z-40 transition-all duration-500 md:hidden pointer-events-none ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className={`pointer-events-auto rounded-[2rem] border border-zinc-200/80 shadow-2xl p-6 mobile-menu-glass ${isOpen ? "block" : "hidden"}`}>
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3.5 rounded-2xl text-[15px] font-medium tracking-wide transition-colors ${
                  isActive(link.path) 
                    ? "bg-zinc-100 text-zinc-950" 
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-zinc-100 flex flex-col gap-3">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center px-4 py-3.5 rounded-2xl text-[15px] font-medium tracking-wide text-zinc-600 hover:bg-zinc-50 transition-colors"
            >
              Sign in to Workspace
            </Link>
            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="cta-button flex items-center justify-center px-4 py-4 rounded-2xl text-[15px] font-medium tracking-wide"
            >
              Initialize New Project
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}