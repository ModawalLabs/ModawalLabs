import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { buttonClasses } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/primitives";

export default function PSNote() {
  return (
    <section aria-label="P.S." className="pb-24 md:pb-32">
      <Container>
        <Reveal className="mx-auto max-w-4xl">
          <div className="grid gap-8 rounded-2xl border border-dashed border-line-2 bg-surface/60 p-8 md:grid-cols-[auto_1fr] md:gap-10 md:p-12">
            <p className="font-display text-5xl leading-none text-ink-3 italic">P.S.</p>
            <div>
              <p className="text-lg leading-relaxed text-ink">Not ready to buy yet? Try one of the tools first.</p>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-2">
                The SaaS Type Classifier from{" "}
                <Link
                  href="/products/choose-your-stack"
                  className="font-medium text-ink underline decoration-line-2 underline-offset-4 hover:decoration-ink/40"
                >
                  Choose Your Stack
                </Link>{" "}
                is yours free. Answer three questions and it tells you which type of SaaS you’re building, the stack
                that fits and a realistic budget. It runs in your browser, with no sign-up.
              </p>
              <a
                href="/free/saas-type-classifier.html"
                target="_blank"
                rel="noopener"
                className={buttonClasses("primary", "md", "mt-6")}
              >
                Try the classifier
                <ArrowUpRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
