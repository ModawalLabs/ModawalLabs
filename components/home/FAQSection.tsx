import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/primitives";
import { faqs } from "@/lib/faq";
import FAQAccordion from "./FAQAccordion";

export default function FAQSection() {
  return (
    <section id="faq" className="border-t border-line py-24 md:py-32">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <SectionHeading
            index="05"
            eyebrow="FAQ"
            title="Questions, answered."
            intro={
              <>
                Something else on your mind?{" "}
                <a
                  href="#contact"
                  className="text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
                >
                  Ask me directly
                </a>
                .
              </>
            }
          />
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-8">
          <FAQAccordion items={faqs} />
        </Reveal>
      </Container>
    </section>
  );
}
