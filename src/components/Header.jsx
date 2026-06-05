import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Features", path: "/tools" },
    { name: "Workspace", path: "/resume-screener-bot" },
    { name: "About", path: "/about" },
    { name: "Help", path: "/help" },
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`pointer-events-none fixed left-0 right-0 top-0 z-50 flex justify-center px-4 transition-all duration-500 ${
          scrolled ? "pt-3" : "pt-5"
        }`}
      >
        <div
          className={`nav-shell pointer-events-auto flex w-full max-w-[860px] items-center justify-between rounded-[18px] px-4 transition-all duration-500 sm:px-5 ${
            scrolled ? "h-14 nav-shell-scrolled" : "h-16"
          }`}
        >
          <Link to="/" className="group flex items-center gap-3">
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-white text-[#0A0908] shadow-[inset_0_-1px_0_rgba(0,0,0,0.08)]">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 20 20 4" />
                <path d="M7 5c5.5-2.2 10.7 1.5 10.3 7.1-.4 5.7-6.1 8.7-11.1 6" />
                <path d="M5.7 14.7C3.9 9.4 6.5 4.8 12 3.5" />
              </svg>
            </div>
            <span className="text-[15px] font-black tracking-tight text-white">
              ResuRank
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`rounded-xl px-4 py-2 text-[12px] font-bold transition-all ${
                  isActive(link.path)
                    ? "bg-white text-[#0A0908]"
                    : "text-white/72 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/login"
              className="text-[12px] font-bold text-white/60 transition-colors hover:text-white"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="rounded-xl bg-[#FF5A1F] px-5 py-2.5 text-[12px] font-black text-white shadow-[0_8px_20px_rgba(255,90,31,0.34)] transition hover:bg-[#ff6f39] active:scale-95"
            >
              Get started
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.08] text-white md:hidden"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
          >
            <div className="flex w-5 flex-col items-end gap-1.5">
              <span
                className={`h-[1.5px] rounded-full bg-white transition-all ${
                  isOpen ? "w-5 translate-y-[4px] rotate-45" : "w-5"
                }`}
              />
              <span
                className={`h-[1.5px] rounded-full bg-white transition-all ${
                  isOpen ? "w-5 -translate-y-[4px] -rotate-45" : "w-3"
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-[#0A0908] px-6 pt-28 transition-all duration-300 md:hidden ${
          isOpen
            ? "opacity-100"
            : "pointer-events-none translate-y-[-10px] opacity-0"
        }`}
      >
        <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_top,rgba(255,90,31,0.22),transparent_64%)]" />

        <div className="relative mx-auto flex max-w-sm flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`rounded-2xl border px-5 py-4 text-lg font-black transition ${
                isActive(link.path)
                  ? "border-white bg-white text-[#0A0908]"
                  : "border-white/[0.08] bg-white/[0.03] text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="mt-5 grid grid-cols-2 gap-3">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="flex h-13 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-4 text-center text-sm font-black text-white"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="flex h-13 items-center justify-center rounded-2xl bg-[#FF5A1F] px-4 py-4 text-center text-sm font-black text-white"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>

      <style>{`
       .nav-shell {
        background:
          linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.18),
            rgba(255, 255, 255, 0.06) 42%,
            rgba(10, 9, 8, 0.42)
          ),
          rgba(10, 9, 8, 0.58);
        border: 1px solid rgba(255, 255, 255, 0.22);
        box-shadow:
          0 24px 70px rgba(43, 31, 18, 0.18),
          0 8px 24px rgba(255, 90, 31, 0.08),
          inset 0 1px 0 rgba(255, 255, 255, 0.18),
          inset 0 -1px 0 rgba(0, 0, 0, 0.18);
        backdrop-filter: blur(26px) saturate(145%);
        -webkit-backdrop-filter: blur(26px) saturate(145%);
      }
      
      .nav-shell-scrolled {
        background:
          linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.16),
            rgba(255, 255, 255, 0.05) 42%,
            rgba(10, 9, 8, 0.5)
          ),
          rgba(10, 9, 8, 0.66);
        border-color: rgba(255, 255, 255, 0.24);
        box-shadow:
          0 18px 54px rgba(43, 31, 18, 0.2),
          0 8px 22px rgba(255, 90, 31, 0.08),
          inset 0 1px 0 rgba(255, 255, 255, 0.16),
          inset 0 -1px 0 rgba(0, 0, 0, 0.2);
      }
      `}</style>
    </>
  );
}