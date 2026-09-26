import { Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import Aurora from "@/components/ui/Aurora";
import { ButtonLink } from "@/components/ui/Button";
import { LinkedInIcon } from "@/components/ui/BrandIcons";
import { Item, Stagger } from "@/components/motion/primitives";
import { site } from "@/lib/site";
import CopyEmailButton from "./CopyEmailButton";

export default function ContactSection() {
  return (
    <section id="contact" data-header-tone="dark" className="grain grain-dark relative overflow-hidden bg-night text-white">
      <Aurora tone="dark" />
      <div
        aria-hidden="true"
        className="animate-breathe pointer-events-none absolute inset-0 [background:radial-gradient(50rem_26rem_at_50%_0%,rgb(70_96_220/0.28),transparent_70%)]"
      />
      <Container className="relative py-24 text-center md:py-32">
        <Stagger className="mx-auto max-w-2xl" stagger={0.09}>
          <Item>
            <p className="text-[13px] font-medium tracking-[0.16em] text-[#aebcff] uppercase">Contact</p>
          </Item>
          <Item>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] font-semibold tracking-[-0.02em] text-balance">
              Have a question? <em className="text-white/70">Ask me directly.</em>
            </h2>
          </Item>
          <Item>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              Not sure which playbook fits your idea, or want to talk something through?
            </p>
          </Item>
          <Item className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={site.links.linkedin} variant="light" size="lg" className="w-full sm:w-auto">
              <LinkedInIcon className="size-[18px] text-[#0a66c2]" />
              Message me on LinkedIn
            </ButtonLink>
            <ButtonLink href={`mailto:${site.email}`} variant="outline-light" size="lg" className="w-full sm:w-auto">
              <Mail className="size-[18px]" aria-hidden="true" />
              Email me
            </ButtonLink>
          </Item>
          <Item className="mt-6 flex items-center justify-center gap-2 text-sm text-white/45">
            <span>or copy</span>
            <CopyEmailButton email={site.email} />
          </Item>
        </Stagger>
      </Container>
    </section>
  );
}
