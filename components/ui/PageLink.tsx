"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<"a">, "href"> & { href: string };

/**
 * next/link, except for a section of the page you are already on ("/#faq" on the home
 * page, or "#faq"). Those render a plain anchor: next/link treats a click on the hash the
 * address already ends in as no navigation and doesn't scroll, while the browser scrolls
 * to the section on every click.
 */
export default function PageLink({ href, ...rest }: Props) {
  const pathname = usePathname();
  const [path, hash] = href.split("#");
  if (hash !== undefined && (path === "" || path === pathname)) {
    return <a href={`#${hash}`} {...rest} />;
  }
  return <Link href={href} {...rest} />;
}
