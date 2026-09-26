import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Aurora from "@/components/ui/Aurora";
import { ButtonLink } from "@/components/ui/Button";
import HeroStage from "@/components/product/HeroStage";
import Enter from "@/components/motion/Enter";
import { Parallax } from "@/components/motion/primitives";
import { lowestPrice, products } from "@/lib/products";
import { site } from "@/lib/site";

/** One headline line, revealed from behind a mask. */
function MaskedLine({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
      <span className="enter-mask block" style={{ "--enter-delay": `${delay}s` } as CSSProperties}>
        {children}
      </span>
    </span>
  );
}

export default function Hero() {
  return (
    <section className="grain relative -mt-16 overflow-hidden pt-16 [--grain:0.05]">
      <Aurora />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-paper"
      />

      <Container className="relative pt-16 text-center md:pt-24">
        <h1 className="mx-auto max-w-5xl font-display text-[clamp(2.8rem,7vw,6rem)] leading-[1.0] font-semibold tracking-[-0.03em]">
          <MaskedLine delay={0.12}>Stop overthinking.</MaskedLine>
          <MaskedLine delay={0.24}>
            <em className="text-accent">Start building.</em>
          </MaskedLine>
        </h1>

        <Enter delay={0.45}>
          <p className="mx-auto mt-7 max-w-[38rem] text-lg leading-relaxed text-pretty text-ink-2 sm:text-[1.2rem]">
            {products.length} practical playbooks that take non-technical founders from idea to a launched SaaS: what to
            build, which tools to pay for, how to hire a developer, how to price, and how to launch.
          </p>
        </Enter>

        <Enter delay={0.58} className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <ButtonLink id="hero-cta" href="/products" size="lg">
            View products
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </ButtonLink>
          <p className="text-[15px] text-ink-3">From ${lowestPrice}</p>
        </Enter>

        <Enter delay={0.72} className="mt-8">
          <a
            href="#about"
            className="inline-flex items-center gap-3 rounded-full py-1 pr-4 pl-1 transition-colors hover:bg-ink/[0.03]"
          >
            <span className="relative size-10 overflow-hidden rounded-full shadow-card ring-2 ring-surface">
              <Image src="/assets/myself.jpeg" alt="" fill sizes="40px" className="object-cover object-[50%_28%]" />
            </span>
            <span className="text-left leading-tight">
              <span className="block text-[14.5px] font-medium">Written by {site.owner}</span>
              <span className="block text-[13px] text-ink-3">Full-stack developer &amp; product designer</span>
            </span>
          </a>
        </Enter>
      </Container>

      <Container className="relative mt-14 pb-24 md:mt-20 md:pb-32">
        <Parallax amount={22}>
          <HeroStage />
        </Parallax>
      </Container>
    </section>
  );
}
