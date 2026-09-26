"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { EASE } from "./primitives";

/**
 * Shows the stat as written on first paint, so it is right before (and without)
 * JavaScript. Numbers that start below the fold reset to zero out of sight and count up
 * when they scroll into view, so nothing on screen ever jumps backwards. Keeps any prefix
 * or suffix around the number, so "~10", "$0" and "30" all work.
 */
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const armed = useRef(false);

  const parts = value.match(/^([^0-9]*)(\d+)(.*)$/);
  const prefix = parts?.[1] ?? "";
  const suffix = parts?.[3] ?? "";
  const target = parts ? Number(parts[2]) : Number.NaN;
  const countable = Number.isFinite(target);

  useEffect(() => {
    const el = ref.current;
    if (!el || !countable || reduced) return;
    if (el.getBoundingClientRect().top > window.innerHeight) {
      armed.current = true;
      el.textContent = `${prefix}0${suffix}`;
    }
  }, [countable, reduced, prefix, suffix]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || !armed.current) return;
    const controls = animate(0, target, {
      duration: 1.1,
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = `${prefix}${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, target, prefix, suffix]);

  // Keyed by value: the count writes to the DOM directly, so a new value gets a fresh node.
  return (
    <span key={value} ref={ref} className={className}>
      {value}
    </span>
  );
}
