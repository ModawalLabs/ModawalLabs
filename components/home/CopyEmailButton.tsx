"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[15px] text-white/70 transition-colors hover:bg-white/10 hover:text-white"
    >
      {copied ? <Check className="size-4 text-[#9be7b4]" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
      <span>{email}</span>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied" : ""}
      </span>
    </button>
  );
}
