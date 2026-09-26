import { bundle, bundleSaving } from "@/lib/products";
import { site } from "@/lib/site";

export const faqs = [
  {
    q: "Who are these playbooks for?",
    a: "Non-technical founders and first-time builders who want to launch a SaaS without guessing at the big decisions: choosing a stack, picking tools, hiring a developer, pricing, handling the basic legal documents and launching.",
  },
  {
    q: "Do I need technical skills?",
    a: "No. Everything is written in plain English. Where a technical decision matters, you get a clear recommendation and the reasoning behind it, not jargon.",
  },
  {
    q: "What exactly do I get?",
    a: "A ZIP file with the interactive playbook (an HTML file that opens in any browser and works offline), a start-here guide and your licence. Where a playbook has several tools, each one is its own file.",
  },
  {
    q: "Can I buy just one playbook?",
    a: `Yes. Every playbook stands on its own. If you want the full path, the complete series is $${bundle.price}, which is $${bundleSaving} less than buying all seven separately.`,
  },
  {
    q: "How do I get the files?",
    a: `Instantly. Press Buy on any playbook and the ZIP downloads straight to your device, no account needed. If anything goes wrong, email ${site.email} and I will send it to you.`,
  },
  {
    q: "Is the legal playbook legal advice?",
    a: "No. Legal & Legal-ish gives you templates, prompts and checklists for first drafts. Always have a qualified lawyer review legal documents before you publish or sign them.",
  },
] as const;
