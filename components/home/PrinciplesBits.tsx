"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Check } from "lucide-react";
import { EASE } from "@/components/motion/primitives";

const VIEW = { once: true, margin: "-20% 0px" } as const;

/* A checklist that ticks itself off as it scrolls into view. */
const rows = ["Pick your stack", "Set a real budget", "Write the developer brief"];

export function Checklist() {
  return (
    <motion.ul
      aria-hidden="true"
      className="mt-8 space-y-2.5"
      initial="off"
      whileInView="on"
      viewport={VIEW}
      variants={{ off: {}, on: { transition: { staggerChildren: 0.4, delayChildren: 0.3 } } }}
    >
      {rows.map((row) => (
        <motion.li
          key={row}
          variants={{ off: { color: "#6c6c75" }, on: { color: "#141416" } }}
          className="flex items-center gap-3 rounded-xl bg-paper px-3.5 py-2.5 text-[14px] font-medium ring-1 ring-line"
        >
          <motion.span
            variants={{
              off: { scale: 0.7, backgroundColor: "#e6e3dc" },
              on: { scale: 1, backgroundColor: "#1b7f4b", transition: { type: "spring", stiffness: 320, damping: 16 } },
            }}
            className="flex size-5 items-center justify-center rounded-full text-white"
          >
            <motion.span variants={{ off: { opacity: 0, scale: 0.4 }, on: { opacity: 1, scale: 1 } }} className="flex">
              <Check className="size-3" />
            </motion.span>
          </motion.span>
          {row}
        </motion.li>
      ))}
    </motion.ul>
  );
}

/* Jargon on top, the plain-English version below, cycling through examples. */
const pairs = [
  ["Deploy a serverless edge function", "Run a small piece of code without managing a server"],
  ["Implement OAuth 2.0 with PKCE", "Let people sign in with Google or Apple"],
  ["Set up a CI/CD pipeline", "Test every change automatically before it goes live"],
] as const;

export function PlainEnglish() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % pairs.length), 4200);
    return () => window.clearInterval(timer);
  }, [reduced]);

  const [jargon, plain] = pairs[index];
  const slide = {
    initial: { y: 16, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -16, opacity: 0 },
    transition: { duration: 0.5, ease: EASE },
  };

  return (
    <div aria-hidden="true" className="mt-8 space-y-2.5">
      <div className="relative h-16 overflow-hidden rounded-xl bg-paper ring-1 ring-line">
        <AnimatePresence initial={false}>
          <motion.div key={jargon} {...slide} className="absolute inset-0 flex items-center px-3.5 text-[13.5px] leading-snug text-ink-3">
            <span className="line-through decoration-ink-3/50">{jargon}</span>
          </motion.div>
        </AnimatePresence>
      </div>
      <ArrowDown className="mx-auto size-4 text-ink-3" />
      <div className="relative h-16 overflow-hidden rounded-xl bg-accent-soft ring-1 ring-accent/20">
        <AnimatePresence initial={false}>
          <motion.div
            key={plain}
            {...slide}
            className="absolute inset-0 flex items-center px-3.5 text-[13.5px] leading-snug font-medium text-accent-ink"
          >
            {plain}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* The no-code to custom-code spectrum, with the marker settling on "hybrid" as it appears. */
const options = [
  ["No-code", "Ship in days on a $29/mo tool"],
  ["Hybrid", "A developer for the hard 20%"],
  ["Custom code", "When the product is the code"],
] as const;

export function TradeOffs() {
  return (
    <div aria-hidden="true" className="mt-8">
      <div className="flex justify-between text-[11px] font-medium tracking-[0.14em] text-ink-3 uppercase">
        <span>No-code</span>
        <span>Hybrid</span>
        <span>Custom code</span>
      </div>
      <div className="relative mt-3 h-2 rounded-full bg-[linear-gradient(90deg,rgb(27_127_75/0.25),rgb(43_80_216/0.25),rgb(124_92_255/0.25))]">
        <motion.span
          initial={{ left: "3%" }}
          whileInView={{ left: "46%" }}
          viewport={VIEW}
          transition={{ type: "spring", stiffness: 55, damping: 13, delay: 0.5 }}
          className="absolute top-1/2 size-5 -translate-y-1/2 rounded-full bg-ink shadow-card ring-4 ring-surface"
        />
      </div>
      <motion.div
        className="mt-5 grid gap-3 sm:grid-cols-3"
        initial="off"
        whileInView="on"
        viewport={VIEW}
        variants={{ off: {}, on: { transition: { staggerChildren: 0.12, delayChildren: 0.6 } } }}
      >
        {options.map(([label, text]) => (
          <motion.div
            key={label}
            data-reveal
            variants={{ off: { opacity: 0, y: 10 }, on: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
            className="rounded-xl bg-paper px-3.5 py-3 ring-1 ring-line"
          >
            <p className="text-[12.5px] font-semibold">{label}</p>
            <p className="mt-1 text-[13px] leading-snug text-ink-2">{text}</p>
          </motion.div>
        ))}
      </motion.div>
      <p className="mt-4 text-[14.5px] text-ink-2">
        Sometimes the right answer is{" "}
        <span className="rounded-md bg-paper-2 px-1.5 py-0.5 font-medium text-ink">not yet</span>.
      </p>
    </div>
  );
}
