// The Road to MVP catalog. Everything the storefront shows (and later, what checkout
// sells) comes from here. Buy buttons lead to /download/<slug> (see lib/downloads.ts);
// `status` and `checkoutUrl` are reserved for the paywall.

export type ProductStatus = "coming-soon" | "available";

export type Preview = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

export type Stat = { value: string; label: string };

export type Product = {
  slug: string;
  part: number;
  title: string;
  subtitle: string;
  tagline: string;
  price: number;
  cover: string;
  accent: string;
  stats: Stat[];
  learn: string[];
  includes: string[];
  preview: Preview;
  status: ProductStatus;
  checkoutUrl?: string;
};

export const COVER_SIZE = { width: 1200, height: 1600 } as const;

export const products: Product[] = [
  {
    slug: "choose-your-stack",
    part: 1,
    title: "Choose Your Stack",
    subtitle: "The no-code vs. code decision framework",
    tagline:
      "Stop Googling. Use this one framework to decide exactly what you need to build, and what you don’t.",
    price: 19,
    cover: "/products/covers/choose-your-stack.webp",
    accent: "#C9960D",
    stats: [
      { value: "3", label: "Questions" },
      { value: "~10", label: "Minutes" },
      { value: "3", label: "Tools" },
    ],
    learn: [
      "The 3 types of SaaS products and which technical approach fits each one, so you stop wasting money on custom code when a $29/mo tool could do the job",
      "How to map your idea to a stack in under 10 minutes using the SaaS Type Classifier",
      "When no-code will actually hurt you: the 4 signals your idea genuinely needs a developer",
      "What a real MVP costs at each tier, with actual budget ranges instead of estimates pulled from thin air",
      "The “minimum lovable product” checklist: what to include, what to cut, and why shipping ugly beats perfecting forever",
    ],
    includes: ["SaaS Type Classifier (fillable)", "MVP Budget Calculator", "Stack Decision Tree"],
    preview: {
      src: "/products/previews/choose-your-stack-classifier.webp",
      width: 1880,
      height: 1176,
      alt: "The SaaS Type Classifier, asking what kind of problem your SaaS solves, with four scored answers.",
      caption: "The SaaS Type Classifier: answer three questions and get your stack, approach and budget.",
    },
    status: "available",
  },
  {
    slug: "build-without-burning-cash",
    part: 2,
    title: "Build Without Burning Cash",
    subtitle: "20 tools that actually work",
    tagline:
      "A curated, opinionated tool stack: ranked by category, annotated with real use cases, and priced honestly.",
    price: 25,
    cover: "/products/covers/build-without-burning-cash.webp",
    accent: "#E8B84B",
    stats: [
      { value: "20", label: "Tools" },
      { value: "$0", label: "To start" },
      { value: "5", label: "Categories" },
    ],
    learn: [
      "The 20 tools a senior developer would actually recommend, organised into 5 categories (build, payments, auth, analytics, support) with clear “use this if…” guidance",
      "How to avoid the tool-switching trap: which free plans are actually generous, which ones lock you in, and which have hidden costs that kill margins",
      "The exact stack for a solo founder launching a $49/mo SaaS with less than $200/month in tool spend",
      "Why most founders overpay for databases, and the $0 option that handles most early SaaS use cases",
      "The “good enough” principle: what to use at each stage of growth (0–100, 100–1,000, 1,000+ users)",
    ],
    includes: ["Tool Stack Comparison Table", "Pricing breakdown per tier", "Category cheat sheet"],
    preview: {
      src: "/products/previews/build-without-burning-cash-tools.webp",
      width: 2200,
      height: 1376,
      alt: "A grid of tool cards (Bubble, Next.js, Glide, Webflow, Supabase Auth and Clerk), each with pricing and a “use if” note.",
      caption: "All 20 tools, each with honest pricing and a clear “use this if…”.",
    },
    status: "available",
  },
  {
    slug: "hire-right-the-first-time",
    part: 3,
    title: "Hire Right the First Time",
    subtitle: "Find & vet developers without being technical",
    tagline:
      "The exact process for finding, interviewing, and onboarding a developer when you have no idea what questions to ask.",
    price: 29,
    cover: "/products/covers/hire-right-the-first-time.webp",
    accent: "#E8955A",
    stats: [
      { value: "10", label: "Interview questions" },
      { value: "19", label: "Red flags" },
      { value: "4", label: "Tools" },
    ],
    learn: [
      "Where the best freelance developers actually are, and which platforms are worth your time at each budget level",
      "10 interview questions that reveal if a developer is actually good, without needing to understand code yourself",
      "The 19 red flags to watch for, and when to walk away no matter how cheap the quote is",
      "How to write a project brief that gets you accurate quotes, including a one-page template used to spec real client projects",
      "Contract basics: what to include, what hourly vs. project pricing means for you, and how to protect your IP before a line of code is written",
    ],
    includes: [
      "10 Interview Questions (copy-paste)",
      "1-Page Project Brief Template",
      "Platform Comparison Guide",
      "Red Flag Checklist",
    ],
    preview: {
      src: "/products/previews/hire-right-interview-questions.webp",
      width: 2096,
      height: 1310,
      alt: "Two interview-question cards, each listing what to listen for and the red-flag answer, with a copy button.",
      caption: "Ten interview questions, each with what to listen for and the red-flag answer.",
    },
    status: "available",
  },
  {
    slug: "ai-as-your-co-founder",
    part: 4,
    title: "AI as Your Co-Founder",
    subtitle: "50 prompts to build your SaaS faster",
    tagline:
      "Not generic ChatGPT tips. Engineered prompts for the exact decisions a non-technical founder faces building a SaaS.",
    price: 22,
    cover: "/products/covers/ai-as-your-co-founder.webp",
    accent: "#A855F7",
    stats: [
      { value: "50", label: "Prompts" },
      { value: "7", label: "Categories" },
      { value: "3", label: "AI models" },
    ],
    learn: [
      "How to use AI to write a technical spec so thorough that any developer can quote it, without you knowing a line of code",
      "Prompts for idea validation, competitor analysis, feature prioritisation, pricing model testing and user personas",
      "How to use AI to review developer proposals and flag red flags in contracts",
      "The “rubber duck method”: prompts for debugging your own thinking when you’re stuck or about to make an expensive mistake",
      "Copy-ready prompts for your Terms of Service, Privacy Policy, onboarding emails and landing page, grouped by category",
    ],
    includes: [
      "50 copy-paste prompts (7 categories)",
      "AI Spec Doc Generator prompt",
      "Works with ChatGPT, Claude and Gemini",
    ],
    preview: {
      src: "/products/previews/ai-as-your-co-founder-prompts.webp",
      width: 2240,
      height: 1400,
      alt: "The prompt library: a category sidebar and copy-ready prompt cards such as “Validate your idea in 5 minutes”.",
      caption: "The prompt library: 50 copy-paste prompts across seven categories.",
    },
    status: "available",
  },
  {
    slug: "get-paid-before-you-launch",
    part: 5,
    title: "Get Paid Before You Launch",
    subtitle: "Pricing, Stripe & your first customer",
    tagline:
      "How to set up payments in a day, price your product correctly, and collect money before the product is even finished.",
    price: 35,
    cover: "/products/covers/get-paid-before-you-launch.webp",
    accent: "#86EFAC",
    stats: [
      { value: "5", label: "Pricing models" },
      { value: "30", label: "Stripe tasks" },
      { value: "3", label: "Email templates" },
    ],
    learn: [
      "The SaaS pricing models explained in plain English, with a decision framework for which one fits your product, market and margins",
      "How to set up Stripe step by step: subscriptions, free trials, upgrades and downgrades, and tax",
      "The pre-launch “pay now, use later” playbook: how to collect founding-member payments before your product is built",
      "Exactly what to say in a customer discovery call to validate your pricing, including a 10-question script",
      "Churn prevention from day one: the 3 onboarding emails to send in the first 7 days",
    ],
    includes: [
      "Pricing Model Decision Tool",
      "10-Question Discovery Script",
      "Stripe Setup Checklist",
      "3 Onboarding Email Templates",
    ],
    preview: {
      src: "/products/previews/get-paid-pricing-quiz.webp",
      width: 2160,
      height: 1350,
      alt: "The pricing model decision tool: multiple-choice questions about your product next to a recommended-model panel.",
      caption: "The pricing model decision tool: answer six questions, get a recommended model.",
    },
    status: "available",
  },
  {
    slug: "legal-and-legal-ish",
    part: 6,
    title: "Legal & Legal-ish",
    subtitle: "The 4 docs every SaaS needs on day one",
    tagline:
      "Not a lawyer, and not legal advice. Just the 4 documents that save you from the most common, and most expensive, early-stage mistakes.",
    price: 29,
    cover: "/products/covers/legal-and-legal-ish.webp",
    accent: "#FCA5A5",
    stats: [
      { value: "4", label: "Legal docs" },
      { value: "7", label: "IP clauses" },
      { value: "38", label: "Review items" },
    ],
    learn: [
      "The 4 non-negotiable docs (Terms of Service, Privacy Policy, Contractor Agreement and a basic IP Assignment) and what goes in each",
      "How to use AI to generate a first draft of each document, and the clauses you must review manually before publishing",
      "How to write a privacy policy that builds trust instead of scaring people away",
      "How to structure a contractor agreement so everything your developer builds is legally yours from day one",
      "GDPR, CCPA and US data law in plain English, and when it’s time to get an actual lawyer",
    ],
    includes: [
      "4 AI prompt templates (legal docs)",
      "IP Assignment Clause Template",
      "Privacy Policy Review Checklist",
    ],
    preview: {
      src: "/products/previews/legal-prompt-templates.webp",
      width: 2200,
      height: 1332,
      alt: "Prompt templates for Terms of Service, Privacy Policy, Contractor Agreement and Refund Policy, with a note on when to get a real lawyer.",
      caption: "Prompt templates for each document, plus when to get a real lawyer.",
    },
    status: "available",
  },
  {
    slug: "launch-week-playbook",
    part: 7,
    title: "Launch Week Playbook",
    subtitle: "30 tasks in the right order",
    tagline:
      "The exact launch sequence, day by day and task by task, so nothing falls through the cracks and you actually ship.",
    price: 19,
    cover: "/products/covers/launch-week-playbook.webp",
    accent: "#A3E635",
    stats: [
      { value: "30", label: "Launch tasks" },
      { value: "7", label: "Post templates" },
      { value: "7", label: "Days tracked" },
    ],
    learn: [
      "The 7-day pre-launch checklist, from final QA to email sequences to payment testing",
      "Where to announce your launch: the platforms, posts and communities that move the needle for a new SaaS",
      "How to handle your first 10 customers with manual onboarding that creates fans and catches bugs early",
      "The 3 numbers to watch in week one that tell you if you have a real product or a real problem",
      "What to do if nobody buys: a 3-day diagnosis that separates a messaging problem from a product problem",
    ],
    includes: [
      "30-Task Launch Checklist",
      "Launch Day Post Templates",
      "Week 1 Metrics Tracker",
      "No-Sales Diagnosis Framework",
    ],
    preview: {
      src: "/products/previews/launch-week-checklist.webp",
      width: 2176,
      height: 1360,
      alt: "The launch checklist: tasks grouped by days before launch, with a progress panel and a copy-checklist button.",
      caption: "The 30-task launch checklist, grouped by the days before launch.",
    },
    status: "available",
  },
];

export const bundle = {
  slug: "road-to-mvp-bundle",
  title: "The Road to MVP",
  subtitle: "All seven playbooks in one download",
  tagline:
    "Everything a non-technical founder needs to go from idea to live product without learning to code, getting ripped off, or wasting six months.",
  price: 99,
  cover: "/products/covers/road-to-mvp-bundle.webp",
  status: "available" as ProductStatus,
  checkoutUrl: undefined as string | undefined,
};

export const seriesTotal = products.reduce((sum, p) => sum + p.price, 0);
export const bundleSaving = seriesTotal - bundle.price;
export const lowestPrice = Math.min(...products.map((p) => p.price));

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(amount: number) {
  return `$${amount}`;
}

export function partLabel(part: number) {
  return `Part ${String(part).padStart(2, "0")}`;
}
