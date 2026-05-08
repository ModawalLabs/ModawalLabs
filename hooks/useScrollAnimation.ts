"use client";

import { useRef, useState, useEffect } from "react";

// ── Singleton scroll-direction tracker ────────────────────────────────────────
// One listener shared across every hook instance in the page.
let _dir: "up" | "down" = "down";
let _lastY = 0;
let _count = 0;

function _onScroll() {
  const y = window.scrollY;
  if (Math.abs(y - _lastY) > 3) {
    _dir = y > _lastY ? "down" : "up";
    _lastY = y;
  }
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useScrollAnimation(margin = "-8% 0px") {
  const ref       = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [y,        setY]        = useState(28); // offset for hidden state

  useEffect(() => {
    _lastY = window.scrollY;
    if (_count === 0) window.addEventListener("scroll", _onScroll, { passive: true });
    _count++;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Entering: use current scroll direction
          setY(_dir === "up" ? -28 : 28);
          setIsInView(true);
        } else {
          setIsInView(false);
          // Pre-set offset for next re-entry based on where element exited
          const above = entry.boundingClientRect.bottom < 0;
          setY(above ? -28 : 28);
        }
      },
      { rootMargin: margin }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      _count--;
      if (_count === 0) window.removeEventListener("scroll", _onScroll);
    };
  }, [margin]);

  return { ref, isInView, y };
}
