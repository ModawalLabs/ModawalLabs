"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const designs = [
  { title: "SaaS Dashboard UI",        image: "/assets/MacBook Pro 16_ - 107.png" },
  { title: "Pricing Page",             image: "/assets/MacBook Pro 16_ - 126.png" },
  { title: "Mobile Onboarding Flow",   image: "/assets/Frame 1261154587.png" },
  { title: "Component Library",        image: "/assets/MacBook Pro 16_ - 59.png" },
  { title: "Landing Page Redesign",    image: "/assets/MacBook Pro 14_ - 2.png" },
  { title: "Auth & User Flow",         image: "/assets/MacBook Pro 16_ - 114.png" },
  { title: "Product Hunt Launch",      image: "/assets/3.png" },
  { title: "Admin Panel Design",       image: "/assets/Desktop - 124.png" },
];

const SPRING = "cubic-bezier(0.23, 1, 0.32, 1)";
const EASE   = [0.23, 1, 0.32, 1] as const;
const DUR    = 0.65;

export default function Designs() {
  const { ref, isInView, y } = useScrollAnimation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const hdr = (delay = 0) =>
    isInView
      ? { opacity: 1, y: 0,   transition: { duration: DUR, delay, ease: EASE } }
      : { opacity: 0, y,      transition: { duration: DUR, delay: 0, ease: EASE } };

  return (
    <section id="designs" className="section-padding" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.span animate={hdr(0)} className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-400 mb-4 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5">
            Designs
          </motion.span>
          <motion.h2 animate={hdr(0.07)} className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4">
            My <span className="gradient-text">Design Work</span>
          </motion.h2>
          <motion.p animate={hdr(0.14)} className="text-slate-400 text-lg max-w-xl mx-auto">
            Clean, intuitive interfaces crafted for real products.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {designs.map((design, i) => {
            const isHovered = hoveredIndex === i;
            const isShrunk  = hoveredIndex !== null && !isHovered;

            return (
              // Layer 1 — scroll-reveal (framer-motion, direction-aware)
              <motion.div
                key={i}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, scale: 1,    transition: { duration: DUR, delay: 0.18 + i * 0.055, ease: EASE } }
                    : { opacity: 0, y,    scale: 0.95,  transition: { duration: DUR, delay: 0,                ease: EASE } }
                }
                className="relative"
              >
                {/* Layer 2 — focus shrink (JS-driven so siblings respond) */}
                <div
                  style={{
                    transform:  isShrunk ? "scale(0.91)" : "scale(1)",
                    opacity:    isShrunk ? 0.55 : 1,
                    transition: `transform 500ms ${SPRING}, opacity 500ms ${SPRING}`,
                  }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Layer 3 — popup card */}
                  <div
                    className="relative rounded-2xl overflow-hidden aspect-[4/3]"
                    style={{
                      transform: isHovered
                        ? "scale(1.13) translateY(-10px)"
                        : "scale(1) translateY(0px)",
                      boxShadow: isHovered
                        ? "0 32px 80px rgba(0,0,0,0.65), 0 0 40px rgba(59,130,246,0.28)"
                        : "none",
                      transition: `transform 500ms ${SPRING}, box-shadow 500ms ${SPRING}`,
                      zIndex: isHovered ? 10 : "auto",
                    }}
                  >
                    <Image
                      src={design.image}
                      alt={design.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A]/50 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
