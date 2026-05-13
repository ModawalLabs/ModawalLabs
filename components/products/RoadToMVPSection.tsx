"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Image from "next/image";

const EASE = [0.23, 1, 0.32, 1] as const;
const DUR  = 0.65;

/* ── Road to MVP data ─────────────────────────────────────────── */
const mvpSteps = [
  {
    step: "01", icon: "🔍",
    imgGradient: "linear-gradient(135deg, rgba(59,130,246,0.30) 0%, rgba(99,102,241,0.18) 100%)",
    image: "/road_to_mvp_product_assets/1.0.png",
    name: "The No-Code vs. Code Decision",
    tagline: "Stop Googling. Use this one framework to decide exactly what you need to build, and what you don't.",
    price: "$19",
    features: [
      "The 3 types of SaaS products and which technical approach fits each one. No more one-size-fits-all advice",
      "How to map your idea to a stack in under 10 minutes using the SaaS Type Classifier. No more analysis paralysis",
      "When no-code will actually hurt you: the 4 signals your idea genuinely needs a developer",
      "What a real MVP costs at each tier, with actual budget ranges, not estimates pulled from thin air",
      "The 'minimum lovable product' checklist: what to include, what to ruthlessly cut, and why shipping ugly beats perfecting forever",
    ],
  },
  {
    step: "02", icon: "📊",
    imgGradient: "linear-gradient(135deg, rgba(99,102,241,0.30) 0%, rgba(37,99,235,0.18) 100%)",
    image: "/road_to_mvp_product_assets/02.png",
    name: "20 Tools That Actually Work",
    tagline: "A curated, opinionated tool stack, ranked by category, annotated with real use cases, and priced honestly.",
    price: "$25",
    features: [
      "The 20 tools a senior developer would actually recommend, organized into 5 categories (build, payments, auth, analytics, support) with clear 'use this if…' guidance",
      "How to avoid the tool-switching trap: which free plans are actually generous, which ones lock you in, and which have hidden costs that kill margins",
      "Why most founders overpay for databases, and the one $0 option that handles 90% of early SaaS use cases",
      "The 'good enough' principle: what to use at each stage of growth (0–100, 100–1,000, 1,000+ users)"
      ],
  },
  {
    step: "03", icon: "🖼️",
    imgGradient: "linear-gradient(135deg, rgba(6,182,212,0.28) 0%, rgba(37,99,235,0.18) 100%)",
    image: "/road_to_mvp_product_assets/03.png",
    name: "Find & Vet Developers Without Being Technical",
    tagline: "The exact process for finding, interviewing, and onboarding a developer when you have no idea what questions to ask.",
    price: "$29",
    features: [
      "Where the best freelance developers actually are (hint: not Fiverr) ",
      "10 interview questions that reveal if a developer is actually good, without needing to understand code yourself",
      "The 7 red flags that mean walk away, no matter how cheap their quote is",
      "How to write a project brief that gets you accurate quotes, including the one-page template used to spec real client projects worth $50K+",
      ],
  },
  {
    step: "04", icon: "🛠️",
    imgGradient: "linear-gradient(135deg, rgba(139,92,246,0.28) 0%, rgba(37,99,235,0.18) 100%)",
    image: "/road_to_mvp_product_assets/04.png",
    name: "Prompts to Build Your SaaS Faster",
    tagline: "Not generic ChatGPT tips. These are engineered prompts for the exact decisions a non-tech founder faces building a SaaS.",
    price: "$22",
    features: ["How to use AI to write a technical spec document so thorough that any developer can quote it",
      "The 5 prompts that replace a $300/hr product consultant: idea validation, competitor analysis, feature prioritisation, pricing model testing, and user persona creation",
      "The 'Rubber Duck Method': prompts for debugging your own thinking when you're stuck, second-guessing the build, or about to make an expensive mistake",
      "Copy-ready prompts for writing your Terms of Service, Privacy Policy, onboarding emails, and landing page, grouped by category and ready to use today"
    ],
  },
  {
    step: "05", icon: "📋",
    imgGradient: "linear-gradient(135deg, rgba(37,99,235,0.30) 0%, rgba(139,92,246,0.20) 100%)",
    image: "/road_to_mvp_product_assets/05.png",
    name: "Pricing, Stripe & Your First Customer",
    tagline: "How to set up payments in a day, price your product correctly, and collect money before the product is even finished.",
    price: "$35",
    features: ["The 3 SaaS pricing models explained in plain English, with a decision framework for which one fits your product, your market, and your margin goals",
      "How to set up Stripe in under an hour: subscriptions, free trials, upgrade/downgrade, and tax compliance, with a step-by-step walkthrough",
      "Exactly what to say in a customer discovery call to validate your pricing, including a 10-question discovery script you can use this week",
      "Churn prevention from day one: the 3 onboarding emails every SaaS needs to send in the first 7 days to stop free trials from going dark"
    ],
  },
  {
    step: "06", icon: "🚀",
    imgGradient: "linear-gradient(135deg, rgba(20,184,166,0.28) 0%, rgba(59,130,246,0.18) 100%)",
    image: "/road_to_mvp_product_assets/06.png",
    name: "The 4 Docs Every SaaS Needs on Day One",
    tagline: "Not a lawyer. Not legal advice. But the 4 documents that will save you from the most common, and most expensive, early-stage SaaS mistakes.",
    price: "$29",
    features: ["The 4 non-negotiable docs: Terms of Service, Privacy Policy, Contractor Agreement, and a basic IP Assignment, and exactly what to put in each one",
      "How to use AI to generate a first draft of each document, and the 5 clauses you must manually review before publishing anything",
      "How to structure a contractor agreement so that everything your developer builds is legally yours from day one",
      "GDPR, CCPA, and US data law in plain English: what you need to know, what you can safely ignore at the $0–$10K MRR stage, and when to get an actual lawyer"
    ],
  },
  {
    step: "07", icon: "🔄",
    imgGradient: "linear-gradient(135deg, rgba(168,85,247,0.28) 0%, rgba(99,102,241,0.18) 100%)",
    image: "/road_to_mvp_product_assets/07.png",
    name: "30 Tasks in the Right Order",
    tagline: "The exact launch sequence, day by day, task by task, so nothing falls through the cracks and you actually ship.",
    price: "$19",
    features: ["The 7-day pre-launch checklist: what to do in the week before you go live, from final QA to email sequences to payment testing",
      "How to handle your first 10 customers: the manual onboarding approach that creates superfans, gets testimonials, and fixes critical bugs before they become reviews",
      "Post-launch metrics you actually need to watch in week one: the 3 numbers that tell you if you have a real product or a real problem",
      "What to do if nobody buys: the 3-day diagnosis framework that separates a messaging problem from a product problem so you fix the right thing first"
    ],
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

export default function RoadToMVPSection() {
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
            Road to <span className="gradient-text">MVP</span>
          </motion.h2>
          <motion.p animate={hdr(0.14)} className="text-slate-400 text-lg max-w-xl">
            Seven focused resources — one for each critical stage of building your MVP. Buy individually or grab the bundle.
          </motion.p>
        </div>

        {/* 7 step cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
          {mvpSteps.map((product, i) => (
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
                stepLabel={`Step ${product.step}`}
                imageSrc={product.image}
              />
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">{product.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{product.tagline}</p>
                <ul className="space-y-1.5 mb-6">
                  {product.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-xs text-slate-400"><Check />{f}</li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center justify-end pt-4 border-t border-white/5">
                  <button disabled className="bg-white/5 text-slate-500 cursor-not-allowed px-4 py-2 rounded-lg text-xs font-semibold"><span>Coming Soon</span></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bundle card */}
        {/* <motion.div
          animate={
            isInView
              ? { opacity: 1, y: 0, scale: 1,   transition: { duration: DUR, delay: 0.72, ease: EASE } }
              : { opacity: 0, y,    scale: 0.97, transition: { duration: DUR, delay: 0,    ease: EASE } }
          }
          className="relative rounded-3xl overflow-hidden border border-blue-500/30 bg-gradient-to-br from-blue-600/10 via-[#0B0F1A] to-indigo-600/10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-500/10 blur-[80px] pointer-events-none" />
          <div className="relative p-8 md:p-10 flex flex-col lg:flex-row gap-8 lg:items-center">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold text-white px-3 py-1 rounded-full bg-blue-500 shadow-lg shadow-blue-500/30">Best Value</span>
                <span className="text-xs font-semibold text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">{mvpBundle.saving}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{mvpBundle.name}</h3>
              <p className="text-slate-400 leading-relaxed mb-6 max-w-lg">{mvpBundle.tagline}</p>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold gradient-text">{mvpBundle.price}</span>
                <span className="text-slate-500 text-lg line-through">{mvpBundle.originalPrice}</span>
              </div>
              <button className="btn-primary px-8 py-3.5 rounded-xl text-base font-bold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all duration-200">
                <span>Get the Bundle</span>
              </button>
            </div>
            <div className="lg:w-[340px] flex-shrink-0">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">What&apos;s included</p>
              <ul className="space-y-2.5">
                {mvpBundle.includes.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center"><Check /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}