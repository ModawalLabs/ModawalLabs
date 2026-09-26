import Image from "next/image";
import type { WorkImage } from "@/lib/work";

/** A screenshot in a minimal browser window, so landing pages read as websites. */
export default function BrowserFrame({
  image,
  sizes,
  className = "",
}: {
  image: WorkImage;
  sizes: string;
  className?: string;
}) {
  return (
    <figure className={`overflow-hidden rounded-xl bg-surface shadow-card ring-1 ring-line ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-line bg-paper-2/70 px-3 py-2" aria-hidden="true">
        <span className="size-2 rounded-full bg-[#e5e2da]" />
        <span className="size-2 rounded-full bg-[#e5e2da]" />
        <span className="size-2 rounded-full bg-[#e5e2da]" />
      </div>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        className="block h-auto w-full"
      />
    </figure>
  );
}
