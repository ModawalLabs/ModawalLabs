import { Download } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { downloadPagePath } from "@/lib/downloads";

type Props = {
  slug: string;
  label?: string;
  className?: string;
};

/**
 * The single place checkout plugs in. Today it goes straight to the download page;
 * the paywall will point it at checkout and send buyers to the same page afterwards.
 */
export default function BuyButton({ slug, label = "Buy now", className = "" }: Props) {
  return (
    <ButtonLink href={downloadPagePath(slug)} size="lg" className={className}>
      <Download className="size-4" aria-hidden="true" />
      {label}
    </ButtonLink>
  );
}
