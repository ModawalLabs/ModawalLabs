"use client";

import { useEffect, useRef } from "react";

// Reference density: 100 particles on a 1920×1080 screen
const BASE_AREA  = 1920 * 1080;
const BASE_COUNT = 100;

type Particle = {
  x: number; y: number;
  vx: number; vy: number;
  size: number; opacity: number;
};

function makeParticle(w: number, h: number): Particle {
  return {
    x:       Math.random() * w,
    y:       Math.random() * h,
    vx:      (Math.random() - 0.5) * 0.25,
    vy:      (Math.random() - 0.5) * 0.25,
    size:    Math.random() * 2 + 0.8,
    opacity: Math.random() * 0.45 + 0.25,
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

        ctx.shadowBlur  = 12;
        ctx.shadowColor = "rgba(96, 165, 250, 0.8)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${p.opacity})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(
            particles[i].x - particles[j].x,
            particles[i].y - particles[j].y,
          );
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.07 * (1 - dist / 110)})`;
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
      style={{ zIndex: 0, opacity: 0.9 }}
    />
  );
}
