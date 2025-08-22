"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Pagination from "@/components/ui/pagination.js";


export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const perPage = 8;

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
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
          setProducts(data);
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

  useEffect(() => {
    function filterProducts() {
      const q = query.toLowerCase();
      const filtered = products.filter((p) =>
        (category === "all" || p.category.toLowerCase() === category.toLowerCase()) &&
        (p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
      );
      const start = (page - 1) * perPage;
      const end = start + perPage;
      setItems(filtered.slice(start, end));
      setTotal(filtered.length);
    }
    filterProducts();
  }, [query, category, page, products]);

  const totalPages = Math.max(1, Math.ceil(total / perPage));

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">

      <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-6 mb-6">
        <div className="flex-1 sm:flex-[2]">
          <label className="block text-sm font-medium mb-2 text-gray-700">Search Products</label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ed2353] focus-visible:border-[#ed2353] transition-colors"
            placeholder="Search by name or description..."
          />
        </div>
        <div className="sm:flex-1 sm:min-w-[200px]">
          <label className="block text-sm font-medium mb-2 text-gray-700">Filter by Category</label>
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ed2353] focus-visible:border-[#ed2353] transition-colors cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="rose bouquets">Rose Bouquets</option>
            <option value="tulip bouquets">Tulip Bouquets</option>
            <option value="lily arrangements">Lily Arrangements</option>
            <option value="sunflower bouquets">Sunflower Bouquets</option>
            <option value="peony arrangements">Peony Arrangements</option>
            <option value="mixed bouquets">Mixed Bouquets</option>
            <option value="herb bouquets">Herb Bouquets</option>
            <option value="orchid arrangements">Orchid Arrangements</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ed2353]"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((p) => (
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

      <div className="mt-6 flex justify-end">
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}


