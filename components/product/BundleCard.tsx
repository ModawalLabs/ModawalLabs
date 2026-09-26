import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { bundle, bundleSaving, formatPrice, seriesTotal } from "@/lib/products";
import Cover from "./Cover";

/** The complete-series tile that closes the product grid. A soft light travels its border. */
export default function BundleCard() {
  return (
    <article className="flex w-full">
      <Link
        href={`/products/${bundle.slug}`}
        className="glow-border group relative flex w-full flex-col overflow-hidden rounded-2xl bg-[linear-gradient(160deg,#1e1c2c_0%,#121211_55%,#181512_100%)] text-white ring-1 ring-white/10 md:flex-row lg:flex-col"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-16 size-64 rounded-full bg-accent-2/25 blur-3xl"
        />
        <div className="relative p-4 sm:p-6 md:w-1/2 md:shrink-0 lg:w-auto">
          <Cover
            src={bundle.cover}
            alt="The Road to MVP complete series cover"
            sizes="(min-width: 1024px) 230px, (min-width: 768px) 28vw, 42vw"
            className="ring-white/10 transition-transform duration-500 ease-(--ease-soft) group-hover:-translate-y-2"
          />
        </div>
        <div className="relative flex flex-1 flex-col px-4 pb-5 sm:px-6 sm:pb-6 md:py-6 md:pl-0 lg:pt-0 lg:pl-6">
          <p className="text-xs font-medium tracking-[0.14em] text-[#e2c98f] uppercase">Complete series</p>
          <h3 className="mt-1.5 font-display text-[1.3rem] leading-snug font-semibold">All seven playbooks</h3>
          <p className="mt-2 flex flex-wrap items-baseline gap-x-2 text-[15px]">
            <span className="font-semibold tabular-nums">{formatPrice(bundle.price)}</span>
            <span className="text-white/45 tabular-nums line-through">{formatPrice(seriesTotal)}</span>
            <span className="text-[#9be7b4]">Save {formatPrice(bundleSaving)}</span>
          </p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-white/80 transition-colors group-hover:text-white">
            See what’s included
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
