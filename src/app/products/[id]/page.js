import Image from "next/image";

export default function ProductDetail({ params }) {
  const { id } = params;
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-[3/4]">
          <Image src="/flowers-product-1-opt-380x513.jpg" alt={`Product ${id}`} fill className="object-cover" />
        </div>
        <div>
          <div className="text-sm text-foreground/60">Product #{id}</div>
          <h1 className="mt-1 text-2xl font-semibold">Bouquet {id}</h1>
          <p className="mt-2 text-foreground/70">A lovely hand-picked bouquet perfect for any occasion.</p>
          <div className="mt-4 text-lg font-medium">$49.00</div>
        </div>
      </div>
    </div>
  );
}


