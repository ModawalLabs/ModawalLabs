"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  MotionConfig,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/** The house easing: a long, confident settle. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const VIEWPORT = { once: true, margin: "-10% 0px -8% 0px" } as const;

/** Honours the visitor's reduce-motion preference for every animation below. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  blur?: boolean;
};

/** Fades a block up (with a touch of focus-pull) the first time it scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 26, blur = true }: RevealProps) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y, filter: blur ? "blur(6px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
};

/** Orchestrates its `Item` descendants into a staggered entrance. */
export function Stagger({ children, className, stagger = 0.08, delay = 0 }: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={VIEWPORT}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

type ItemProps = {
  children: ReactNode;
  className?: string;
  y?: number;
};

/** One element of a `Stagger` sequence. Works at any depth inside the container. */
export function Item({ children, className, y = 24 }: ItemProps) {
  return (
    <motion.div
      data-reveal
      className={className}
      variants={{
        hidden: { opacity: 0, y, filter: "blur(5px)" },
        shown: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Total drift in px across the element's scroll journey. */
  amount?: number;
};

/** Gives a block a slow, spring-smoothed counter-drift while it crosses the viewport. */
export function Parallax({ children, className, amount = 24 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  const y = useSpring(drift, { stiffness: 90, damping: 24, mass: 0.6 });

  return (
    <motion.div ref={ref} className={className} style={{ y: reduced ? 0 : y }}>
      {children}
    </motion.div>
  );
}
