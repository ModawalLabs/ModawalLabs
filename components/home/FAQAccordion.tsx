"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { EASE } from "@/components/motion/primitives";

type FAQ = { readonly q: string; readonly a: string };

/** One-open-at-a-time accordion with a smooth height animation. */
export default function FAQAccordion({ items }: { items: readonly FAQ[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b border-line">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left text-[17px] font-medium tracking-tight transition-colors hover:text-accent md:text-lg"
            >
              {item.q}
              <span
                className={`inline-flex size-8 shrink-0 items-center justify-center rounded-full ring-1 transition-all duration-300 ${
                  isOpen ? "rotate-45 bg-ink text-white ring-ink" : "ring-line-2"
                }`}
                aria-hidden="true"
              >
                <Plus className="size-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 text-[16px] leading-relaxed text-ink-2">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
