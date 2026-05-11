"use client";

import { useEffect, useRef, useState } from "react";

type TrailPoint = { x: number; y: number; life: number };

const DECAY      = 0.038; // ~26 frames (~0.43s) to fully fade
const MIN_DIST   = 4;     // px between trail points

export default function CustomCursor() {
  const [isHoverDevice, setIsHoverDevice] = useState(false);
  const dotRef    = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef  = useRef<TrailPoint[]>([]);
  const lastPtRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef    = useRef<number | null>(null);

  useEffect(() => {
    // Check if device supports hover (desktop)
    const mediaQuery = window.matchMedia('(hover: hover)');
    setIsHoverDevice(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsHoverDevice(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!isHoverDevice) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      // Move the dot immediately
      if (dotRef.current) {
        dotRef.current.style.left = `${x}px`;
        dotRef.current.style.top  = `${y}px`;
      }

      // Only push a trail point if we've moved far enough
      const last = lastPtRef.current;
      if (!last || Math.hypot(x - last.x, y - last.y) >= MIN_DIST) {
        trailRef.current.push({ x, y, life: 1 });
        lastPtRef.current = { x, y };
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      trailRef.current = trailRef.current.filter((p) => {
        p.life -= DECAY;
        return p.life > 0;
      });

      trailRef.current.forEach((p) => {
        const radius  = 3.5 * p.life;
        const opacity = p.life * 0.45;

        // Blue primary layer
        ctx.shadowBlur  = 10 * p.life;
        ctx.shadowColor = `rgba(96, 165, 250, ${p.life * 0.5})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${opacity})`;
        ctx.fill();
        
        // Violet secondary layer - more prominent
        ctx.shadowBlur  = 12 * p.life;
        ctx.shadowColor = `rgba(159, 122, 234, ${p.life * 0.6})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 0.9, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(185, 158, 220, ${opacity * 0.8})`;
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      rafRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isHoverDevice]);

  if (!isHoverDevice) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9998 }}
      />
      <div
        ref={dotRef}
        className="fixed pointer-events-none"
        style={{
          zIndex: 9999,
          width: "11px",
          height: "11px",
          borderRadius: "50%",
          background: "#93C5FD",
          boxShadow:
            "0 0 6px 2px rgba(147,197,253,0.9), 0 0 14px 4px rgba(96,165,250,0.55), 0 0 28px 6px rgba(59,130,246,0.25), 0 0 8px 2px rgba(185,158,220,0.4), 0 0 16px 4px rgba(159,122,234,0.2)",
          transform: "translate(-50%, -50%)",
          left: "-100px",
          top: "-100px",
          willChange: "left, top",
        }}
      />
    </>
  );
}
