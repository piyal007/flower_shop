"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function FeaturedSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from API
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          // Get only first 4 products for featured section
          setProducts(data.slice(0, 4));
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-2 text-primary text-lg [font-family:var(--font-great-vibes)]">Fresh flowers.</div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#363636]">Featured Products</h2>
          <p className="mt-3 text-foreground/70">Discover our most popular flower arrangements</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12 mt-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ed2353]"></div>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div key={p.id} className="rounded-lg border overflow-hidden bg-white shadow-sm flex flex-col">
                <div className="relative aspect-[1/1] bg-gray-50">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-contain"
                  />
                </div>
                <div className="p-4 flex flex-col min-h-[180px]">
                  <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-1">{p.name}</h3>
                  <p className="text-sm text-gray-600 leading-5 mb-3 line-clamp-2 flex-grow">{p.description}</p>
                  <div className="text-lg font-bold text-gray-900 mb-3">${p.price}</div>
                  <Link 
                    href={`/products/${p.id}`}
                    className="block w-full bg-primary text-primary-foreground text-center py-2.5 px-4 rounded-md font-medium hover:bg-primary/90 transition-colors mt-auto"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


