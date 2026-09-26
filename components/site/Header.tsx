"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore, type FocusEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import PageLink from "@/components/ui/PageLink";
import { EASE } from "@/components/motion/primitives";
import { navLinks } from "@/lib/site";
import Logo from "./Logo";

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/**
 * A slim glass capsule floating at the top of every page; it turns more solid once you
 * scroll, and switches to dark glass while a dark band (marked data-header-tone="dark")
 * passes beneath it. On phones the menu opens as a sheet beneath it.
 *
 * On the home page "View products" waits until the hero's own button has scrolled away,
 * so there is only ever one on screen, and it slides in rather than leaving a gap. It is
 * left out on the catalog itself.
 */
export default function Header() {
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 24,
    () => false,
  );
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();
  const onHome = pathname === "/";
  const onCatalog = pathname === "/products";
  const [heroCtaInView, setHeroCtaInView] = useState(true);
  const [overDark, setOverDark] = useState(false);

  useEffect(() => {
    const bands = document.querySelectorAll("[data-header-tone='dark']");
    const under = new Set<Element>();
    let observer: IntersectionObserver | undefined;
    // Watches a one-pixel strip through the middle of the capsule.
    const watch = () => {
      observer?.disconnect();
      under.clear();
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) under.add(entry.target);
            else under.delete(entry.target);
          }
          setOverDark(under.size > 0);
        },
        { rootMargin: `-34px 0px -${window.innerHeight - 35}px 0px` },
      );
      bands.forEach((band) => observer?.observe(band));
    };
    watch();
    window.addEventListener("resize", watch);
    return () => {
      window.removeEventListener("resize", watch);
      observer?.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    if (!onHome) return;
    const heroCta = document.getElementById("hero-cta");
    if (!heroCta) return;
    const observer = new IntersectionObserver(([entry]) => setHeroCtaInView(entry.isIntersecting), {
      rootMargin: "-64px 0px 0px 0px",
    });
    observer.observe(heroCta);
    return () => observer.disconnect();
  }, [onHome]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    // The sheet only exists on small screens; widening the window closes it.
    const desktop = window.matchMedia("(min-width: 768px)");
    const onResize = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
      document.body.style.overflow = "";
    };
  }, [open]);

  const showCta = !open && !onCatalog && !(onHome && heroCtaInView);
  const solid = scrolled || open;
  const dark = overDark && !open;

  const onNavBlur = (e: FocusEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHovered(null);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-4">
      <AnimatePresence>
        {open && (
          <motion.div
            key="scrim"
            aria-hidden="true"
            className="fixed inset-0 -z-10 bg-night/25 backdrop-blur-[2px] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <div
        className={`mx-auto flex h-12 w-full items-center justify-between rounded-full pr-1.5 pl-4 ring-1 backdrop-blur-xl backdrop-saturate-150 transition-[background-color,box-shadow] duration-500 ease-(--ease-soft) md:h-11 md:w-fit md:justify-start md:pl-5 ${
          dark
            ? "bg-night/70 shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_10px_30px_-14px_rgb(0_0_0/0.7)] ring-white/[0.12]"
            : solid
              ? "bg-white/75 shadow-[inset_0_1px_0_rgb(255_255_255/0.7),0_10px_30px_-14px_rgb(20_20_22/0.28)] ring-ink/[0.07]"
              : "bg-white/40 shadow-[inset_0_1px_0_rgb(255_255_255/0.5)] ring-ink/[0.05]"
        }`}
      >
        <Link href="/" aria-label="ModawalLabs home" className="rounded-full" onClick={() => setOpen(false)}>
          <Logo mark={false} size="sm" tone={dark ? "light" : "dark"} />
        </Link>

        <nav
          aria-label="Main"
          className="ml-7 hidden items-center md:flex"
          onMouseLeave={() => setHovered(null)}
          onBlur={onNavBlur}
        >
          {navLinks.map((link) => (
            <PageLink
              key={link.href}
              href={link.href}
              onMouseEnter={() => setHovered(link.href)}
              onFocus={() => setHovered(link.href)}
              className={`relative isolate rounded-full px-3 py-1.5 text-[13.5px] font-medium transition-colors duration-300 ${
                dark ? "text-white/70 hover:text-white" : "text-ink-2 hover:text-ink"
              }`}
            >
              {hovered === link.href && (
                <motion.span
                  layoutId="nav-hover"
                  aria-hidden="true"
                  className={`absolute inset-0 -z-10 rounded-full ${dark ? "bg-white/10" : "bg-ink/[0.055]"}`}
                  transition={{ type: "spring", stiffness: 520, damping: 40 }}
                />
              )}
              {link.label}
            </PageLink>
          ))}
        </nav>

        <div className="flex items-center">
          {/* Its column animates from zero width, so the capsule grows and shrinks with the button. */}
          <div
            className={`grid transition-[grid-template-columns,opacity,visibility] duration-500 ease-(--ease-soft) ${
              showCta ? "grid-cols-[1fr] opacity-100" : "invisible grid-cols-[0fr] opacity-0"
            }`}
          >
            <div className="-my-2 min-w-0 overflow-hidden py-2">
              <div className="pl-2 md:pl-3">
                <Link
                  href="/products"
                  className={`inline-flex h-8 items-center rounded-full px-3.5 text-[13px] font-medium whitespace-nowrap shadow-[inset_0_1px_0_rgb(255_255_255/0.14)] transition-[background-color,color,scale] duration-300 active:scale-[0.97] ${
                    dark ? "bg-white text-ink hover:bg-white/90" : "bg-ink text-white hover:bg-[#2c2c31]"
                  }`}
                >
                  View products
                </Link>
              </div>
            </div>
          </div>
          <button
            type="button"
            className={`ml-1 inline-flex size-9 items-center justify-center rounded-full transition-colors duration-300 md:hidden ${
              dark ? "text-white hover:bg-white/10" : "text-ink hover:bg-ink/5"
            }`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="sheet"
            id="mobile-nav"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mt-2 origin-top rounded-3xl bg-white/90 p-2 shadow-[0_24px_48px_-18px_rgb(20_20_22/0.35)] ring-1 ring-ink/[0.07] backdrop-blur-xl md:hidden"
          >
            <nav aria-label="Mobile">
              {navLinks.map((link) => (
                <PageLink
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[17px] font-medium text-ink transition-colors hover:bg-ink/[0.04]"
                >
                  {link.label}
                  <ArrowRight className="size-4 text-ink-3" aria-hidden="true" />
                </PageLink>
              ))}
            </nav>
            {!onCatalog && (
              <ButtonLink href="/products" size="lg" className="mt-2 w-full" onClick={() => setOpen(false)}>
                View products
              </ButtonLink>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
