"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Image from "next/image";

const EASE = [0.23, 1, 0.32, 1] as const;
const DUR  = 0.65;

/* ── Prompt to UI data ───────────────────────────────────────── */
const uiFrameworks = [
  {
    icon: "🧩", name: "SaaS Component Library",
    imgGradient: "linear-gradient(135deg, rgba(59,130,246,0.30) 0%, rgba(99,102,241,0.18) 100%)",
    tagline: "200+ production-ready components built for modern SaaS dashboards",
    price: "$49", tag: "Bestseller",
    features: ["Tables, forms & modals", "Dark mode included", "Tailwind + shadcn", "Figma source"],
  },
  {
    icon: "📱", name: "Mobile-First UI Kit",
    imgGradient: "linear-gradient(135deg, rgba(6,182,212,0.30) 0%, rgba(59,130,246,0.18) 100%)",
    tagline: "Responsive layouts and patterns optimised for mobile-first SaaS products",
    price: "$39", tag: "New",
    features: ["iOS & Android patterns", "Touch-friendly components", "Expo-ready", "Storybook included"],
  },
  {
    icon: "🎨", name: "Landing Page Design System",
    imgGradient: "linear-gradient(135deg, rgba(168,85,247,0.28) 0%, rgba(236,72,153,0.15) 100%)",
    tagline: "Everything you need to build high-converting SaaS landing pages",
    price: "$45", tag: "Popular",
    features: ["Hero variants", "Pricing blocks", "Testimonial layouts", "CTA sections"],
  },
  {
    icon: "🖥️", name: "Admin Dashboard Template",
    imgGradient: "linear-gradient(135deg, rgba(99,102,241,0.30) 0%, rgba(37,99,235,0.18) 100%)",
    tagline: "A full admin panel UI built for speed — Next.js + Tailwind",
    price: "$59", tag: "Premium",
    features: ["Sidebar + top nav", "Charts & analytics", "User management UI", "Settings pages"],
  },
  {
    icon: "🔐", name: "Auth Flow UI Pack",
    imgGradient: "linear-gradient(135deg, rgba(59,130,246,0.28) 0%, rgba(20,184,166,0.18) 100%)",
    tagline: "Beautiful login, signup, and onboarding screens ready to drop in",
    price: "$29", tag: "Quick Win",
    features: ["Sign in / sign up", "Email verification", "Onboarding wizard", "Password reset"],
  },
  {
    icon: "💳", name: "Pricing & Checkout UI",
    imgGradient: "linear-gradient(135deg, rgba(100,116,139,0.22) 0%, rgba(59,130,246,0.12) 100%)",
    tagline: "Conversion-tested pricing page and checkout flow components",
    price: "$35", tag: "Coming Soon",
    features: ["Pricing table variants", "Feature comparison", "Checkout modal", "Upgrade prompts"],
  },
];

/* ── Product image placeholder ───────────────────────────────── */
function ProductImagePlaceholder({
  gradient, icon, stepLabel, tag, imageSrc,
}: {
  gradient: string;
  icon: string;
  stepLabel?: string;
  tag?: { text: string; muted?: boolean };
  imageSrc?: string;
}) {
  return (
    <div style={{ background: gradient }} className="relative h-40 flex-shrink-0 overflow-hidden">
      {imageSrc ? (
        <Image src={imageSrc} alt="" fill className="object-cover object-top" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
      ) : (
        <>
          {/* Dot grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.13) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          {/* Ambient blobs */}
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/[0.06] blur-2xl" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/[0.04] blur-xl" />
          {/* Centred icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 blur-2xl scale-[2.5]" />
              <span className="relative text-5xl">{icon}</span>
            </div>
          </div>
        </>
      )}
      {/* Overlay for legibility of badges */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A]/40 via-transparent to-transparent pointer-events-none" />
      {/* Step label — top left */}
      {stepLabel && (
        <span className="absolute top-3.5 right-4 text-[10px] font-bold tracking-widest text-white/60 uppercase drop-shadow">
          {stepLabel}
        </span>
      )}
      {/* Tag badge — top right */}
      {tag && (
        <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full border backdrop-blur-sm ${
          tag.muted
            ? "bg-[#0B0F1A]/70 text-slate-400 border-white/10"
            : "bg-[#0B0F1A]/70 text-blue-300 border-blue-500/25"
        }`}>
          {tag.text}
        </span>
      )}
    </div>
  );
}

/* ── Shared check icon ────────────────────────────────────────── */
const Check = ({ color = "#60A5FA" }: { color?: string }) => (
  <svg width="14" height="14" fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export default function PromptToUISection() {
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
            Prompt <span className="gradient-text">to User Interface</span>
          </motion.h2>
          <motion.p animate={hdr(0.14)} className="text-slate-400 text-lg max-w-xl">
            Production-ready design systems and component libraries built for modern SaaS products.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {uiFrameworks.map((product, i) => (
            <motion.div
              key={i}
              animate={
                isInView
                  ? { opacity: 1, y: 0, scale: 1,   transition: { duration: DUR, delay: 0.2 + i * 0.07, ease: EASE } }
                  : { opacity: 0, y,    scale: 0.96, transition: { duration: DUR, delay: 0,               ease: EASE } }
              }
              className="card-base rounded-2xl overflow-hidden hover:border-blue-500/40 group flex flex-col"
            >
              <ProductImagePlaceholder
                gradient={product.imgGradient}
                icon={product.icon}
                tag={{ text: product.tag, muted: product.tag === "Coming Soon" }}
              />
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">{product.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{product.tagline}</p>
                <ul className="space-y-1.5 mb-5">
                  {product.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-xs text-slate-400"><Check />{f}</li>
                  ))}
                </ul>
                <div className="flex items-center justify-end pt-4 border-t border-white/5">
                  <button disabled className="bg-white/5 text-slate-500 cursor-not-allowed px-4 py-2 rounded-lg text-xs font-semibold">
                    <span>Coming Soon</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}