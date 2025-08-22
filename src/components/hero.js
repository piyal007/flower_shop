import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Hero({
  bgSrc = "/hero-bg.jpg",
  imageSrc = "/hero-model.png",
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src={bgSrc}
          alt="Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
          <div className="text-center lg:text-center">
            <div className="flex justify-center lg:justify-center mb-6">
              <Image src="/flowers-slider-txt-element.jpg.png.webp" alt="Flower" width={72} height={48} />
            </div>
            <h1 className={cn("text-4xl sm:text-5xl lg:text-6xl leading-tight mb-4", "[font-family:var(--font-great-vibes)]")}>
              Fresh Tulips
              <br className="hidden sm:block" />
              The Perfect Choice.
            </h1>
            <p className="text-base sm:text-lg text-foreground/80 max-w-2xl mx-auto lg:mx-0 text-center mb-8">
              A symbol of simple love, charity, paradise on earth, heavenly and reminder of the passion life.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-center">
              <a href="#shop" className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90">
                TO SHOP
              </a>
              <a href="#more" className="inline-flex items-center justify-center rounded-full border border-input bg-background text-foreground px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                VIEW MORE
              </a>
            </div>
          </div>
          <div className="relative h-[320px] sm:h-[420px] lg:h-[560px]">
            <Image
              src={imageSrc}
              alt="Hero"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}


