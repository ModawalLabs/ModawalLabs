import Hero from "@/components/home/Hero";
import Ticker from "@/components/home/Ticker";
import ProductsSection from "@/components/home/ProductsSection";
import Principles from "@/components/home/Principles";
import WorkSection from "@/components/home/WorkSection";
import AboutSection from "@/components/home/AboutSection";
import FAQSection from "@/components/home/FAQSection";
import PSNote from "@/components/home/PSNote";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <ProductsSection />
      <Principles />
      <WorkSection />
      <AboutSection />
      <FAQSection />
      <PSNote />
      <ContactSection />
    </>
  );
}
