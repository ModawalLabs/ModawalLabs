import Link from "next/link";
import Tilt from "@/components/motion/Tilt";
import { formatPrice, partLabel, type Product } from "@/lib/products";
import Cover from "./Cover";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex w-full">
      <Link href={`/products/${product.slug}`} className="group flex w-full flex-col rounded-2xl">
        <Tilt max={6} className="rounded-2xl">
          <div className="rounded-2xl bg-[linear-gradient(180deg,#ffffff_0%,#f3f1ec_100%)] p-4 shadow-[inset_0_1px_0_#fff] ring-1 ring-line/80 transition-shadow duration-300 group-hover:shadow-card sm:p-6">
            <Cover
              src={product.cover}
              alt={`${product.title} cover`}
              sizes="(min-width: 1024px) 230px, (min-width: 768px) 28vw, 42vw"
              className="transition-transform duration-500 ease-(--ease-soft) group-hover:-translate-y-2"
            />
          </div>
        </Tilt>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-xs font-medium tracking-[0.14em] text-ink-3 uppercase">{partLabel(product.part)}</p>
          <p className="rounded-full bg-surface px-2.5 py-0.5 text-[13px] font-semibold tabular-nums ring-1 ring-line">
            {formatPrice(product.price)}
          </p>
        </div>
        <h3 className="mt-2 font-display text-[1.3rem] leading-snug font-semibold transition-colors group-hover:text-accent-ink">
          {product.title}
        </h3>
        <p className="mt-1 text-[14.5px] leading-snug text-ink-2">{product.subtitle}</p>
      </Link>
    </article>
  );
}
