"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Hire Me",  href: "#services" },
  { label: "Designs",  href: "#designs"  },
  { label: "Services", href: "#services" },
  { label: "Contact",  href: "#contact"  },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const pathname  = usePathname();
  const isHome    = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkHref = (hash: string) => isHome ? hash : `/${hash}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B0F1A]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="text-white font-semibold text-lg tracking-tight hover:text-blue-400 transition-colors duration-200"
        >
          <span className="gradient-text font-bold">Modawal</span>
          <span className="text-white/90">Labs</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={linkHref(link.href)}
              className="text-sm text-slate-400 hover:text-white transition-colors duration-200 tracking-wide"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/products"
            className="btn-primary px-5 py-2 rounded-lg text-sm font-semibold text-white"
          >
            <span>Products</span>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        } bg-[#0B0F1A]/95 backdrop-blur-xl border-b border-white/5`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={linkHref(link.href)}
              onClick={() => setMobileOpen(false)}
              className="text-slate-300 hover:text-white transition-colors py-2 border-b border-white/5 last:border-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/products"
            onClick={() => setMobileOpen(false)}
            className="btn-primary px-5 py-2.5 rounded-lg text-sm font-semibold text-white text-center mt-2"
          >
            <span>Products</span>
          </a>
        </div>
      </div>
    </header>
  );
}
