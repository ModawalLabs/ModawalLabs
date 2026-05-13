"use client";

import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EASE = [0.23, 1, 0.32, 1] as const;
const DUR  = 0.65;

/* ── Tab config ───────────────────────────────────────────────── */
const TABS = ["Road to MVP", "Bundles", "Prompt to UI"] as const;
type Tab = typeof TABS[number];

/* ── Dynamic imports for code splitting ───────────────────────── */
const RoadToMVPSection = dynamic(() => import("@/components/products/RoadToMVPSection"), {
  loading: () => <div className="section-padding"><div className="max-w-[1200px] mx-auto px-6"><div className="text-center text-slate-400">Loading...</div></div></div>
});

const BundlesSection = dynamic(() => import("@/components/products/BundlesSection"), {
  loading: () => <div className="section-padding"><div className="max-w-[1200px] mx-auto px-6"><div className="text-center text-slate-400">Loading...</div></div></div>
});

const PromptToUISection = dynamic(() => import("@/components/products/PromptToUISection"), {
  loading: () => <div className="section-padding"><div className="max-w-[1200px] mx-auto px-6"><div className="text-center text-slate-400">Loading...</div></div></div>
});

/* ── Hero ─────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-blue-600/8 blur-[120px] pointer-events-none" />
      <div className="relative max-w-[1200px] mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR, ease: EASE }}
          className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-400 mb-4 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5"
        >
          All Products
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR, delay: 0.07, ease: EASE }}
          className="text-4xl md:text-6xl font-bold text-white mt-4 mb-5 leading-tight"
        >
          Everything You Need to{" "}
          <span className="gradient-text text-glow">Ship Faster</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR, delay: 0.14, ease: EASE }}
          className="text-slate-400 text-lg max-w-xl mx-auto mb-10"
        >
          Frameworks, templates, and playbooks built by a founder who&apos;s done it. Skip the guesswork.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR, delay: 0.22, ease: EASE }}
          className="inline-flex items-center gap-8 px-8 py-4 rounded-2xl border border-white/5 bg-white/[0.02]"
        >
          {[
            { value: "15+",  label: "Products" },
            { value: "100+", label: "Founders Helped" },
            { value: "4.9★", label: "Avg. Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold gradient-text">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Tab bar ──────────────────────────────────────────────────── */
function TabBar({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DUR, delay: 0.1, ease: EASE }}
      className="sticky top-16 z-40 bg-[#0B0F1A]/80 backdrop-blur-xl border-b border-white/5"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center gap-1 py-3">
          {TABS.map((tab) => {
            const isActive = tab === active;
            const isDisabled = tab === "Prompt to UI" || tab === "Bundles";
            return (
              <button
                key={tab}
                onClick={() => !isDisabled && onChange(tab)}
                disabled={isDisabled}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? "text-blue-400 border border-blue-500/60"
                    : isDisabled
                      ? "text-slate-500 bg-white/5 cursor-not-allowed"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="relative z-10">{tab}</span>
                {isDisabled && (
                  <span className="relative z-10 text-[10px] uppercase px-2 py-1 rounded-full bg-white/10 text-slate-300 border border-white/10">
                    Coming soon
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Road to MVP");

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TabBar active={activeTab} onChange={setActiveTab} />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <Suspense fallback={<div className="section-padding"><div className="max-w-[1200px] mx-auto px-6"><div className="text-center text-slate-400">Loading...</div></div></div>}>
              {activeTab === "Road to MVP"    && <RoadToMVPSection />}
              {activeTab === "Prompt to UI"  && <PromptToUISection />}
              {activeTab === "Bundles"        && <BundlesSection />}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
