import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  /** Section number, shown before the eyebrow as an editorial index. */
  index?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  index,
  title,
  intro,
  align = "left",
  tone = "light",
  className = "",
}: Props) {
  const dark = tone === "dark";
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && (
        <p
          className={`flex items-center gap-3 text-[13px] font-medium tracking-[0.16em] uppercase ${
            align === "center" ? "justify-center" : ""
          } ${dark ? "text-[#aebcff]" : "text-accent"}`}
        >
          {index && (
            <span
              className={`font-display text-base leading-none tracking-normal italic ${dark ? "text-white/45" : "text-ink-3"}`}
            >
              {index}
            </span>
          )}
          {index && (
            <span className={`size-1 rounded-full ${dark ? "bg-white/30" : "bg-line-2"}`} aria-hidden="true" />
          )}
          {eyebrow}
        </p>
      )}
      <h2 className="mt-4 font-display text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.08] font-semibold tracking-[-0.015em] text-balance">
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 text-lg leading-relaxed text-pretty ${dark ? "text-white/70" : "text-ink-2"}`}>{intro}</p>
      )}
    </div>
  );
}
