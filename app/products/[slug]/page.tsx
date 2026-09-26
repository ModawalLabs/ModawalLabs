import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Globe, ShieldCheck, Zap } from "lucide-react";
import Container from "@/components/ui/Container";
import Cover from "@/components/product/Cover";
import BuyButton from "@/components/product/BuyButton";
import ContactSection from "@/components/home/ContactSection";
import InsideGallery from "@/components/product/InsideGallery";
import { Item, Reveal, Stagger } from "@/components/motion/primitives";
import Enter from "@/components/motion/Enter";
import CountUp from "@/components/motion/CountUp";
import Aurora from "@/components/ui/Aurora";
import {
  bundle,
  bundleSaving,
  formatPrice,
  getProduct,
  partLabel,
  products,
  seriesTotal,
  type Product,
} from "@/lib/products";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return [...products.map((p) => ({ slug: p.slug })), { slug: bundle.slug }];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  if (slug === bundle.slug) {
    return { title: `${bundle.title}: the complete series`, description: bundle.tagline };
  }
  const product = getProduct(slug);
  if (!product) return {};
  return { title: product.title, description: `${product.subtitle}. ${product.tagline}` };
}

const delivery = [
  { Icon: Zap, text: "Instant download, no account" },
  { Icon: Globe, text: "Interactive, opens in any browser" },
  { Icon: ShieldCheck, text: "Works offline, yours to keep" },
];

function DeliveryNote() {
  return (
    <ul className="mt-5 grid gap-2 text-[14px] text-ink-2 sm:grid-cols-3">
      {delivery.map(({ Icon, text }) => (
        <li key={text} className="flex items-center gap-2">
          <Icon className="size-4 shrink-0 text-success" aria-hidden="true" />
          {text}
        </li>
      ))}
    </ul>
  );
}

function BackLink() {
  return (
    <Link href="/products" className="inline-flex items-center gap-1.5 text-sm text-ink-3 hover:text-ink">
      <ArrowLeft className="size-3.5" aria-hidden="true" />
      All playbooks
    </Link>
  );
}

