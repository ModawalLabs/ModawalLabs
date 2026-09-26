"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { Calculator, Copy, ListChecks } from "lucide-react";
import { getProduct } from "@/lib/products";
import Cover from "./Cover";

const arc = [
  { slug: "choose-your-stack", pos: "left-[1%] top-[26%] w-[21%]", rotate: -16, x: "0px", delay: 0.66 },
  { slug: "build-without-burning-cash", pos: "left-[18%] top-[11%] w-[23%]", rotate: -8, x: "0px", delay: 0.52 },
  { slug: "hire-right-the-first-time", pos: "left-1/2 top-0 z-10 w-[26%]", rotate: 0, x: "-50%", delay: 0.38, front: true },
  { slug: "ai-as-your-co-founder", pos: "right-[18%] top-[11%] w-[23%]", rotate: 8, x: "0px", delay: 0.52 },
  { slug: "get-paid-before-you-launch", pos: "right-[1%] top-[26%] w-[21%]", rotate: 16, x: "0px", delay: 0.66 },
] as const;

const chips = [
  { Icon: ListChecks, label: "Interactive checklists", pos: "top-[3%] left-[3%]", float: "animate-float", delay: 1.05 },
  { Icon: Copy, label: "Copy-paste scripts", pos: "top-[8%] right-[2%]", float: "animate-float-slow", delay: 1.18 },
  { Icon: Calculator, label: "Calculators & templates", pos: "bottom-[6%] left-[20%]", float: "animate-float-slow", delay: 1.3 },
] as const;

const delay = (seconds: number) => ({ "--enter-delay": `${seconds}s` }) as CSSProperties;

/**
 * Five covers fanned in an arc on a lit floor, mirrored beneath. The covers and chips
 * rise in with CSS from the first paint; the stage then tilts toward the cursor.
 */
export default function HeroStage() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 110, damping: 18, mass: 0.6 });
  const rotateY = useSpring(tiltY, { stiffness: 110, damping: 18, mass: 0.6 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = (e.clientX - rect.left) / rect.width - 0.5;
    const dy = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(dx * 6);
    tiltX.set(dy * -4);
  };

  const onMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      {/* Floor light */}
      <div
        aria-hidden="true"
        style={delay(0.8)}
        className="enter-fade pointer-events-none absolute inset-x-[8%] top-[42%] h-[60%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(43_80_216/0.22),rgb(124_92_255/0.10)_45%,transparent_75%)] blur-2xl"
      />

      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 1400 }}
        className="relative aspect-[16/8.2] w-full"
      >
        {arc.map(({ slug, pos, rotate, x, delay: wait, ...rest }) => {
          const product = getProduct(slug);
          if (!product) return null;
          const front = "front" in rest && rest.front;
          return (
            <div
              key={slug}
              className={`cover-pose enter-cover absolute ${pos}`}
              style={{ "--x": x, "--r": `${rotate}deg`, "--enter-delay": `${wait}s` } as CSSProperties}
            >
              <div className="reflect">
                <Cover
                  src={product.cover}
                  alt={`${product.title} cover`}
                  sizes="(min-width: 1024px) 260px, 26vw"
                  eager={!!front}
                  className={front ? "shadow-[0_2px_4px_rgb(20_20_22/0.14),0_36px_70px_-18px_rgb(20_20_22/0.6)]" : ""}
                />
              </div>
            </div>
          );
        })}

        {chips.map(({ Icon, label, pos, float, delay: wait }) => (
          <div key={label} style={delay(wait)} className={`enter-chip absolute z-20 hidden md:block ${pos}`}>
            <span
              className={`${float} inline-flex items-center gap-2 rounded-full bg-white/75 py-2 pr-4 pl-2.5 text-[13.5px] font-medium text-ink shadow-glass ring-1 ring-white/90 backdrop-blur-md`}
            >
              <span className="flex size-6 items-center justify-center rounded-full bg-accent-soft text-accent">
                <Icon className="size-3.5" aria-hidden="true" />
              </span>
              {label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
