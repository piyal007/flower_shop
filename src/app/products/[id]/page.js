import Image from "next/image";
import Link from "next/link";

export default function ProductDetail({ params }) {
  const { id } = params;
  const name = `Bouquet ${id}`;
  const description = "A lovely hand-picked bouquet perfect for any occasion. Freshly arranged with seasonal flowers and wrapped with care.";
  const details = [
    "Hand-tied arrangement",
    "Includes gift card",
    "Same-day delivery available",
    "Sustainably sourced flowers",
  ];
  const price = (49).toFixed(2);
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:items-center">
        <div className="relative w-full h-[360px] sm:h-[480px] md:h-[520px]">
          <Image src="/flowers-product-1-opt-380x513.jpg" alt={name} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-contain rounded-md" />
        </div>
        <div className="md:self-center">
          <div className="text-sm text-foreground/60">SKU: FS-{id}</div>
          <h1 className="mt-1 text-3xl font-semibold">{name}</h1>
          <div className="mt-3 text-lg font-medium">${price}</div>
          <p className="mt-4 text-foreground/80">{description}</p>
          <ul className="mt-4 list-disc pl-5 text-sm text-foreground/70 space-y-1">
            {details.map((d, i) => (<li key={i}>{d}</li>))}
          </ul>
          <div className="mt-6 flex gap-3">
            <button className="rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90">Buy Now</button>
            <Link href="/products" className="rounded-full border border-input bg-background px-6 py-3 text-sm hover:bg-accent hover:text-accent-foreground">Back to products</Link>
          </div>
        </div>
      </div>
    </div>
  );
}


