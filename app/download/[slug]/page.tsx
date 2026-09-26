import type { Metadata } from "next";
import Link from "next/link";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { notFound } from "next/navigation";
import { ArrowRight, FileText, FolderArchive, Globe, Mail, MousePointerClick } from "lucide-react";
import Container from "@/components/ui/Container";
import Aurora from "@/components/ui/Aurora";
import Cover from "@/components/product/Cover";
import AutoDownload from "@/components/product/AutoDownload";
import Enter from "@/components/motion/Enter";
import { downloadFilePath, formatBytes, getPackage, type Manifest } from "@/lib/downloads";
import { bundle, formatPrice, partLabel } from "@/lib/products";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your download",
  robots: { index: false, follow: false },
};

async function readManifest(): Promise<Manifest | null> {
  try {
    const raw = await readFile(join(process.cwd(), "private", "downloads", "manifest.json"), "utf8");
    return JSON.parse(raw) as Manifest;
  } catch {
    return null;
  }
}

const steps = [
  { Icon: FolderArchive, title: "Unzip the folder", text: "Keep the files together; the guide links to each playbook." },
  { Icon: Globe, title: "Open Start here.html", text: "It opens in your browser and works offline, on any computer." },
  {
    Icon: MousePointerClick,
    title: "Work through it",
    text: "Answer the quizzes, tick the checklists and copy the scripts straight into your tools.",
  },
];

export default async function DownloadPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) notFound();

  const manifest = await readManifest();
  const entry = manifest?.packages[slug];
  const product = pkg.isBundle ? null : pkg.products[0];
  const cover = product ? product.cover : bundle.cover;
  const eyebrow = pkg.isBundle ? "The complete series" : `Road to MVP · ${partLabel(pkg.products[0].part)}`;

  const contents =
    entry?.files.map((f) => ({ name: f.name, size: formatBytes(f.bytes), kind: f.kind })) ??
    [
      { name: "Start here.html", size: "", kind: "guide" as const },
      ...pkg.files.map((f) => ({ name: f.name, size: "", kind: "html" as const })),
      { name: "README.txt", size: "", kind: "text" as const },
      { name: "LICENSE.txt", size: "", kind: "text" as const },
    ];

  return (
    <>
      <section className="grain relative overflow-hidden pt-10 pb-20 [--grain:0.04] md:pt-16 md:pb-28">
        <Aurora className="opacity-80" />
        <Container className="relative grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Enter y={20} blur>
              <div className="rounded-3xl bg-[linear-gradient(180deg,#ffffff_0%,#f3f1ec_100%)] p-8 shadow-[inset_0_1px_0_#fff] ring-1 ring-line/80 sm:p-10">
                <Cover
                  src={cover}
                  alt={`${pkg.title} cover`}
                  sizes="(min-width: 1024px) 320px, 70vw"
                  eager
                  className="mx-auto max-w-[17rem]"
                />
              </div>
            </Enter>
          </div>

          <div className="lg:col-span-8">
            <Enter y={24} blur>
              <p className="text-[13px] font-medium tracking-[0.16em] text-accent uppercase">{eyebrow}</p>
            </Enter>
            <Enter delay={0.08} y={24} blur>
              <h1 className="mt-4 font-display text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[1.03] font-semibold tracking-[-0.025em] text-balance">
                {entry ? "Your playbook is ready." : "Almost ready."}
              </h1>
            </Enter>
            <Enter delay={0.16} y={24} blur>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
                Thank you for getting <span className="font-medium text-ink">{pkg.title}</span>. Everything is in
                one ZIP.
              </p>
            </Enter>
            <Enter delay={0.24} y={24} blur className="mt-8">
              <AutoDownload
                href={downloadFilePath(slug)}
                zipName={pkg.zipName}
                size={entry ? formatBytes(entry.bytes) : undefined}
                available={Boolean(entry)}
              />
            </Enter>

            <Enter delay={0.32} y={24} blur className="mt-10">
              <h2 className="text-[13px] font-medium tracking-[0.14em] text-ink-3 uppercase">What’s inside</h2>
              <ul className="mt-4 divide-y divide-line rounded-2xl bg-surface ring-1 ring-line">
                {contents.map((file) => (
                  <li key={file.name} className="flex items-center gap-3 px-4 py-3 text-[14.5px] sm:px-5">
                    <FileText className="size-4 shrink-0 text-ink-3" aria-hidden="true" />
                    <span className="min-w-0 flex-1 truncate">{file.name}</span>
                    {file.kind === "html" && (
                      <span className="hidden rounded-full bg-accent-soft px-2 py-0.5 text-[11.5px] font-medium text-accent-ink sm:inline">
                        interactive
                      </span>
                    )}
                    {file.size && <span className="text-[13px] text-ink-3 tabular-nums">{file.size}</span>}
                  </li>
                ))}
              </ul>
            </Enter>

            <Enter delay={0.4} y={24} blur className="mt-10">
              <h2 className="text-[13px] font-medium tracking-[0.14em] text-ink-3 uppercase">How to use it</h2>
              <ol className="mt-4 grid gap-3 sm:grid-cols-3">
                {steps.map(({ Icon, title, text }) => (
                  <li key={title} className="rounded-2xl bg-surface p-5 ring-1 ring-line">
                    <span className="inline-flex size-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <p className="mt-3 text-[15px] font-semibold tracking-tight">{title}</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-ink-2">{text}</p>
                  </li>
                ))}
              </ol>
            </Enter>

            <Enter
              delay={0.48}
              y={24}
              blur
              className="mt-10 flex flex-col gap-4 rounded-2xl border border-dashed border-line-2 bg-surface/60 p-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="text-[15px] text-ink-2">
                Problem with the file? Email{" "}
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1 font-medium text-accent">
                  <Mail className="size-4" aria-hidden="true" />
                  {site.email}
                </a>
              </p>
              {pkg.isBundle ? (
                <Link href="/products" className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-accent">
                  Browse the playbooks
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              ) : (
                <Link
                  href={`/products/${bundle.slug}`}
                  className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-accent"
                >
                  Get all seven for {formatPrice(bundle.price)}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              )}
            </Enter>
          </div>
        </Container>
      </section>
    </>
  );
}
