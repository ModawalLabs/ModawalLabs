import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import Enter from "@/components/motion/Enter";

export default function NotFound() {
  return (
    <section className="py-32 md:py-40">
      <Container className="max-w-2xl text-center">
        <Enter y={26} blur>
          <p className="text-[13px] font-medium tracking-[0.16em] text-accent uppercase">404</p>
          <h1 className="mt-4 font-display text-[clamp(2.4rem,5vw,3.75rem)] leading-[1.05] font-semibold tracking-[-0.02em]">
            This page doesn’t exist.
          </h1>
          <p className="mt-5 text-lg text-ink-2">It may have moved, or the link might be mistyped.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/">Back to home</ButtonLink>
            <ButtonLink href="/products" variant="secondary">
              Browse playbooks
            </ButtonLink>
          </div>
        </Enter>
      </Container>
    </section>
  );
}
