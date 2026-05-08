"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const EASE = [0.23, 1, 0.32, 1] as const;
const DUR  = 0.65;

const pillars = [
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.607L5 14.5m14.8.5l.232.568a9 9 0 01-17.064 0L5 14.5" />
      </svg>
    ),
    step: "01", title: "Validate Before You Build",
    text: "Turn your idea into a clear, testable concept. Discover what users actually need before you spend a dollar on development.",
    tag: "Strategy", color: "from-blue-500/20 to-indigo-500/10", borderColor: "hover:border-blue-500/40",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    step: "02", title: "Build MVP Fast",
    text: "Launch a working product in days, not months. Clean code, modern stack, production-ready from day one.",
    tag: "Development", color: "from-blue-600/20 to-blue-400/10", borderColor: "hover:border-blue-400/40",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    step: "03", title: "Launch & Iterate",
    text: "Get users, gather feedback, and improve fast. Build a product your market actually loves.",
    tag: "Growth", color: "from-indigo-500/20 to-blue-500/10", borderColor: "hover:border-indigo-400/40",
  },
];

export default function WhatIDo() {
  const { ref, isInView, y } = useScrollAnimation();

  const hidden  = (delay = 0) => ({ opacity: 0, y,    transition: { duration: DUR, delay, ease: EASE } });
  const visible = (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: DUR, delay, ease: EASE } });

  return (
    <section id="what-i-do" className="section-padding" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-6 mb-20">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            animate={isInView ? visible(0) : hidden(0)}
            className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-400 mb-4 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5"
          >
            Process
          </motion.span>
          <motion.h2
            animate={isInView ? visible(0.07) : hidden(0.07)}
            className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4"
          >
            From Idea{" "}
            <span className="gradient-text">→ Launch</span>{" "}
            <span className="text-white/70">→ Growth</span>
          </motion.h2>
          <motion.p
            animate={isInView ? visible(0.14) : hidden(0.14)}
            className="text-slate-400 text-lg max-w-xl mx-auto"
          >
            A proven three-step system to get your SaaS from concept to customers.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              animate={
                isInView
                  ? { opacity: 1, y: 0, scale: 1,    transition: { duration: DUR, delay: 0.2 + i * 0.1, ease: EASE } }
                  : { opacity: 0, y,    scale: 0.96,  transition: { duration: DUR, delay: 0,              ease: EASE } }
              }
              className={`card-base rounded-2xl p-8 ${pillar.borderColor} cursor-default`}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold text-blue-400/60 tracking-widest">{pillar.step}</span>
                <span className="text-xs font-semibold text-blue-300 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">{pillar.tag}</span>
              </div>
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pillar.color} border border-white/10 flex items-center justify-center text-blue-300 mb-6`}>
                {pillar.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{pillar.text}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
