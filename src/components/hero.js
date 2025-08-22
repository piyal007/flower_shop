"use client";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  {
    id: 1,
    bgSrc: "/flowers-slider-1-bg.jpg",
    imageSrc: "/flowers-slider-1-img.png.webp",
    title: "Fresh Tulips",
    subtitle: "The Perfect Choice.",
    description: "A symbol of simple love, charity, paradise on earth, heavenly and reminder of the passion life."
  },
  {
    id: 2,
    bgSrc: "/flowers-slider-2-bg-opt.jpg",
    imageSrc: "/flowers-slider-2-img.png.webp",
    title: "Beautiful Roses",
    subtitle: "Express Your Love.",
    description: "Classic elegance meets modern beauty in our stunning rose arrangements, perfect for any special occasion."
  },
  {
    id: 3,
    bgSrc: "/flowers-slider-3-bg.jpg",
    imageSrc: "/flowers-slider-3-img.png.webp",
    title: "Spring Collection",
    subtitle: "Nature's Finest.",
    description: "Discover our seasonal collection featuring the most vibrant and fresh flowers from nature's garden."
  }
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden -mt-16">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination-custom',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true
        }}
        loop={true}
        className="h-[616px] sm:h-[716px] lg:h-[650px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
              <Image
                src={slide.bgSrc}
                alt="Background"
                fill
                sizes="100vw"
                priority={slide.id === 1}
                className="object-cover"
              />
            </div>

            {/* Content Layout */}
            <div className="relative h-full pt-16">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
                <div className="relative h-full flex items-center">
                  {/* Left Content */}
                  <div className="w-full lg:w-1/2 text-center">
                    <div className="flex justify-center mb-6">
                      <Image
                        src="/flowers-slider-txt-element.jpg.png.webp"
                        alt="Flower"
                        width={72}
                        height={48}
                        style={{ height: "auto", width: "auto" }}
                      />
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6 text-[#93646a] [font-family:var(--font-great-vibes)]">
                      {slide.title}
                      <br />
                      {slide.subtitle}
                    </h1>
                    <p className="text-base sm:text-lg text-[#886c6f] max-w-md mx-auto mb-8">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Link href="/products" className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors">
                        SHOP NOW
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Image - Absolute positioned to extend to bottom */}
              <div className="absolute right-0 bottom-0 w-1/2 h-full hidden lg:block">
                <div className="relative w-full h-full flex items-end justify-end">
                  <div className="relative w-full h-[85%]">
                    <Image
                      src={slide.imageSrc}
                      alt={slide.title}
                      fill
                      sizes="50vw"
                      priority={slide.id === 1}
                      className="object-contain object-bottom"
                    />
                  </div>
                </div>
              </div>

              {/* Mobile Image */}
              <div className="lg:hidden mt-8 flex justify-center">
                <div className="relative w-full max-w-sm h-[300px]">
                  <Image
                    src={slide.imageSrc}
                    alt={slide.title}
                    fill
                    sizes="100vw"
                    priority={slide.id === 1}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group">
        <svg className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group">
        <svg className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Custom Pagination */}
      <div className="swiper-pagination-custom absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex space-x-2"></div>

      <style jsx global>{`
        .swiper-pagination-custom .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .swiper-pagination-custom .swiper-pagination-bullet-active {
          background: #ed2353;
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
}


