"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees on each axis. */
  max?: number;
  glare?: boolean;
};

/** Tilts its content toward the cursor in 3D, with a soft glare that tracks the pointer. */
export default function Tilt({ children, className = "", max = 7, glare = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const spring = { stiffness: 170, damping: 20, mass: 0.4 };

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOn = useMotionValue(0);

  const rotateX = useSpring(tiltX, spring);
  const rotateY = useSpring(tiltY, spring);
  const glareOpacity = useSpring(glareOn, { stiffness: 120, damping: 20 });
  const glareBackground = useMotionTemplate`radial-gradient(55% 55% at ${glareX}% ${glareY}%, rgb(255 255 255 / 0.32), transparent 72%)`;

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    tiltY.set((px - 0.5) * max * 2);
    tiltX.set((0.5 - py) * max * 2);
    glareX.set(px * 100);
    glareY.set(py * 100);
    glareOn.set(1);
  };

  const onMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    glareOn.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glareBackground, opacity: glareOpacity }}
        />
      )}
    </motion.div>
  );
}
