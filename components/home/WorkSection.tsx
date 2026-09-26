import { Check } from "lucide-react";
import Container from "@/components/ui/Container";
import Aurora from "@/components/ui/Aurora";
import SectionHeading from "@/components/ui/SectionHeading";
import BrowserFrame from "@/components/work/BrowserFrame";
import ExplainerVideo from "@/components/work/ExplainerVideo";
import { Item, Parallax, Reveal, Stagger } from "@/components/motion/primitives";
import { work, type WorkItem } from "@/lib/work";

function Media({ item }: { item: WorkItem }) {
  const [first, ...rest] = item.images;
  const secondary = item.video ? item.images : rest;
  return (
    <div className="relative">
      {/* Brand-coloured light behind the media */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 rounded-[2.5rem] opacity-30 blur-3xl"
        style={{ backgroundColor: item.brand }}
      />
      <div className="relative space-y-4 sm:space-y-5">
        {item.video ? (
          <ExplainerVideo video={item.video} />
        ) : (
          first && <BrowserFrame image={first} sizes="(min-width: 1024px) 700px, 100vw" />
        )}
        {secondary.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {secondary.map((image) => (
              <BrowserFrame key={image.src} image={image} sizes="(min-width: 1024px) 340px, 50vw" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function WorkCase({ item, flip }: { item: WorkItem; flip: boolean }) {
  return (
    <article id={`work-${item.slug}`} className="grid scroll-mt-24 items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <div className={`lg:col-span-7 ${flip ? "lg:order-last" : ""}`}>
        <Parallax amount={20}>
          <Reveal y={34}>
            <Media item={item} />
          </Reveal>
        </Parallax>
      </div>
      <Stagger className="lg:col-span-5" stagger={0.08}>
        <Item>
          <div className="flex items-center gap-3">
            <span className="size-2.5 rounded-full" style={{ backgroundColor: item.brand }} aria-hidden="true" />
            <p className="text-[13px] font-medium tracking-[0.14em] text-white/55 uppercase">{item.tags.join(" · ")}</p>
          </div>
        </Item>
        <Item>
          <h3 className="mt-5 font-display text-[2.6rem] leading-none font-semibold tracking-[-0.02em]">{item.name}</h3>
        </Item>
        <Item>
          <p className="mt-3 font-display text-xl text-white/75 italic">“{item.tagline}”</p>
        </Item>
        <Item>
          <p className="mt-5 text-[16.5px] leading-relaxed text-white/70">{item.description}</p>
        </Item>
        <ul className="mt-7 space-y-3">
          {item.points.map((point) => (
            <li key={point}>
              <Item className="flex gap-3 text-[15.5px] text-white/85" y={16}>
                <Check className="mt-0.5 size-[18px] shrink-0 text-[#9be7b4]" aria-hidden="true" />
                {point}
              </Item>
            </li>
          ))}
        </ul>
      </Stagger>
    </article>
  );
}

export default function WorkSection() {
  return (
    <section
      id="work"
      data-header-tone="dark"
      className="grain grain-dark relative overflow-hidden bg-night py-24 text-white md:py-32"
    >
      <Aurora tone="dark" />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            tone="dark"
            index="03"
            eyebrow="Selected work"
            title="I build products, not just playbooks."
            intro="The decisions in the Road to MVP series are the same ones I make designing and building my own products, like these three."
          />
        </Reveal>
        <div className="mt-16 space-y-24 md:mt-20 md:space-y-32">
          {work.map((item, i) => (
            <WorkCase key={item.slug} item={item} flip={i % 2 === 1} />
          ))}
        </div>
      </Container>
    </section>
  );
}
