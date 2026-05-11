"use client";

import { motion } from "framer-motion";
import { ShaderAnimation } from "@/components/ui/shader-lines";

const EASE = [0.23, 1, 0.32, 1] as const;
const DUR  = 0.65;

export default function Playground() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Shader Background */}
      <ShaderAnimation />

      {/* Blur Background for Content */}
      {/* <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-full max-w-2xl h-auto px-6 backdrop-blur-md bg-black/5 rounded-3xl pointer-events-none" 
             style={{ 
               minHeight: "400px",
               background: "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0) 70%)",
               backdropFilter: "blur(6px)"
             }} 
        />
      </div> */}

      {/* Content Overlay */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
        <div className="flex flex-col items-center text-center">

          {/* Left — text */}
          <div className="max-w-2xl">
            <h1
              className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6 animate-fade-in-up delay-100 font-playfair"
              style={{ opacity: 0, animationFillMode: "forwards" }}
            >
              Stop Overthinking.
              <span className="block gradient-text text-glow">
                Start Building Your SaaS.
              </span>
            </h1>

            <p
              className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed mb-10 animate-fade-in-up delay-200 mx-auto"
              style={{ opacity: 0, animationFillMode: "forwards" }}
            >
              Go from idea to live product
              — without needing technical skills or a big team.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 items-center justify-center animate-fade-in-up delay-300"
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

        </div>
      </div>
    </section>
  );
}
