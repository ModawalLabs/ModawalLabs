"use client";

import { useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";

const TILT = 7;

export default function PSNote() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-8% 0px" });

  const cardRef  = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card  = cardRef.current;
    const glare = glareRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
    const dy = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
    const rx = -dy * TILT;
    const ry =  dx * TILT;
    card.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1)`;
    if (glare) {
      const gx = ((e.clientX - rect.left) / rect.width)  * 100;
      const gy = ((e.clientY - rect.top)  / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 40%, transparent 70%)`;
      glare.style.opacity = "1";
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    const card  = cardRef.current;
    const glare = glareRef.current;
    if (card)  card.style.transition  = "transform 0.1s linear";
    if (glare) glare.style.transition = "opacity 0.1s ease";
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card  = cardRef.current;
    const glare = glareRef.current;
    if (card) {
      card.style.transition = "transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)";
      card.style.transform  = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    }
    if (glare) {
      glare.style.transition = "opacity 0.5s ease";
      glare.style.opacity    = "0";
    }
  }, []);

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
        >
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="card-base rounded-2xl p-8 md:p-12 relative overflow-hidden"
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
          >
            {/* Glare overlay */}
            <div
              ref={glareRef}
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ opacity: 0 }}
            />

            {/* Label */}
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-400 mb-8 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5">
              P.S.
            </span>

            {/* Body copy */}
            <div className="space-y-4">
              <p className="text-slate-200 leading-relaxed">
                This entire website was built using AI — guided with clear direction and execution.
              </p>
              <p className="text-slate-400 leading-relaxed">
                No traditional design cycles. No long timelines. Just a focused system used the right way.
              </p>
              <p className="text-white font-semibold leading-relaxed">
                That's the shift most people are still missing.
              </p>
              <p className="text-slate-400 leading-relaxed">
                AI won't build great products on its own. But in the hands of someone who knows how to
                use it, it becomes a serious advantage.
              </p>
              <p className="text-slate-400 leading-relaxed">
                If you've been sitting on an idea because you "can't code" or don't know where to
                start — this is your proof that you don't need to do everything yourself.
              </p>
              <p className="text-white font-semibold leading-relaxed">
                You need the right system.
              </p>
            </div>

            {/* Divider */}
            <div className="my-8 h-px bg-white/5" />

            {/* Download CTA */}
            <div className="space-y-5">
              <p className="text-slate-400 leading-relaxed">
                I've put together the exact design file behind this site so you can see how it's
                structured. Just add this file to Claude and ask it to build the website !
              </p>

              <a
                href="/brand_design_guidelines.md"
                download="brand_design_guidelines.md"
                className="btn-primary inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold text-white"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download the design.md
              </a>

              <p className="text-slate-500 text-sm leading-relaxed">
                Use it. Learn from it. Build something with it.
              </p>
            </div>

            {/* Divider */}
            <div className="my-8 h-px bg-white/5" />

            {/* Closing line */}
            <p className="text-slate-400 leading-relaxed">
              And if you want to move faster — and do it right —{" "}
              <span className="text-white font-medium">I can help you get there.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
