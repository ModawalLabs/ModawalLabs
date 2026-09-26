import Image from "next/image";
import { COVER_SIZE } from "@/lib/products";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  eager?: boolean;
};

/** A playbook cover rendered like a physical book: soft shadow, hairline edge and a light sheen. */
export default function Cover({ src, alt, sizes, className = "", eager = false }: Props) {
  return (
    <div className={`group/cover relative overflow-hidden rounded-[10px] shadow-cover ring-1 ring-black/10 ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={COVER_SIZE.width}
        height={COVER_SIZE.height}
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        className="block h-auto w-full"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-tr from-transparent via-transparent to-white/10"
      />
      {/* Light sweep across the cover on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-full w-full bg-[linear-gradient(100deg,transparent_42%,rgba(255,255,255,0.20)_50%,transparent_58%)] opacity-0 transition-[transform,opacity] duration-[1100ms] ease-out group-hover/cover:translate-x-[200%] group-hover/cover:opacity-100"
      />
    </div>
  );
}
