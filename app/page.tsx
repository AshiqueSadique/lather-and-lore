import Hero from "@/components/hero/Hero";
import IngredientsRibbon from "@/components/sections/IngredientsRibbon";
import TheProcess from "@/components/sections/TheProcess";
import ProductCollection from "@/components/sections/ProductCollection";
import Testimonials from "@/components/sections/Testimonials";
import FounderStory from "@/components/sections/FounderStory";
import Newsletter from "@/components/sections/Newsletter";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main id="main-content">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[999] focus:bg-cream focus:text-charcoal focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to main content
      </a>

      <Hero />
      <IngredientsRibbon />
      <TheProcess />
      <ProductCollection />
      <Testimonials />
      <FounderStory />
      <Newsletter />
      <Footer />
    </main>
  );
}
