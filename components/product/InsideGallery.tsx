"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Tilt from "@/components/motion/Tilt";
import { EASE } from "@/components/motion/primitives";

export type InsideItem = {
  slug: string;
  part: string;
  title: string;
  accent: string;
  cover: string;
  stats: { value: string; label: string }[];
  preview: { src: string; width: number; height: number; alt: string; caption: string };
};

const AUTO_MS = 7000;
const chipSpots = ["-top-5 right-8 animate-float", "top-[44%] -right-6 animate-float-slow", "-bottom-5 left-10 animate-float"];

/**
 * A dark showcase: tabs with cover thumbnails on the left, the page preview in a device
 * frame on the right. It tours the playbooks on its own until you touch it.
 */
export default function InsideGallery({ items }: { items: InsideItem[] }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { margin: "-15% 0px" });
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = items[active];
  const playing = auto && !paused && !reduced && inView;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setActive((i) => (i + 1) % items.length), AUTO_MS);
    return () => window.clearInterval(timer);
  }, [playing, items.length]);

  /* Below lg the tabs scroll sideways: keep the active one centred without moving the page. */
  useEffect(() => {
    const el = strip.current;
    const tab = tabs.current[active];
    if (!el || !tab || el.scrollWidth <= el.clientWidth) return;
    const box = el.getBoundingClientRect();
    const r = tab.getBoundingClientRect();
    el.scrollTo({
      left: el.scrollLeft + r.left - box.left - (box.width - r.width) / 2,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [active, reduced]);

  const choose = (i: number) => {
    setActive(i);
    setAuto(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next: number | undefined;
    if (e.key in keys) next = (active + keys[e.key] + items.length) % items.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = items.length - 1;
    if (next === undefined) return;
    e.preventDefault();
    choose(next);
    tabs.current[next]?.focus();
  };

  return (
    <div ref={root} className="grid gap-8 lg:grid-cols-[21rem_1fr] lg:gap-14">
      <div
        ref={strip}
        role="tablist"
        aria-label="Playbook previews"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:px-0"
      >
        {items.map((item, i) => {
          const selected = i === active;
          return (
            <button
              key={item.slug}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`inside-tab-${item.slug}`}
              aria-selected={selected}
              aria-controls="inside-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => choose(i)}
              className={`relative flex min-w-[15rem] shrink-0 cursor-pointer items-center gap-3.5 rounded-2xl px-3 py-2.5 text-left transition-colors lg:min-w-0 ${
                selected ? "text-white" : "text-white/60 hover:bg-white/[0.04] hover:text-white/90"
              }`}
            >
              {selected && (
                <motion.span
                  layoutId="inside-tab-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  className="absolute inset-0 rounded-2xl bg-white/[0.07] ring-1 ring-white/10"
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10 w-9 shrink-0 overflow-hidden rounded-[4px] shadow-[0_6px_16px_-6px_rgb(0_0_0/0.8)] ring-1 ring-white/15">
                <Image src={item.cover} alt="" width={90} height={120} sizes="36px" className="block h-auto w-full" />
              </span>
              <span className="relative z-10 min-w-0 leading-tight">
                <span className="block text-[11px] font-medium tracking-[0.14em] text-white/40 uppercase">{item.part}</span>
                <span className="mt-0.5 block truncate text-[14.5px] font-medium">{item.title}</span>
              </span>
              {selected && playing && (
                <motion.span
                  key={active}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: AUTO_MS / 1000, ease: "linear" }}
                  className="absolute right-3 bottom-1 left-3 h-px origin-left rounded-full"
                  style={{ backgroundColor: item.accent }}
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      <div
        id="inside-panel"
        role="tabpanel"
        aria-labelledby={`inside-tab-${current.slug}`}
        className="min-w-0"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative">
          <motion.div
            aria-hidden="true"
            animate={{ backgroundColor: current.accent }}
            transition={{ duration: 0.9, ease: EASE }}
            className="pointer-events-none absolute -inset-6 rounded-[2.5rem] opacity-35 blur-3xl md:-inset-10"
          />
          <Tilt max={3} glare={false} className="rounded-2xl">
            <figure className="relative overflow-hidden rounded-2xl bg-[#101012] shadow-[0_50px_100px_-40px_rgb(0_0_0/0.9)] ring-1 ring-white/10">
              <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-4 py-2.5">
                <span className="size-2.5 rounded-full bg-white/15" aria-hidden="true" />
                <span className="size-2.5 rounded-full bg-white/15" aria-hidden="true" />
                <span className="size-2.5 rounded-full bg-white/15" aria-hidden="true" />
                <span className="mx-auto truncate rounded-md bg-white/[0.06] px-3 py-1 text-[11.5px] text-white/50">
                  Road to MVP · {current.part} · {current.title}
                </span>
                <span className="w-[42px]" aria-hidden="true" />
              </div>
              <div className="relative aspect-[8/5] w-full bg-[#0c0c0d] bg-[radial-gradient(70%_60%_at_50%_0%,rgb(255_255_255/0.06),transparent)]">
                {/* Every page stays mounted so they are all loaded before the tour reaches them. */}
                {items.map((item, i) => {
                  const selected = i === active;
                  return (
                    <motion.div
                      key={item.slug}
                      aria-hidden={!selected}
                      className="absolute inset-0"
                      style={{ zIndex: selected ? 2 : 1 }}
                      initial={false}
                      animate={selected ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 1.02, filter: "blur(6px)" }}
                      transition={selected ? { duration: 0.65, ease: EASE } : { duration: 0.35, delay: 0.3 }}
                    >
                      <Image
                        src={item.preview.src}
                        alt={item.preview.alt}
                        fill
                        sizes="(min-width: 1024px) 780px, 100vw"
                        className="object-cover object-top"
                      />
                    </motion.div>
                  );
                })}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-[#101012]/70 to-transparent"
                />
              </div>
            </figure>
          </Tilt>

          <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
            <AnimatePresence mode="popLayout">
              {current.stats.slice(0, 3).map((stat, i) => (
                <motion.div
                  key={`${current.slug}-${stat.label}`}
                  data-reveal
                  initial={{ opacity: 0, y: 14, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.94, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.1 }}
                  className={`absolute ${chipSpots[i]}`}
                >
                  {/* Dark glass so the chip reads over the light kit pages as well as the frame. */}
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#141416]/85 py-2 pr-4 pl-3.5 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.14),0_14px_32px_-12px_rgb(0_0_0/0.9)] ring-1 ring-white/[0.18] backdrop-blur-md">
                    <span className="size-1.5 shrink-0 rounded-full" style={{ backgroundColor: current.accent }} />
                    <span className="inline-flex items-baseline gap-1.5">
                      <b className="font-display text-lg leading-none font-semibold tabular-nums">{stat.value}</b>
                      <span className="text-[12px] text-white/70">{stat.label}</span>
                    </span>
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[15px] text-white/65">{current.preview.caption}</p>
          <Link
            href={`/products/${current.slug}`}
            className="group inline-flex shrink-0 items-center gap-1.5 text-[15px] font-medium text-[#aebcff] transition-colors hover:text-white"
          >
            View {current.title}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
