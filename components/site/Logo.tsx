export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="9" fill="currentColor" />
      <path
        d="M9.5 21.5v-11l6.5 7 6.5-7v11"
        fill="none"
        stroke="white"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type LogoProps = { tone?: "dark" | "light"; mark?: boolean; size?: "sm" | "md" };

export default function Logo({ tone = "dark", mark = true, size = "md" }: LogoProps) {
  const light = tone === "light";
  return (
    <span className="inline-flex items-center gap-2.5">
      {mark && <LogoMark className={`size-8 ${light ? "text-white/10" : "text-ink"}`} />}
      <span
        className={`${size === "sm" ? "text-[15.5px]" : "text-[17px]"} font-semibold tracking-tight transition-colors duration-500 ${light ? "text-white" : "text-ink"}`}
      >
        Modawal<span className={`transition-colors duration-500 ${light ? "text-[#aebcff]" : "text-accent"}`}>Labs</span>
      </span>
    </span>
  );
}
