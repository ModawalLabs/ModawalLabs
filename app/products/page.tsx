import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductGrid from "@/components/product/ProductGrid";
import ContactSection from "@/components/home/ContactSection";
import Aurora from "@/components/ui/Aurora";
import Enter from "@/components/motion/Enter";
import { Item, Reveal, Stagger } from "@/components/motion/primitives";
import { bundleSaving, formatPrice, getProduct, partLabel } from "@/lib/products";

export const metadata: Metadata = {
  title: "Playbooks",
  description:
    "The Road to MVP series: seven practical playbooks for non-technical founders, covering the stack, tools, hiring a developer, AI prompts, pricing, legal docs and launch.",
};

const startingPoints = [
  { situation: "I have an idea but don’t know what to build it with.", slug: "choose-your-stack" },
  { situation: "I’m about to pay for tools and don’t want to overspend.", slug: "build-without-burning-cash" },
  { situation: "I need to hire a developer and can’t judge their skills.", slug: "hire-right-the-first-time" },
  { situation: "I want AI to do more of the heavy lifting.", slug: "ai-as-your-co-founder" },
  { situation: "I don’t know what to charge or how to take payments.", slug: "get-paid-before-you-launch" },
  { situation: "I need terms, a privacy policy and a contractor agreement.", slug: "legal-and-legal-ish" },
  { situation: "I’m launching in the next few weeks.", slug: "launch-week-playbook" },
];

export default function ProductsPage() {
  return (
    <>
      <section className="grain relative overflow-hidden pt-14 pb-20 [--grain:0.04] md:pt-20 md:pb-28">
        <Aurora className="opacity-80" />
        <Container className="relative">
          <div className="max-w-3xl">
            <Enter y={24} blur>
              <p className="text-[13px] font-medium tracking-[0.16em] text-accent uppercase">The Road to MVP series</p>
            </Enter>
            <Enter delay={0.08} y={24} blur>
              <h1 className="mt-4 font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] font-semibold tracking-[-0.025em] text-balance">
                Playbooks for non-technical founders.
              </h1>
            </Enter>
            <Enter delay={0.16} y={24} blur>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-ink-2">
                Seven focused playbooks, one for each decision between your idea and your launch. Each one stands on
                its own, or get the complete series and save {formatPrice(bundleSaving)}.
              </p>
            </Enter>
          </div>
          <h2 className="sr-only">All playbooks</h2>
          <div className="mt-16">
            <ProductGrid />
          </div>
        </Container>
      </section>

      <section aria-labelledby="start-title" className="border-y border-line bg-paper-2/60 py-24 md:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <SectionHeading
              eyebrow="Where to start"
              title={<span id="start-title">Not sure which one you need?</span>}
              intro="Find the sentence that sounds most like you."
            />
          </Reveal>
          <Stagger stagger={0.06} className="lg:col-span-8">
            <ul className="divide-y divide-line border-y border-line">
              {startingPoints.map(({ situation, slug }) => {
                const product = getProduct(slug);
                if (!product) return null;
                return (
                  <li key={slug}>
                    <Item y={16}>
                      <Link
                        href={`/products/${slug}`}
                        className="group flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
                      >
                        <span className="font-display text-xl leading-snug text-ink italic">“{situation}”</span>
                        <span className="inline-flex shrink-0 items-center gap-2 text-[15px] font-medium text-accent group-hover:text-accent-ink">
                          <span className="text-ink-3">{partLabel(product.part)}</span>
                          {product.title}
                          <ArrowRight
                            className="size-4 transition-transform group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </Link>
                    </Item>
                  </li>
                );
              })}
            </ul>
          </Stagger>
        </Container>
      </section>

      <ContactSection />
    </>
  );
}
