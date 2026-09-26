import { Hammer, Languages, ListChecks, Scale, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import Aurora from "@/components/ui/Aurora";
import SectionHeading from "@/components/ui/SectionHeading";
import Spotlight from "@/components/motion/Spotlight";
import { Item, Reveal, Stagger } from "@/components/motion/primitives";
import { Checklist, PlainEnglish, TradeOffs } from "./PrinciplesBits";

const tile =
  "group h-full overflow-hidden rounded-3xl bg-[linear-gradient(180deg,#ffffff_0%,#f6f4ef_100%)] ring-1 ring-line shadow-[inset_0_1px_0_#fff,0_1px_2px_rgb(20_20_22/0.04)] transition-shadow duration-500 hover:shadow-lift hover:ring-accent/30";

function Tile({
  Icon,
  index,
  title,
  text,
  children,
}: {
  Icon: LucideIcon;
  index: string;
  title: string;
  text: string;
  children: React.ReactNode;
}) {
  return (
    <Spotlight className={tile}>
      <div className="relative h-full p-7 md:p-8">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-5 right-7 font-display text-5xl leading-none font-semibold tracking-[-0.04em] text-ink/[0.045]"
        >
          {index}
        </span>
        <span className="inline-flex size-11 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#eef1fd_0%,#e6dcfa_100%)] text-accent shadow-[inset_0_1px_0_#fff] ring-1 ring-accent/10">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <h3 className="mt-6 text-[17px] font-semibold tracking-tight">{title}</h3>
        <p className="mt-2.5 max-w-md text-[15px] leading-relaxed text-ink-2">{text}</p>
        {children}
      </div>
    </Spotlight>
  );
}

/** Three little windows stepping from design to build to launch; they rise on hover. */
function ProcessStack() {
  const steps = ["Design", "Build", "Launch"] as const;
  return (
    <div aria-hidden="true" className="relative mt-8 h-52 sm:h-56">
      {steps.map((label, i) => (
        <div
          key={label}
          className="absolute w-[58%] overflow-hidden rounded-xl bg-paper shadow-card ring-1 ring-line transition-transform duration-700 ease-(--ease-soft) group-hover:-translate-y-2"
          style={{
            left: `${i * 21}%`,
            top: `${i * 18}%`,
            rotate: `${(i - 1) * 1.5}deg`,
            zIndex: i,
            transitionDelay: `${i * 70}ms`,
          }}
        >
          <div className="flex items-center gap-1.5 border-b border-line bg-surface px-3 py-2">
            <span className="size-2 rounded-full bg-line-2" />
            <span className="size-2 rounded-full bg-line-2" />
            <span className="size-2 rounded-full bg-line-2" />
            <span className="ml-2 text-[10.5px] font-medium tracking-[0.14em] text-ink-3 uppercase">{label}</span>
          </div>
          <div className="space-y-2 p-3">
            {label === "Design" && (
              <div className="flex gap-2">
                <span className="size-5 rounded-full bg-accent" />
                <span className="size-5 rounded-full bg-[#f4dccb]" />
                <span className="size-5 rounded-full bg-accent-2" />
                <span className="size-5 rounded-full bg-ink" />
              </div>
            )}
            <div className="h-2 w-3/4 rounded-full bg-line" />
            <div className="h-2 w-1/2 rounded-full bg-line" />
            {label === "Build" && <div className="h-2 w-2/3 rounded-full bg-accent/40" />}
            {label === "Launch" && (
              <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-[#e6f4ec] px-2 py-0.5 text-[10.5px] font-semibold text-success">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-success/60" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-success" />
                </span>
                Live
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Principles() {
  return (
    <section aria-labelledby="principles-title" className="grain relative overflow-hidden py-24 [--grain:0.035] md:py-32">
      <Aurora className="opacity-70" />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="Why these playbooks"
            title={<span id="principles-title">Built for the decisions that actually cost you money.</span>}
          />
        </Reveal>
        <Stagger stagger={0.09} className="mt-14 grid gap-4 md:grid-cols-6 md:gap-5">
          <Item className="md:col-span-6 lg:col-span-4">
            <Tile
              Icon={Hammer}
              index="01"
              title="Written by a builder"
              text="I design and build software for a living. Every framework here comes from real product work, not recycled blog posts."
            >
              <ProcessStack />
            </Tile>
          </Item>
          <Item className="md:col-span-3 lg:col-span-2">
            <Tile
              Icon={ListChecks}
              index="02"
              title="Decisions, not theory"
              text="Each playbook ends in something you can use today: a checklist, a calculator, a script or a template."
            >
              <Checklist />
            </Tile>
          </Item>
          <Item className="md:col-span-3 lg:col-span-2">
            <Tile
              Icon={Languages}
              index="03"
              title="Plain English"
              text="Written for founders without a technical background. When a technical term matters, it’s explained, never assumed."
            >
              <PlainEnglish />
            </Tile>
          </Item>
          <Item className="md:col-span-6 lg:col-span-4">
            <Tile
              Icon={Scale}
              index="04"
              title="Honest about trade-offs"
              text="Including when no-code is enough, when a developer is worth paying for, and when the right answer is to wait."
            >
              <TradeOffs />
            </Tile>
          </Item>
        </Stagger>
      </Container>
    </section>
  );
}
