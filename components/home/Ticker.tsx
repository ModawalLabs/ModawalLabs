import { partLabel, products } from "@/lib/products";

/**
 * A slow strip of the seven playbooks under the hero. Decorative: the real list is right
 * below it. Content is duplicated so the loop is seamless; edges fade out.
 */
export default function Ticker() {
  const items = products.map((p) => ({ part: partLabel(p.part).replace("Part ", ""), title: p.title }));
  const row = [...items, ...items];

  return (
    <div
      aria-hidden="true"
      className="marquee relative overflow-hidden border-y border-line bg-surface/70 py-4 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
    >
      <div className="marquee-track flex w-max items-center whitespace-nowrap">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 px-6 text-[12.5px] font-medium tracking-[0.16em] text-ink-2 uppercase"
          >
            <span className="text-accent tabular-nums">{item.part}</span>
            <span>{item.title}</span>
            <span className="ml-6 h-3 w-px bg-line-2" />
          </span>
        ))}
      </div>
    </div>
  );
}
