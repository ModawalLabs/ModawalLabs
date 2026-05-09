import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ParticleBackground from "@/components/ParticleBackground";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shivansh Modawal — SaaS Builder & Tech Lead",
  description:
    "I help non-tech founders turn ideas into live, revenue-ready products—fast, confidently, and without hiring a full team.",
  keywords: ["SaaS", "MVP", "Full-Stack Developer", "UI/UX Designer", "Tech Lead"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full bg-[#0B0F1A] text-white antialiased">
        <CustomCursor />
        <ParticleBackground />
        {children}
      </body>
    </html>
  );
}
