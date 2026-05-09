import Navbar from "@/components/Navbar";
// import Hero from "@/components/Hero";
import CredibilityStrip from "@/components/CredibilityStrip";
import WhatIDo from "@/components/WhatIDo";
import Products from "@/components/Products";
import Designs from "@/components/Designs";
import Testimonials from "@/components/Testimonials";
import Services from "@/components/Services";
import PSNote from "@/components/PSNote";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Playground from "@/components/Playground";

export default function Home() {
  return (
    <main className="bg-[#0B0F1A] min-h-screen">
      <Navbar />
      <Playground />
      {/* <Hero /> */}
      <WhatIDo />
      <CredibilityStrip />
      <Products />
      <Designs />
      <Testimonials />
      <Services />
      <PSNote />
      <Contact />
      <Footer />
    </main>
  );
}
