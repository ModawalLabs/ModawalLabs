"use client";

import Image from "next/image";
import { useRef, useEffect, useCallback } from "react";

const AUTO_TILT   = 10;
const MANUAL_TILT = 7;
const GLARE_R     = 38;
const ORBIT_MS    = 7500;

interface TiltCardProps {
  src: string;
  alt: string;
  /** Tailwind sizing classes applied to the card element */
  cardClassName?: string;
  /** Tailwind classes applied to the outer relative wrapper */
  wrapperClassName?: string;
  /** Anything rendered inside the outer relative wrapper (e.g. floating badges) */
  children?: React.ReactNode;
}

export default function TiltCard({ src, alt, cardClassName = "", wrapperClassName = "", children }: TiltCardProps) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const angleRef       = useRef(0);
  const lastTsRef      = useRef<number | null>(null);
  const isHoveredRef   = useRef(false);
  const isReturningRef = useRef(false);
  const returnTimer    = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const rafRef         = useRef<number | undefined>(undefined);

  const applyCard = useCallback((rx: number, ry: number) => {
    const el = cardRef.current;
    if (!el) return;
    const s = isHoveredRef.current ? 1.02 : 1;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(${s},${s},1)`;
  }, []);

  const applyGlare = useCallback((rx: number, ry: number, isManual = false, manualX = 50, manualY = 50) => {
    const el = glareRef.current;
    if (!el) return;
    const gx = isManual ? manualX : 50 + (ry / AUTO_TILT) * GLARE_R;
    const gy = isManual ? manualY : 50 + (-rx / AUTO_TILT) * GLARE_R;
    el.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)`;
    el.style.opacity = isManual ? "1" : "0.85";
  }, []);

  useEffect(() => {
    const SPEED = (2 * Math.PI) / ORBIT_MS;

    const tick = (ts: number) => {
      if (!isHoveredRef.current && !isReturningRef.current) {
        if (lastTsRef.current !== null) {
          angleRef.current += (ts - lastTsRef.current) * SPEED;
        }
        lastTsRef.current = ts;
        const rx = Math.sin(angleRef.current) * AUTO_TILT;
        const ry = Math.cos(angleRef.current) * AUTO_TILT;
        applyCard(rx, ry);
        applyGlare(rx, ry);
      } else {
        lastTsRef.current = null;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (returnTimer.current) clearTimeout(returnTimer.current);
    };
  }, [applyCard, applyGlare]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
    const dy = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
    const rx = -dy * MANUAL_TILT;
    const ry =  dx * MANUAL_TILT;
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1)`;
    const gx = ((e.clientX - rect.left) / rect.width)  * 100;
    const gy = ((e.clientY - rect.top)  / rect.height) * 100;
    applyGlare(rx, ry, true, gx, gy);
  }, [applyGlare]);

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current   = true;
    isReturningRef.current = false;
    if (returnTimer.current) clearTimeout(returnTimer.current);
    const card  = cardRef.current;
    const glare = glareRef.current;
    if (card)  card.style.transition  = "transform 0.1s linear";
    if (glare) glare.style.transition = "opacity 0.1s ease";
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current   = false;
    isReturningRef.current = true;
    const card  = cardRef.current;
    const glare = glareRef.current;
    if (card)  card.style.transition  = "transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)";
    if (glare) glare.style.transition = "opacity 0.5s ease";

    const rx = Math.sin(angleRef.current) * AUTO_TILT;
    const ry = Math.cos(angleRef.current) * AUTO_TILT;
    applyCard(rx, ry);
    applyGlare(rx, ry);

    returnTimer.current = setTimeout(() => {
      isReturningRef.current = false;
      if (card)  card.style.transition  = "none";
      if (glare) glare.style.transition = "none";
    }, 750);
  }, [applyCard, applyGlare]);

  return (
    <div className={`relative w-fit ${wrapperClassName}`}>
      {/* Ambient glow ring */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-500/40 via-blue-400/20 to-indigo-500/40 blur-md pointer-events-none" />

      {/* Tilt card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        className={`relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0F1629] to-[#0B0F1A] cursor-pointer ${cardClassName}`}
      >
        <Image src={src} alt={alt} fill className="object-cover object-top" />

        <div className="absolute top-3 left-3  w-2 h-2 rounded-full bg-blue-500/40" />
        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-blue-500/40" />
        <div className="absolute bottom-3 left-3  w-2 h-2 rounded-full bg-blue-500/40" />
        <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-blue-500/40" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A]/60 via-transparent to-transparent pointer-events-none" />

        <div ref={glareRef} className="absolute inset-0 rounded-2xl pointer-events-none" style={{ opacity: 0.6 }} />
      </div>

      {/* Slot for badges / overlays that must stay flat */}
      {children}
    </div>
  );
}
