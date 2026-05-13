"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const EASE = [0.23, 1, 0.32, 1] as const;
const DUR  = 0.65;

export default function Footer() {
  const year = new Date().getFullYear();
  const { ref, isInView, y } = useScrollAnimation();

  const links = [
    { label: "LinkedIn",     href: "https://www.linkedin.com/in/shivansh-modawal" },
    { label: "Upwork",       href: "https://www.upwork.com/freelancers/~01cae69d522c373c3f?mp_source=share" },
    { label: "Stackoverflow", href: "https://stackoverflow.com/users/22928225/shivansh-modawal" },
  ];

  return (
    <footer ref={ref} className="border-t border-white/5 bg-[#080C17]">
      <div className="max-w-[1200px] mx-auto px-6 py-[73px]">

        <motion.div
          animate={
            isInView
              ? { opacity: 1, y: 0,   transition: { duration: DUR, ease: EASE } }
              : { opacity: 0, y,      transition: { duration: DUR, ease: EASE } }
          }
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Name + tagline */}
          <div className="text-center md:text-left">
            <div className="text-lg font-bold">
              <span className="gradient-text">Modawal</span>
              <span className="text-white/90">Labs</span>
            </div>
            <p className="text-slate-500 text-sm mt-1">Helping build SaaS that founders actually ship.</p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#products"  className="text-sm text-slate-500 hover:text-white transition-colors">Products</a>
            <a href="#designs"   className="text-sm text-slate-500 hover:text-white transition-colors">Designs</a>
            <a href="#services"  className="text-sm text-slate-500 hover:text-white transition-colors">Services</a>
            <a href="#contact"   className="text-sm text-slate-500 hover:text-white transition-colors">Contact</a>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center text-slate-500 hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-200"
              >
                {link.label === "LinkedIn" && (
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                )}
                {link.label === "Upwork" && (
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.543-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
                  </svg>
                )}
                {link.label === "Stackoverflow" && (
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.473 20.562v-6.187h2.062v8.25H4.469v-8.25h2.062v6.187h10.942zM8.594 17.469h6.813v-2.063H8.594v2.063zM8.922 13.344l6.656 1.406.438-2.016-6.656-1.406-.438 2.016zM10.094 9.719l6.094 2.844.875-1.875-6.094-2.844-.875 1.875zM12.063 6.75l5.188 4.375 1.344-1.594-5.188-4.375-1.344 1.594zM15.094 4.875l4.219 5.625 1.656-1.25-4.219-5.625-1.656 1.25z" />
                  </svg>
                )}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          animate={
            isInView
              ? { opacity: 1, transition: { duration: DUR, delay: 0.2, ease: EASE } }
              : { opacity: 0, transition: { duration: DUR, delay: 0,   ease: EASE } }
          }
          className="mt-8 pt-6 border-t border-white/5 text-center"
        >
          <p className="text-slate-600 text-xs">
            © {year} ModawalLabs. Built with Next.js &amp; Tailwind CSS.
          </p>
        </motion.div>

      </div>
    </footer>
  );
}
