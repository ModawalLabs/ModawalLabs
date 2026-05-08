"use client";

import { useEffect, useRef } from "react";

// Reference density: 100 particles on a 1920×1080 screen
const BASE_AREA  = 1920 * 1080;
const BASE_COUNT = 100;

type Particle = {
  x: number; y: number;
  vx: number; vy: number;
  size: number; opacity: number;
  layer: "foreground" | "midground" | "background";
  hue: "blue" | "violet";
};

function makeParticle(w: number, h: number): Particle {
  const layer = Math.random() < 0.33 ? "background" : Math.random() < 0.66 ? "midground" : "foreground";
  const hue = Math.random() < 0.6 ? "blue" : "violet"; // 60% blue, 40% violet
  
  const sizeRange = {
    foreground: { min: 1.2, max: 2.8 },
    midground: { min: 0.8, max: 1.8 },
    background: { min: 0.4, max: 1.0 },
  };
  const range = sizeRange[layer];
  
  const opacityRange = {
    foreground: { min: 0.35, max: 0.55 },
    midground: { min: 0.20, max: 0.40 },
    background: { min: 0.08, max: 0.18 },
  };
  const opRange = opacityRange[layer];

  return {
    x:       Math.random() * w,
    y:       Math.random() * h,
    vx:      (Math.random() - 0.5) * (layer === "foreground" ? 0.35 : layer === "midground" ? 0.20 : 0.10),
    vy:      (Math.random() - 0.5) * (layer === "foreground" ? 0.35 : layer === "midground" ? 0.20 : 0.10),
    size:    Math.random() * (range.max - range.min) + range.min,
    opacity: Math.random() * (opRange.max - opRange.min) + opRange.min,
    layer,
    hue,
  };
}

function targetCount(w: number, h: number): number {
  const raw = Math.round(BASE_COUNT * (w * h) / BASE_AREA);
  return Math.max(50, Math.min(180, raw));
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    // Use offsetWidth/Height — the actual CSS-rendered size of the canvas element
    const getSize = () => ({
      w: canvas.offsetWidth  || window.innerWidth,
      h: canvas.offsetHeight || window.innerHeight,
    });

    const init = () => {
      const { w, h } = getSize();
      canvas.width  = w;
      canvas.height = h;
      const n = targetCount(w, h);
      particles = Array.from({ length: n }, () => makeParticle(w, h));
    };

    const resize = () => {
      const prevW = canvas.width;
      const prevH = canvas.height;
      const { w, h } = getSize();
      if (w === prevW && h === prevH) return;

      // Rescale existing positions proportionally so they stay spread across the new size
      const sx = w / prevW;
      const sy = h / prevH;
      particles.forEach((p) => { p.x *= sx; p.y *= sy; });

      canvas.width  = w;
      canvas.height = h;

      // Add or remove particles to match the new target density
      const n = targetCount(w, h);
      while (particles.length < n) particles.push(makeParticle(w, h));
      if (particles.length > n) particles.splice(n);
    };

    init();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Color based on hue - muted violet (30%) or blue (70%)
        const isViolet = p.hue === "violet";
        const shadowColor = isViolet 
          ? "rgba(159, 122, 234, 0.65)" // muted violet
          : "rgba(96, 165, 250, 0.7)";  // blue
        const fillColor = isViolet
          ? `rgba(185, 158, 220, ${p.opacity * 0.85})` // muted violet fill
          : `rgba(147, 197, 253, ${p.opacity})`;       // blue fill

        ctx.shadowBlur  = p.layer === "foreground" ? 14 : p.layer === "midground" ? 10 : 6;
        ctx.shadowColor = shadowColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Connection lines between nearby particles - depth aware
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(
            particles[i].x - particles[j].x,
            particles[i].y - particles[j].y,
          );
          
          // Only connect particles of similar layers for better visual hierarchy
          const layerDiff = particles[i].layer === particles[j].layer ? 0 : 1;
          const maxDist = 110 - (layerDiff * 20);
          
          if (dist < maxDist) {
            const isViolet = particles[i].hue === "violet" || particles[j].hue === "violet";
            const lineColor = isViolet
              ? `rgba(159, 122, 234, ${0.10 * (1 - dist / maxDist)})`
              : `rgba(59, 130, 246, ${0.07 * (1 - dist / maxDist)})`;
            
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.85 }}
    />
  );
}
