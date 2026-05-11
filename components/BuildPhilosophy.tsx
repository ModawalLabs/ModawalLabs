"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function BuildPhilosophy() {
  const { ref, isInView, y } = useScrollAnimation();

  const EASE = [0.23, 1, 0.32, 1] as const;
  const DUR = 0.65;

  const anim = (delay = 0) =>
    isInView
      ? { opacity: 1, y: 0, transition: { duration: DUR, delay, ease: EASE } }
      : { opacity: 0, y, transition: { duration: DUR, delay: 0, ease: EASE } };

  return (
    <section id="build-philosophy" className="section-padding relative" ref={ref}>
      {/* Sheen sweep — covers the entire section */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 z-10"
        style={{
          width: "45%",
          left: 0,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.052) 40%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.052) 60%, transparent 100%)",
        }}
        animate={isInView ? { x: ["-100%", "280%"] } : { x: "-100%" }}
        transition={
          isInView
            ? {
                duration: 3,
                ease: [0.25, 0.46, 0.45, 0.94],
                repeat: Infinity,
                repeatDelay: 5.5,
                delay: 1.4,
              }
            : {}
        }
      />

      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <motion.span
            animate={anim(0)}
            className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-400 mb-4 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5"
          >
            Philosophy
          </motion.span>
          <motion.h2
            animate={anim(0.07)}
            className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4"
          >
            The <span className="gradient-text">Build Philosophy</span>
          </motion.h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <motion.p
            animate={anim(0.14)}
            className="text-slate-300 text-lg md:text-xl leading-relaxed mb-6"
          >
            Great ideas shouldn&apos;t require a technical background or a massive budget to become real products.
          </motion.p>
          <motion.p
            animate={anim(0.21)}
            className="text-slate-400 text-lg leading-relaxed mb-6"
          >
            I help non-technical founders move from idea to execution with clarity — without wasting thousands on unnecessary development or poorly planned builds.
          </motion.p>
          <motion.p
            animate={anim(0.28)}
            className="text-slate-400 text-lg leading-relaxed mb-6"
          >
            Before a single line of code is written, founders should know exactly what they&apos;re building, who it&apos;s for, and how to launch it efficiently.
          </motion.p>
          <motion.p
            animate={anim(0.35)}
            className="text-slate-300 text-lg leading-relaxed font-medium"
          >
            My goal is simple: equip founders with the strategy, structure, and AI-powered tools needed to build with confidence.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
