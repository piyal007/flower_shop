import Image from "next/image";
import Link from "next/link";

export default function Hero({
  bgSrc = "/hero-bg.jpg",
  imageSrc = "/hero-model.png",
}) {
  return (
    <section className="relative overflow-hidden -mt-16 pt-16">
      <div className="absolute inset-0 -z-10">
        <Image
          src={bgSrc}
          alt="Background"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
          <div className="text-center lg:text-center">
            <div className="flex justify-center lg:justify-center py-6">
              <Image src="/flowers-slider-txt-element.jpg.png.webp" alt="Flower" width={72} height={48} style={{ height: "auto", width: "auto" }} />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight mb-4 text-[#93646a] [font-family:var(--font-great-vibes)]">
              Fresh Tulips
              <br className="hidden sm:block" />
              The Perfect Choice.
            </h1>
            <p className="text-base sm:text-lg text-[#886c6f] max-w-2xl mx-auto lg:mx-0 text-center mb-8">
              A symbol of simple love, charity, paradise on earth, heavenly and reminder of the passion life.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-center">
              <Link href="/products" className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors">
                SHOP NOW
              </Link>
            </div>
          </div>
          <div className="relative h-[320px] sm:h-[420px] lg:h-[560px]">
            <Image
              src={imageSrc}
              alt="Hero"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}


