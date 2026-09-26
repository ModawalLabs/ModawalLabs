type Props = {
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Three slow-drifting blurred colour fields. Sits behind a section's content; the
 * parent needs `relative overflow-hidden`.
 */
export default function Aurora({ tone = "light", className = "" }: Props) {
  const light = tone === "light";
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className={`aurora-1 absolute -top-[22%] left-[4%] size-[46rem] rounded-full blur-3xl ${
          light ? "bg-[#d6e0ff]/80" : "bg-[#3b55c8]/25"
        }`}
      />
      <div
        className={`aurora-2 absolute top-[6%] -right-[12%] size-[42rem] rounded-full blur-3xl ${
          light ? "bg-[#f4dccb]/75" : "bg-[#a87b3c]/20"
        }`}
      />
      <div
        className={`aurora-3 absolute -bottom-[28%] left-[34%] size-[38rem] rounded-full blur-3xl ${
          light ? "bg-[#e6dcfa]/75" : "bg-[#7c5cff]/18"
        }`}
      />
    </div>
  );
}
