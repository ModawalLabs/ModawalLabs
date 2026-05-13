"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const EMAIL = "modawallabs@gmail.com";
const EASE  = [0.23, 1, 0.32, 1] as const;
const DUR   = 0.65;

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const { ref, isInView, y } = useScrollAnimation();

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hdr = (delay = 0) =>
    isInView
      ? { opacity: 1, y: 0,   transition: { duration: DUR, delay, ease: EASE } }
      : { opacity: 0, y,      transition: { duration: DUR, delay: 0, ease: EASE } };

  return (
    <section id="contact" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-blue-600/8 blur-[100px] pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">

          {/* Label */}
          <motion.span animate={hdr(0)} className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-400 mb-4 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5">
            Contact
          </motion.span>

          {/* Headline */}
          <motion.h2 animate={hdr(0.07)} className="text-4xl md:text-6xl font-bold text-white mt-4 mb-5 leading-tight">
            Let&apos;s Build{" "}<span className="gradient-text text-glow">Your SaaS</span>
          </motion.h2>
          <motion.p animate={hdr(0.14)} className="text-slate-400 text-lg mb-12">
            Have an idea? Let&apos;s turn it into a real product.
          </motion.p>

          {/* Contact boxes */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {/* Email */}
            <motion.button
              animate={
                isInView
                  ? { opacity: 1, y: 0, scale: 1,   transition: { duration: DUR, delay: 0.22, ease: EASE } }
                  : { opacity: 0, y,    scale: 0.96, transition: { duration: DUR, delay: 0,    ease: EASE } }
              }
              onClick={copyEmail}
              className="card-base rounded-2xl p-6 hover:border-blue-500/40 group text-left transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-500/20 transition-colors">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <p className="text-xs text-slate-500 mb-1">Email</p>
              <p className="text-white text-sm font-medium break-all">{EMAIL}</p>
              <p className="text-blue-400 text-xs mt-2 font-medium">{copied ? "✓ Copied!" : "Click to copy"}</p>
            </motion.button>

            {/* LinkedIn */}
            <motion.a
              animate={
                isInView
                  ? { opacity: 1, y: 0, scale: 1,   transition: { duration: DUR, delay: 0.32, ease: EASE } }
                  : { opacity: 0, y,    scale: 0.96, transition: { duration: DUR, delay: 0,    ease: EASE } }
              }
              href="https://www.linkedin.com/in/shivansh-modawal"
              target="_blank" rel="noopener noreferrer"
              className="card-base rounded-2xl p-6 hover:border-blue-500/40 group text-left transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-500/20 transition-colors">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <p className="text-xs text-slate-500 mb-1">LinkedIn</p>
              <p className="text-white text-sm font-medium">Shivansh Modawal</p>
              <p className="text-blue-400 text-xs mt-2 font-medium flex items-center gap-1">
                Connect
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </p>
            </motion.a>

            {/* Upwork */}
            <motion.a
              animate={
                isInView
                  ? { opacity: 1, y: 0, scale: 1,   transition: { duration: DUR, delay: 0.42, ease: EASE } }
                  : { opacity: 0, y,    scale: 0.96, transition: { duration: DUR, delay: 0,    ease: EASE } }
              }
              href="https://www.upwork.com/freelancers/~01cae69d522c373c3f?mp_source=share"
              target="_blank" rel="noopener noreferrer"
              className="card-base rounded-2xl p-6 hover:border-blue-500/40 group text-left transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-500/20 transition-colors">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.543-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
                </svg>
              </div>
              <p className="text-xs text-slate-500 mb-1">Upwork</p>
              <p className="text-white text-sm font-medium">Top-Rated Profile</p>
              <p className="text-blue-400 text-xs mt-2 font-medium flex items-center gap-1">
                Hire on Upwork
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </p>
            </motion.a>
          </div>

        </div>
      </div>
    </section>
  );
}
