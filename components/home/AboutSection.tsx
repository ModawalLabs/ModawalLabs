import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { LinkedInIcon, StackOverflowIcon } from "@/components/ui/BrandIcons";
import { Item, Reveal, Stagger } from "@/components/motion/primitives";
import { career, site } from "@/lib/site";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32">
      <Container className="grid gap-16 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <Reveal y={32} className="relative mx-auto max-w-md">
              {/* Two prints behind the photo, like a stack on a desk */}
              <div aria-hidden="true" className="absolute inset-x-3 inset-y-0 -rotate-[5deg] rounded-2xl bg-paper-2 ring-1 ring-line" />
              <div
                aria-hidden="true"
                className="absolute inset-x-1 inset-y-0 rotate-[2.5deg] rounded-2xl bg-surface shadow-card ring-1 ring-line"
              />
              <div className="relative overflow-hidden rounded-2xl bg-paper-2 shadow-lift ring-1 ring-line">
                <Image
                  src="/assets/shivansh.jpeg"
                  alt="Shivansh Modawal, smiling, in a black shirt"
                  width={1792}
                  height={2400}
                  sizes="(min-width: 1024px) 420px, 90vw"
                  className="block h-auto w-full"
                />
              </div>
            </Reveal>
          </div>
        </div>

        <Stagger className="lg:col-span-7" stagger={0.09}>
          <Item>
            <p className="flex items-center gap-3 text-[13px] font-medium tracking-[0.16em] text-accent uppercase">
              <span className="font-display text-base leading-none tracking-normal text-ink-3 italic">04</span>
              <span className="size-1 rounded-full bg-line-2" aria-hidden="true" />
              About
            </p>
          </Item>
          <Item>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.08] font-semibold tracking-[-0.015em]">
              Hi, I’m Shivansh.
            </h2>
          </Item>
          <Item>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-pretty text-ink-2">
              <p>
                I’m a full-stack developer and product designer. I’ve led engineering teams, designed interfaces for AI
                products, and founded Modawal Labs to help founders turn ideas into real products.
              </p>
              <p>
                I believe great ideas shouldn’t require a technical background or a massive budget to become real
                products. Before a single line of code is written, you should know exactly what you’re building, who
                it’s for, and how to launch it.
              </p>
            </div>
          </Item>
          <Item>
            <blockquote className="mt-8 rounded-2xl border-l-2 border-accent bg-surface px-6 py-5 font-display text-[1.35rem] leading-snug text-ink italic ring-1 ring-line">
              That’s why I wrote the Road to MVP series: the frameworks, templates and scripts I want every founder to
              have before they spend their first dollar.
            </blockquote>
          </Item>

          <ol className="mt-12 border-l border-line-2">
            {career.map((item) => (
              <li key={`${item.role}-${item.company}`} className="relative pb-8 pl-7 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 -left-[5px] size-[9px] rounded-full border-2 border-paper bg-ink"
                />
                <Item y={18}>
                  <p className="text-[16.5px] font-semibold tracking-tight">
                    {item.role} <span className="font-normal text-ink-3">· {item.company}</span>
                  </p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-2">{item.text}</p>
                </Item>
              </li>
            ))}
          </ol>

          <Item className="mt-10 flex flex-wrap gap-3">
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-surface px-5 text-[15px] font-medium ring-1 ring-line-2 transition-shadow ring-inset hover:ring-ink/40"
            >
              <LinkedInIcon className="size-4 text-[#0a66c2]" />
              LinkedIn
              <ArrowUpRight className="size-4 text-ink-3" aria-hidden="true" />
            </a>
            <a
              href={site.links.stackoverflow}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-surface px-5 text-[15px] font-medium ring-1 ring-line-2 transition-shadow ring-inset hover:ring-ink/40"
            >
              <StackOverflowIcon className="size-4 text-[#f48024]" />
              Stack Overflow
              <ArrowUpRight className="size-4 text-ink-3" aria-hidden="true" />
            </a>
          </Item>
        </Stagger>
      </Container>
    </section>
  );
}
