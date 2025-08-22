import Image from "next/image";

function ProductCard({ src, title = "Tulip Bouquet", price = "$49.00" }) {
  return (
    <div className="group rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
      <div className="relative aspect-[3/4] w-full">
        <Image src={src} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-base font-medium text-foreground/90 group-hover:text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-foreground/70">{price}</p>
      </div>
    </div>
  );
}

export default function FeaturedSection() {
  const products = [
    { src: "/flowers-product-1-opt-380x513.jpg" },
    { src: "/flowers-product-1-opt-380x513.jpg" },
    { src: "/flowers-product-1-opt-380x513.jpg" },
    { src: "/flowers-product-1-opt-380x513.jpg" },
  ];

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-2 text-primary text-lg [font-family:var(--font-great-vibes)]">Wooden accessories.</div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#363636]">Featured Products</h2>
          <p className="mt-3 text-foreground/70">It is a long established fact that a reader will be distracted</p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <ProductCard key={i} src={p.src} />
          ))}
        </div>
      </div>
    </section>
  );
}


