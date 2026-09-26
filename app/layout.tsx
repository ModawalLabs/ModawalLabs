import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { MotionProvider } from "@/components/motion/primitives";
import { site } from "@/lib/site";

// One clean grotesque family for everything: headlines, UI and body.
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const title = "ModawalLabs · Practical playbooks for non-technical founders";

export const metadata: Metadata = {
  title: { default: title, template: "%s · ModawalLabs" },
  description: site.description,
  keywords: ["SaaS", "MVP", "non-technical founder", "startup playbook", "no-code", "hire a developer", "SaaS pricing"],
  authors: [{ name: site.owner, url: site.links.linkedin }],
  creator: site.owner,
  openGraph: {
    type: "website",
    siteName: site.name,
    title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#faf9f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={hanken.variable}>
      <body className="min-h-dvh bg-paper font-sans text-ink">
        {/* Without JavaScript, scroll reveals never run: show their content as-is. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: "<style>[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}</style>",
          }}
        />
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-sm text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          <main id="main" className="pt-16">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
