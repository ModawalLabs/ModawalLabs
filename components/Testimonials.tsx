"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const EASE = [0.23, 1, 0.32, 1] as const;
const DUR  = 0.65;

const testimonials = [
  {
    quote: "Shivansh took my vague idea and turned it into a fully working SaaS in under 3 weeks. I didn't have to hire anyone else.",
    name: "Marcus T.", role: "Founder, LeadFlow AI", avatar: "MT", color: "from-blue-500 to-indigo-600",
  },
  {
    quote: "The MVP validation process saved me from building the wrong product. Literally saved me months of wasted dev time.",
    name: "Priya S.", role: "Non-Tech Founder, EduPath", avatar: "PS", color: "from-indigo-500 to-purple-600",
  },
  {
    quote: "Best investment I made. Clean code, beautiful UI, and he actually understood my vision from day one.",
    name: "James R.", role: "Solo Founder, TaskBot", avatar: "JR", color: "from-cyan-500 to-blue-600",
  },
];

export default function Testimonials() {
  const { ref, isInView, y } = useScrollAnimation();

  const hdr = (delay = 0) =>
    isInView
      ? { opacity: 1, y: 0,   transition: { duration: DUR, delay, ease: EASE } }
      : { opacity: 0, y,      transition: { duration: DUR, delay: 0, ease: EASE } };

  return (
    <section id="testimonials" className="section-padding" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.span animate={hdr(0)} className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-400 mb-4 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5">
            Testimonials
          </motion.span>
          <motion.h2 animate={hdr(0.07)} className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4">
            What <span className="gradient-text">Founders Say</span>
          </motion.h2>
          <motion.p animate={hdr(0.14)} className="text-slate-400 text-lg">
            Real results from real founders.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              animate={
                isInView
                  ? { opacity: 1, y: 0, scale: 1,   transition: { duration: DUR, delay: 0.2 + i * 0.1, ease: EASE } }
                  : { opacity: 0, y,    scale: 0.96, transition: { duration: DUR, delay: 0,              ease: EASE } }
              }
              className="card-base rounded-2xl p-6 hover:border-blue-500/30"
            >
              <div className="text-blue-400/30 mb-4">
                <svg width="32" height="32" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7.333C7.333 11.791 8.791 10 10 10V8zm14 0c-3.314 0-6 2.686-6 6v10h10V14h-6.667C21.333 11.791 22.791 10 24 10V8z" />
                </svg>
              </div>
              <p className="text-slate-200 text-base leading-relaxed mb-8 font-medium">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{t.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(5)].map((_, si) => (
                    <svg key={si} width="14" height="14" fill="#F59E0B" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