function ProductDetail({ product }: { product: Product }) {
  const index = products.findIndex((p) => p.slug === product.slug);
  const prev = products[index - 1];
  const next = products[index + 1];

  return (
    <>
      <section className="relative overflow-hidden pt-8 pb-20 md:pt-12 md:pb-28">
        <Aurora className="opacity-70" />
        <Container className="relative">
          <BackLink />
          <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-[linear-gradient(180deg,#ffffff_0%,#f3f1ec_100%)] p-8 shadow-[inset_0_1px_0_#fff] ring-1 ring-line/80 sm:p-12 lg:sticky lg:top-24">
                <Enter y={18} blur>
                  <Cover
                    src={product.cover}
                    alt={`${product.title} cover`}
                    sizes="(min-width: 1024px) 380px, 80vw"
                    eager
                    className="mx-auto max-w-sm"
                  />
                </Enter>
              </div>
            </div>

            <Enter className="lg:col-span-7" delay={0.12} y={22} blur>
              <p className="text-[13px] font-medium tracking-[0.16em] text-accent uppercase">
                Road to MVP · {partLabel(product.part)} of {String(products.length).padStart(2, "0")}
              </p>
              <h1 className="mt-4 font-display text-[clamp(2.3rem,4.6vw,3.6rem)] leading-[1.02] font-semibold tracking-[-0.025em] text-balance">
                {product.title}
              </h1>
              <p className="mt-3 font-display text-[1.35rem] text-ink-2 italic">{product.subtitle}</p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-ink-2">{product.tagline}</p>

              <dl className="mt-8 grid max-w-lg grid-cols-3 divide-x divide-line rounded-2xl bg-surface ring-1 ring-line">
                {product.stats.map((stat) => (
                  <div key={stat.label} className="px-4 py-4 sm:px-5">
                    <dt className="text-xs leading-snug text-ink-3">{stat.label}</dt>
                    <dd className="mt-1 font-display text-2xl font-semibold tabular-nums">
                      <CountUp value={stat.value} />
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 rounded-3xl bg-surface p-6 shadow-lift ring-1 ring-line sm:p-7">
                <p className="flex items-baseline gap-3">
                  <span className="font-display text-4xl font-semibold tabular-nums">{formatPrice(product.price)}</span>
                  <span className="text-[15px] text-ink-3">one-time payment</span>
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <BuyButton slug={product.slug} />
                  <Link
                    href={`/products/${bundle.slug}`}
                    className="text-[15px] font-medium text-ink-2 underline decoration-line-2 underline-offset-4 hover:text-ink hover:decoration-ink/40"
                  >
                    Or get all seven for {formatPrice(bundle.price)}
                  </Link>
                </div>
                <DeliveryNote />
              </div>

              <div className="mt-10 rounded-2xl bg-surface p-6 ring-1 ring-line sm:p-7">
                <h2 className="text-[13px] font-medium tracking-[0.14em] text-ink-3 uppercase">What’s included</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {product.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-[15.5px]">
                      <Check className="mt-0.5 size-[18px] shrink-0 text-success" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Enter>
          </div>
        </Container>
      </section>

      <section aria-labelledby="learn-title" className="border-t border-line py-20 md:py-28">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="text-[13px] font-medium tracking-[0.16em] text-accent uppercase">Inside this playbook</p>
            <h2 id="learn-title" className="mt-4 font-display text-[clamp(1.85rem,3.3vw,2.5rem)] leading-[1.08] font-semibold">
              What you’ll learn
            </h2>
          </Reveal>
          <Stagger stagger={0.07} className="lg:col-span-8">
            <ol className="space-y-6">
              {product.learn.map((item, i) => (
                <li key={item} className="border-b border-line pb-6 last:border-0 last:pb-0">
                  <Item y={18} className="flex gap-5">
                    <span className="font-display text-2xl leading-none text-ink-3 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[17px] leading-relaxed text-ink-2">{item}</p>
                  </Item>
                </li>
              ))}
            </ol>
          </Stagger>
        </Container>
      </section>

      <section aria-labelledby="preview-title" className="border-y border-line bg-paper-2/60 py-20 md:py-28">
        <Container>
          <Reveal>
            <p className="text-[13px] font-medium tracking-[0.16em] text-accent uppercase">Look inside</p>
            <h2 id="preview-title" className="mt-4 font-display text-[clamp(1.85rem,3.3vw,2.5rem)] leading-[1.08] font-semibold">
              A real page from {product.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="mt-10">
            <figure className="overflow-hidden rounded-2xl bg-surface shadow-lift ring-1 ring-line">
            <div className="flex items-center gap-2 border-b border-line bg-paper-2/70 px-4 py-2.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-[#e5e2da]" />
              <span className="size-2.5 rounded-full bg-[#e5e2da]" />
              <span className="size-2.5 rounded-full bg-[#e5e2da]" />
            </div>
            <Image
              src={product.preview.src}
              alt={product.preview.alt}
              width={product.preview.width}
              height={product.preview.height}
              sizes="(min-width: 1200px) 1100px, 100vw"
              className="block h-auto w-full"
            />
            </figure>
          </Reveal>
          <p className="mt-4 text-[15px] text-ink-2">{product.preview.caption}</p>
        </Container>
      </section>

      <section aria-label="More from the series" className="py-20 md:py-24">
        <Container className="grid gap-4 md:grid-cols-2">
          {prev ? (
            <Link
              href={`/products/${prev.slug}`}
              className="group rounded-2xl bg-surface p-6 ring-1 ring-line transition-shadow hover:shadow-card"
            >
              <span className="inline-flex items-center gap-1.5 text-sm text-ink-3">
                <ArrowLeft className="size-4" aria-hidden="true" /> Previous · {partLabel(prev.part)}
              </span>
              <span className="mt-2 block font-display text-xl font-semibold">{prev.title}</span>
            </Link>
          ) : (
            <span className="hidden md:block" />
          )}
          {next ? (
            <Link
              href={`/products/${next.slug}`}
              className="group rounded-2xl bg-surface p-6 text-right ring-1 ring-line transition-shadow hover:shadow-card"
            >
              <span className="inline-flex items-center gap-1.5 text-sm text-ink-3">
                Next · {partLabel(next.part)} <ArrowRight className="size-4" aria-hidden="true" />
              </span>
              <span className="mt-2 block font-display text-xl font-semibold">{next.title}</span>
            </Link>
          ) : (
            <Link
              href={`/products/${bundle.slug}`}
              className="group rounded-2xl bg-night p-6 text-right text-white transition-shadow hover:shadow-card"
            >
              <span className="inline-flex items-center gap-1.5 text-sm text-white/55">
                Complete series <ArrowRight className="size-4" aria-hidden="true" />
              </span>
              <span className="mt-2 block font-display text-xl font-semibold">
                All seven playbooks for {formatPrice(bundle.price)}
              </span>
            </Link>
          )}
        </Container>
      </section>

      <ContactSection />
    </>
  );
}

function BundleDetail() {
  const items = products.map((p) => ({
    slug: p.slug,
    part: partLabel(p.part),
    title: p.title,
    accent: p.accent,
    cover: p.cover,
    stats: p.stats,
    preview: p.preview,
  }));

  return (
    <>
      <section className="relative overflow-hidden pt-8 pb-20 md:pt-12 md:pb-28">
        <Aurora className="opacity-70" />
        <Container className="relative">
          <BackLink />
          <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-night p-8 sm:p-12 lg:sticky lg:top-24">
                <Enter y={18} blur>
                  <Cover
                    src={bundle.cover}
                    alt="The Road to MVP complete series cover"
                    sizes="(min-width: 1024px) 380px, 80vw"
                    eager
                    className="mx-auto max-w-sm ring-white/10"
                  />
                </Enter>
              </div>
            </div>

            <Enter className="lg:col-span-7" delay={0.12} y={22} blur>
              <p className="text-[13px] font-medium tracking-[0.16em] text-accent uppercase">Complete series</p>
              <h1 className="mt-4 font-display text-[clamp(2.3rem,4.6vw,3.6rem)] leading-[1.02] font-semibold tracking-[-0.025em]">
                {bundle.title}
              </h1>
              <p className="mt-3 font-display text-[1.35rem] text-ink-2 italic">{bundle.subtitle}</p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-ink-2">{bundle.tagline}</p>

              <div className="mt-10 rounded-3xl bg-surface p-6 shadow-lift ring-1 ring-line sm:p-7">
                <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-4xl font-semibold tabular-nums">{formatPrice(bundle.price)}</span>
                  <span className="text-lg text-ink-3 tabular-nums line-through">{formatPrice(seriesTotal)}</span>
                  <span className="rounded-full bg-[#e6f4ec] px-2.5 py-0.5 text-sm font-medium text-success">
                    Save {formatPrice(bundleSaving)}
                  </span>
                </p>
                <div className="mt-5">
                  <BuyButton slug={bundle.slug} label="Get the series" />
                </div>
                <DeliveryNote />
              </div>

              <div className="mt-10">
                <h2 className="text-[13px] font-medium tracking-[0.14em] text-ink-3 uppercase">What’s included</h2>
                <ul className="mt-4 divide-y divide-line rounded-2xl bg-surface ring-1 ring-line">
                  {products.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/products/${p.slug}`}
                        className="group flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-paper sm:px-5"
                      >
                        <span className="w-10 shrink-0 overflow-hidden rounded-[4px] shadow-card ring-1 ring-black/10">
                          <Image src={p.cover} alt="" width={120} height={160} sizes="40px" className="block h-auto w-full" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-xs font-medium tracking-[0.12em] text-ink-3 uppercase">
                            {partLabel(p.part)}
                          </span>
                          <span className="block truncate text-[15.5px] font-medium">{p.title}</span>
                        </span>
                        <span className="text-[15px] text-ink-3 tabular-nums">{formatPrice(p.price)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Enter>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="bundle-inside"
        data-header-tone="dark"
        className="grain grain-dark relative overflow-hidden bg-night py-20 text-white md:py-28"
      >
        <Aurora tone="dark" />
        <Container className="relative">
          <Reveal>
            <p className="text-[13px] font-medium tracking-[0.16em] text-[#aebcff] uppercase">Look inside</p>
            <h2 id="bundle-inside" className="mt-4 font-display text-[clamp(1.85rem,3.3vw,2.5rem)] leading-[1.08] font-semibold">
              A real page from every playbook
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="mt-10">
            <InsideGallery items={items} />
          </Reveal>
        </Container>
      </section>

      <ContactSection />
    </>
  );
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  if (slug === bundle.slug) return <BundleDetail />;
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
