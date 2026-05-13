"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const EASE = [0.23, 1, 0.32, 1] as const;
const DUR  = 0.65;

/* ── Bundles data ─────────────────────────────────────────────── */
const bundles = [
  {
    name: "Road to MVP Bundle",
    tagline: "All 7 Road to MVP products. Go from raw idea to launched product.",
    originalPrice: "$178", price: "$99", saving: "Save $79",
    tag: "Most Popular", icon: "🚀",
    available: true,
    includes: ["Idea Validation Kit", "Market Research Playbook", "MVP Wireframe Templates", "Tech Stack Decision Guide", "MVP Build Checklist", "Beta Launch Strategy", "Feedback & Iteration Framework"],
  },
  {
    name: "Prompt to UI Bundle",
    tagline: "All 6 UI kits and design systems at one discounted price.",
    originalPrice: "$256", price: "$129", saving: "Save $127",
    tag: "Coming Soon", icon: "🎨",
    available: false,
    includes: ["SaaS Component Library", "Mobile-First UI Kit", "Landing Page Design System", "Admin Dashboard Template", "Auth Flow UI Pack", "Pricing & Checkout UI"],
  },
  {
    name: "Complete Founder Pack",
    tagline: "Every product across all sections. The ultimate toolkit for SaaS founders.",
    originalPrice: "$434", price: "$199", saving: "Save $235",
    tag: "Coming Soon", icon: "🏆",
    available: false,
    includes: ["Everything in Road to MVP Bundle", "Everything in Prompt to UI Bundle", "Bonus: 1-hour strategy call", "Lifetime updates"],
  },
];

/* ── Shared check icon ────────────────────────────────────────── */
const Check = ({ color = "#60A5FA" }: { color?: string }) => (
  <svg width="14" height="14" fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export default function BundlesSection() {
  const { ref, isInView, y } = useScrollAnimation();

  const hdr = (delay = 0) =>
    isInView
      ? { opacity: 1, y: 0,   transition: { duration: DUR, delay, ease: EASE } }
      : { opacity: 0, y,      transition: { duration: DUR, delay: 0, ease: EASE } };

  return (
    <section ref={ref} className="section-padding">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-14">
          <motion.h2 animate={hdr(0)} className="text-4xl md:text-5xl font-bold text-white mb-4">
            More for <span className="gradient-text">Less</span>
          </motion.h2>
          <motion.p animate={hdr(0.14)} className="text-slate-400 text-lg max-w-xl">
            Curated bundles that combine the right products for your stage. Buy together and save big.
          </motion.p>
        </div>

        <div className="flex flex-col gap-6">
          {bundles.map((bundle, i) => (
            <motion.div
              key={i}
              animate={
                isInView
                  ? { opacity: 1, y: 0, scale: 1,   transition: { duration: DUR, delay: 0.2 + i * 0.1, ease: EASE } }
                  : { opacity: 0, y,    scale: 0.97, transition: { duration: DUR, delay: 0,              ease: EASE } }
              }
              className={`relative rounded-3xl overflow-hidden border transition-colors duration-300 ${bundle.available ? "border-blue-500/20 bg-gradient-to-br from-blue-600/8 via-[#0B0F1A] to-indigo-600/8 hover:border-blue-500/40" : "border-white/5 bg-white/10 opacity-80 shadow-[0_0_30px_rgba(59,130,246,0.12)]"}`}
            >
              {!bundle.available && (
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm animate-pulse pointer-events-none" />
              )}
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-blue-500/8 blur-[60px] pointer-events-none" />
              <div className={`relative p-8 md:p-10 flex flex-col ${bundle.available ? "lg:flex-row gap-8 lg:items-center" : "items-center text-center justify-center"}`}>
                {/* Active bundle content */}
                {bundle.available ? (
                  <>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">{bundle.icon}</span>
                        <span className="text-xs font-bold px-3 py-1 rounded-full text-white bg-blue-500 shadow-blue-500/30 shadow-md">
                          {bundle.tag}
                        </span>
                        <span className="text-xs font-semibold text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                          {bundle.saving}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{bundle.name}</h3>
                      <p className="text-slate-400 leading-relaxed mb-6 max-w-lg">{bundle.tagline}</p>
                      <button disabled className="bg-white/5 text-slate-500 cursor-not-allowed px-8 py-3.5 rounded-xl text-base font-bold border border-white/5">
                        <span>Coming Soon</span>
                      </button>
                    </div>
                    <div className="lg:w-[320px] flex-shrink-0">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">What&apos;s included</p>
                      <ul className="space-y-2.5">
                        {bundle.includes.map((item, ii) => (
                          <li key={ii} className="flex items-center gap-3 text-sm text-slate-300">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center"><Check /></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <div className="w-full space-y-6 text-slate-400">
                    {/* <span className="inline-flex items-center justify-center text-xs font-semibold tracking-widest uppercase text-slate-300 px-4 py-2 rounded-full bg-white/5 border border-white/5">
                      Coming Soon
                    </span> */}
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-300">{bundle.name}</h3>
                    <button
                      disabled
                      className="mx-auto bg-white/5 text-slate-300 cursor-not-allowed px-8 py-3.5 rounded-xl text-base font-bold border border-white/5 shadow-[0_0_30px_rgba(59,130,246,0.1)]"
                    >
                      <span>Coming Soon</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}