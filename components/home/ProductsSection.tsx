import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import ProductGrid from "@/components/product/ProductGrid";
import { Item, Reveal, Stagger } from "@/components/motion/primitives";
import { bundle, bundleSaving } from "@/lib/products";

export default function ProductsSection() {
  return (
    <section id="products" className="py-24 md:py-32">
      <Container>
        <Stagger className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Item>
            <SectionHeading
              index="01"
              eyebrow="The playbooks"
              title={
                <>
                  Seven playbooks. <span className="text-ink-3 italic">One clear path</span> from idea to launch.
                </>
              }
              intro="Each playbook tackles one decision non-technical founders routinely get wrong, and gives you the frameworks, templates and scripts to get it right."
            />
          </Item>
          <Item className="max-w-xs lg:pb-2 lg:text-right">
            <p className="text-[15px] leading-relaxed text-ink-2">
              Buy the one you need now, or{" "}
              <Link
                href={`/products/${bundle.slug}`}
                className="font-medium text-ink underline decoration-line-2 underline-offset-4 hover:decoration-ink/40"
              >
                get all seven and save ${bundleSaving}
              </Link>
              .
            </p>
          </Item>
        </Stagger>
        <div className="mt-14 md:mt-16">
          <ProductGrid limit={4} />
        </div>
        <Reveal className="mt-14 flex justify-center md:mt-16">
          <ButtonLink href="/products" variant="secondary" size="lg">
            See all playbooks
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
