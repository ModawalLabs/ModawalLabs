// What a buyer receives for each product. The build script (`npm run downloads`) turns
// these definitions into ZIP files under private/downloads/, and the download route and
// page read them back. Product files never live in the public repo.

// The explicit extension lets Node run scripts/build-downloads.mts against this file directly.
import { bundle, products, type Product } from "./products.ts";

export type PackageFile = {
  /** File name inside the kit source folder. */
  src: string;
  /** File name inside the ZIP. */
  name: string;
  /** What the buyer sees in the guide and on the download page. */
  label: string;
};

export type DownloadPackage = {
  slug: string;
  /** Short name used in guides, e.g. "Choose Your Stack". */
  title: string;
  /** Folder at the top of the ZIP, and the ZIP's own name. */
  folder: string;
  zipName: string;
  files: PackageFile[];
  /** The products the package contains: one, or all seven for the series. */
  products: Product[];
  isBundle: boolean;
};

const KIT_FILES: Record<string, PackageFile[]> = {
  "choose-your-stack": [
    {
      src: "section01-saas-type-classifier.html",
      name: "01a SaaS Type Classifier.html",
      label: "SaaS Type Classifier, the 3-question quiz that names your stack, approach and budget",
    },
    {
      src: "section01-budget-stack.html",
      name: "01b MVP Budget Calculator.html",
      label: "MVP Budget Calculator and Stack Decision Tree",
    },
  ],
  "build-without-burning-cash": [
    {
      src: "section02-tool-stack.html",
      name: "02 Build Without Burning Cash.html",
      label: "Tool comparison table, pricing by tier and the category cheat sheet",
    },
  ],
  "hire-right-the-first-time": [
    {
      src: "section03-hire-a-dev.html",
      name: "03 Hire Right the First Time.html",
      label: "10 interview questions, the project brief template, platform comparison and red-flag checklist",
    },
  ],
  "ai-as-your-co-founder": [
    {
      src: "section04-ai-prompts.html",
      name: "04 AI as Your Co-Founder.html",
      label: "The 50-prompt library, the spec document generator and the model guide",
    },
  ],
  "get-paid-before-you-launch": [
    {
      src: "section05-get-paid.html",
      name: "05 Get Paid Before You Launch.html",
      label: "Pricing model tool, discovery script, Stripe checklist and onboarding email templates",
    },
  ],
  "legal-and-legal-ish": [
    {
      src: "section06-legal-docs.html",
      name: "06 Legal and Legal-ish.html",
      label: "AI prompt templates for the 4 documents, IP assignment clause and privacy checklist",
    },
  ],
  "launch-week-playbook": [
    {
      src: "section07-launch-week.html",
      name: "07 Launch Week Playbook.html",
      label: "30-task launch checklist, post templates, metrics tracker and no-sales diagnosis",
    },
  ],
};

function partNumber(product: Product) {
  return String(product.part).padStart(2, "0");
}

const productPackages: DownloadPackage[] = products.map((product) => {
  const folder = `Road to MVP ${partNumber(product)} - ${product.title}`;
  return {
    slug: product.slug,
    title: product.title,
    folder,
    zipName: `${folder}.zip`,
    files: KIT_FILES[product.slug] ?? [],
    products: [product],
    isBundle: false,
  };
});

const bundlePackage: DownloadPackage = {
  slug: bundle.slug,
  title: bundle.title,
  folder: "Road to MVP - Complete Series",
  zipName: "Road to MVP - Complete Series.zip",
  files: products.flatMap((p) => KIT_FILES[p.slug] ?? []),
  products: [...products],
  isBundle: true,
};

export const packages: DownloadPackage[] = [...productPackages, bundlePackage];

export function getPackage(slug: string) {
  return packages.find((p) => p.slug === slug);
}

/** Where a product's Buy button sends people. The paywall will replace this with checkout. */
export function downloadPagePath(slug: string) {
  return `/download/${slug}`;
}

export function downloadFilePath(slug: string) {
  return `/api/download/${slug}`;
}

export type ManifestFile = { name: string; bytes: number; kind: "html" | "guide" | "text" };
export type ManifestEntry = { zipName: string; bytes: number; builtAt: string; files: ManifestFile[] };
export type Manifest = { builtAt: string; packages: Record<string, ManifestEntry> };

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
