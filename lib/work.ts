export type WorkImage = { src: string; width: number; height: number; alt: string };

export type WorkVideo = {
  src: string;
  poster: string;
  title: string;
  hasAudio: boolean;
};

export type WorkItem = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  points: string[];
  brand: string;
  video?: WorkVideo;
  images: WorkImage[];
};

export const work: WorkItem[] = [
  {
    slug: "primux",
    name: "Primux",
    tagline: "The first light of every contract.",
    description:
      "An AI contract-lifecycle platform for law firms and in-house legal teams, covering drafting, review, signing, obligations and renewals.",
    tags: ["Legal tech", "Explainer video"],
    points: [
      "Every clause checked against the firm’s own playbook",
      "Deadlines and renewal windows surfaced before they close",
      "Ben, an AI colleague who has read every contract",
    ],
    brand: "#A87B3C",
    video: {
      src: "/work/primux-explainer.mp4",
      poster: "/work/primux-explainer-poster.webp",
      title: "Primux product explainer (30 seconds)",
      hasAudio: true,
    },
    images: [],
  },
  {
    slug: "vyral",
    name: "Vyral",
    tagline: "Stop prompting. Start directing.",
    description:
      "An AI video-generation platform. Describe an idea and Vyral’s AI director plans the shoot, scripts every beat and renders a finished, on-brand video.",
    tags: ["AI video", "Landing page", "Explainer video"],
    points: [
      "An AI director that turns one prompt into a shot-by-shot plan",
      "The right generation model for each scene",
      "Publish to every platform from one place",
    ],
    brand: "#8B6BFF",
    video: {
      src: "/work/vyral-explainer.mp4",
      poster: "/work/vyral-explainer-poster.webp",
      title: "Vyral product explainer (30 seconds)",
      hasAudio: false,
    },
    images: [
      {
        src: "/work/vyral-hero.webp",
        width: 2880,
        height: 1800,
        alt: "Vyral landing page hero: “Stop prompting. Start directing.” over a motocross video, with a prompt box.",
      },
      {
        src: "/work/vyral-cinematic.webp",
        width: 2880,
        height: 1800,
        alt: "Vyral landing page slider: “Cinematic by Default”, a close-up portrait lit by sparks.",
      },
    ],
  },
  {
    slug: "snapi",
    name: "Snapi",
    tagline: "Found, not searched.",
    description:
      "An AI personal-shopping concierge. Snap it, say it or describe it, and Snapi searches boutiques and vetted resellers, compares the full delivered price and tells you whether to buy now or wait.",
    tags: ["AI shopping", "Landing page"],
    points: [
      "Search by photo, voice or a plain-English description",
      "Honest, all-in pricing across boutiques and resellers",
      "A buy-or-wait verdict instead of a list of links",
    ],
    brand: "#9A7424",
    images: [
      {
        src: "/work/snapi-hero.webp",
        width: 2854,
        height: 1800,
        alt: "Snapi landing page hero: “Found, not searched.” with a personal-shopper prompt reading “A watch under $2,000”.",
      },
      {
        src: "/work/snapi-editions.webp",
        width: 2854,
        height: 1800,
        alt: "Snapi landing page: “One concierge. Two registers.” with two editorial photo panels.",
      },
      {
        src: "/work/snapi-steps.webp",
        width: 2854,
        height: 1800,
        alt: "Snapi landing page: “Four steps. Snapi does the middle two.” with numbered steps beside a photograph.",
      },
    ],
  },
];
