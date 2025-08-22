import Hero from "@/components/hero";
import FeaturedSection from "@/components/featured-section";

export default function Home() {
  return (
    <div className="font-sans">
      <Hero bgSrc="/flowers-slider-3-bg.jpg" imageSrc="/flowers-slider-3-img.png.webp" />
      <FeaturedSection />
    </div>
  );
}
