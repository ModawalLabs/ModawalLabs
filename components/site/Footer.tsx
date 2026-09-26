import Link from "next/link";
import { Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import PageLink from "@/components/ui/PageLink";
import { LinkedInIcon, StackOverflowIcon } from "@/components/ui/BrandIcons";
import { bundle } from "@/lib/products";
import { site } from "@/lib/site";
import Logo from "./Logo";

const columns = [
  {
    title: "Playbooks",
    links: [
      { label: "All playbooks", href: "/products" },
      { label: "Complete series", href: `/products/${bundle.slug}` },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Work", href: "/#work" },
      { label: "About me", href: "/#about" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
] as const;

const socials = [
  { label: "LinkedIn", href: site.links.linkedin, Icon: LinkedInIcon },
  { label: "Stack Overflow", href: site.links.stackoverflow, Icon: StackOverflowIcon },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-header-tone="dark" className="relative overflow-hidden border-t border-white/10 bg-night text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-[0.2em] text-center font-display text-[17vw] leading-none font-semibold tracking-[-0.04em] text-white/[0.035] select-none"
      >
        ModawalLabs
      </div>
      <Container className="relative py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label="ModawalLabs home" className="inline-flex rounded-md">
              <Logo tone="light" />
            </Link>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-white/60">{site.tagline}</p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-[13px] font-medium tracking-[0.14em] text-white/45 uppercase">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <PageLink href={link.href} className="text-[15px] text-white/80 transition-colors hover:text-white">
                      {link.label}
                    </PageLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-[13px] font-medium tracking-[0.14em] text-white/45 uppercase">Contact</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-[15px] text-white/80 transition-colors hover:text-white"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  Email
                </a>
              </li>
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[15px] text-white/80 transition-colors hover:text-white"
                  >
                    <Icon className="size-4" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Designed and built by {site.owner}.</p>
        </div>
      </Container>
    </footer>
  );
}
