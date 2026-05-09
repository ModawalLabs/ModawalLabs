"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Image from "next/image";

const EASE = [0.23, 1, 0.32, 1] as const;
const DUR  = 0.65;

const products = [
  {
    name: "Idea Validation Kit",
    tagline: "Test your assumptions with real users before writing a single line of code",
    price: "$19",
    tag: "Essential",
    icon: "🔍",
    color: "from-blue-500/20 to-indigo-500/10",
    image: "/road_to_mvp_product_assets/1.0.png",
    features: ["Assumption mapping", "User interview scripts", "Scoring framework", "Go / no-go checklist"],
  },
  {
    name: "Market Research Playbook",
    tagline: "Understand your market, ICP, and competitive landscape in 48 hours",
    price: "$25",
    tag: "Bestseller",
    icon: "📊",
    color: "from-indigo-500/20 to-purple-500/10",
    image: "/road_to_mvp_product_assets/02.png",
    features: ["ICP definition template", "Competitor analysis", "TAM/SAM/SOM guide", "Positioning canvas"],
  },
  {
    name: "MVP Wireframe Templates",
    tagline: "Design your core user flows in Figma — no design skills needed",
    price: "$29",
    tag: "Popular",
    icon: "🖼️",
    color: "from-blue-400/20 to-cyan-500/10",
    image: "/road_to_mvp_product_assets/03.png",
    features: ["10 screen templates", "User flow diagrams", "Clickable prototype guide", "Feedback form"],
  },
  {
    name: "Tech Stack Decision Guide",
    tagline: "Pick the right tools for speed, scale, and budget — without regret",
    price: "$22",
    tag: "Smart Choice",
    icon: "🛠️",
    color: "from-cyan-500/20 to-blue-500/10",
    image: "/road_to_mvp_product_assets/04.png",
    features: ["Stack comparison matrix", "Cost breakdown", "Scalability checklist", "Vendor evaluation"],
  },
  {
    name: "MVP Build Checklist",
    tagline: "The exact checklist used to ship production-ready MVPs fast",
    price: "$35",
    tag: "Most Valuable",
    icon: "📋",
    color: "from-blue-600/20 to-indigo-400/10",
    image: "/road_to_mvp_product_assets/05.png",
    features: ["Feature prioritization", "QA checklist", "Security baseline", "Performance targets"],
  },
];

export default function Products() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { ref, isInView, y } = useScrollAnimation();

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir === "right" ? 380 : -380, behavior: "smooth" });
  };

  const hdr = (delay = 0) =>
    isInView
      ? { opacity: 1, y: 0,   transition: { duration: DUR, delay, ease: EASE } }
      : { opacity: 0, y,      transition: { duration: DUR, delay: 0, ease: EASE } };

  return (
    <section id="products" className="section-padding" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <motion.span animate={hdr(0)} className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-400 mb-4 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5">
              Products
            </motion.span>
            <motion.h2 animate={hdr(0.07)} className="text-4xl md:text-5xl font-bold text-white mt-4 mb-3">
              Start Here —{" "}<span className="gradient-text">Launch It Yourself</span>
            </motion.h2>
            <motion.p animate={hdr(0.14)} className="text-slate-400 text-lg max-w-lg">
              Everything you need to build and launch without hiring a full team.
            </motion.p>
          </div>
          <motion.div animate={hdr(0.18)} className="flex gap-3">
            <button onClick={() => scroll("left")} className="w-11 h-11 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-200" aria-label="Scroll left">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={() => scroll("right")} className="w-11 h-11 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-200" aria-label="Scroll right">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </motion.div>
        </div>

        {/* Carousel */}
        <motion.div
          animate={hdr(0.22)}
          ref={scrollRef}
          className="carousel-container flex gap-5 overflow-x-auto pb-4"
          style={{ scrollPaddingLeft: "0px" }}
        >
          {products.map((product, i) => (
            <div key={i} className="carousel-item flex-none w-[340px] card-base rounded-2xl p-7 hover:border-blue-500/40 group">
              {/* Product Image */}
              <div className="relative h-32 mb-5 rounded-xl overflow-hidden b
              g-gradient-to-br from-blue-500/20 to-indigo-500/10">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover object-center"
                  sizes="320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">{product.name}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">{product.tagline}</p>
              <ul className="space-y-2 mb-6">
                {product.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-2 text-sm text-slate-400">
                    <svg width="14" height="14" fill="none" stroke="#60A5FA" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between pt-5 border-t border-white/5">
                <span className="text-2xl font-bold gradient-text">{product.price}</span>
                <button className="btn-primary px-5 py-2.5 rounded-lg text-sm font-semibold text-white"><span>Buy Now</span></button>
              </div>
            </div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div animate={hdr(0.35)} className="text-center mt-12">
          <a
            href="/products"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-base font-bold text-blue-400 border border-blue-500/60 hover:border-blue-400 hover:scale-[1.03] transition-all duration-200"
          >
            View All Products
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <p className="text-slate-500 text-xs mt-3">10 products available · Instant download</p>
        </motion.div>

      </div>
    </section>
  );
}
