"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TiltCard from "@/components/TiltCard";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const scrollOpacity = useTransform(scrollYProgress, [0.52, 0.82], [1, 0]);
  const scrollY       = useTransform(scrollYProgress, [0.52, 0.82], [0, 60]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/8 blur-[120px] animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-600/6 blur-[100px] animate-pulse-glow delay-300 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left — text */}
          <div className="flex-1 text-left">
            <h1
              className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6 animate-fade-in-up delay-100"
              style={{ opacity: 0, animationFillMode: "forwards" }}
            >
              Stop Overthinking.
              <span className="block gradient-text text-glow">
                Start Building Your SaaS.
              </span>
            </h1>

            <p
              className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed mb-10 animate-fade-in-up delay-200"
              style={{ opacity: 0, animationFillMode: "forwards" }}
            >
              I help non-tech founders go from idea to live product
              — without needing technical skills or a big team.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 items-center animate-fade-in-up delay-300"
              style={{ opacity: 0, animationFillMode: "forwards" }}
            >
              <a href="#products" className="btn-primary px-8 py-4 rounded-xl text-base font-semibold text-white min-w-[180px] text-center">
                <span>View Products</span>
              </a>
              <a href="#services" className="btn-outline px-8 py-4 rounded-xl text-base font-semibold text-white min-w-[180px] text-center">
                Hire Me
              </a>
            </div>
          </div>

          {/* Right — profile image with orbital tilt */}
          <motion.div
            className="flex-shrink-0 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <motion.div style={{ opacity: scrollOpacity, y: scrollY }}>
              <TiltCard
                src="/assets/myself.jpeg"
                alt="Shivansh Modawal"
                cardClassName="w-[300px] sm:w-[340px] lg:w-[380px] h-[400px] sm:h-[440px] lg:h-[480px]"
              >
                {/* Floating badges — rendered flat inside TiltCard's outer relative wrapper */}
                <div className="absolute -bottom-4 -left-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0F1629] border border-white/10 shadow-xl z-10">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-slate-300 font-medium">Available</span>
                </div>
                <div className="absolute -top-4 -right-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0F1629] border border-white/10 shadow-xl z-10">
                  <span className="text-xs text-blue-300 font-bold">4+</span>
                  <span className="text-xs text-slate-400">yrs experience</span>
                </div>
              </TiltCard>
            </motion.div>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        {/* <div className="flex justify-start mt-12">
          <div
            className="flex flex-col items-start gap-2 animate-fade-in delay-700"
            style={{ opacity: 0, animationFillMode: "forwards" }}
          >
            <span className="text-xs text-slate-600 tracking-widest uppercase">Scroll to explore</span>
            <div className="w-px h-12 bg-gradient-to-b from-blue-500/50 to-transparent animate-pulse" />
          </div>
        </div> */}
      </div>
    </section>
  );
}
