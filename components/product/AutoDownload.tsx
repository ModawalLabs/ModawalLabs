"use client";

import { useEffect, useState } from "react";
import { CircleCheck, Download, LoaderCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

type Props = {
  href: string;
  zipName: string;
  size?: string;
  /** False when the ZIP has not been built yet; the button is still offered. */
  available: boolean;
};

/** Starts the download a moment after the page opens, and always offers a manual button. */
export default function AutoDownload({ href, zipName, size, available }: Props) {
  const [state, setState] = useState<"waiting" | "started">("waiting");

  useEffect(() => {
    if (!available) return;
    const timer = window.setTimeout(() => {
      window.location.assign(href);
      setState("started");
    }, 900);
    return () => window.clearTimeout(timer);
  }, [available, href]);

  return (
    <div className="rounded-3xl bg-surface p-6 shadow-lift ring-1 ring-line sm:p-7">
      <div className="flex items-start gap-3">
        {state === "started" ? (
          <CircleCheck className="mt-0.5 size-5 shrink-0 text-success" aria-hidden="true" />
        ) : (
          <LoaderCircle className="mt-0.5 size-5 shrink-0 animate-spin text-accent" aria-hidden="true" />
        )}
        <div className="min-w-0">
          <p className="font-medium" aria-live="polite">
            {available
              ? state === "started"
                ? "Your download has started."
                : "Starting your download…"
              : "This file is being prepared."}
          </p>
          <p className="mt-1 truncate text-[14.5px] text-ink-2">
            {zipName}
            {size ? ` · ${size}` : ""}
          </p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
        <ButtonLink href={href} size="lg" download={zipName}>
          <Download className="size-4" aria-hidden="true" />
          {state === "started" ? "Download again" : "Download now"}
        </ButtonLink>
        <p className="text-[14px] text-ink-3">
          {available ? "Didn’t start? Use the button." : "Or email me and I will send it to you."}
        </p>
      </div>
    </div>
  );
}
