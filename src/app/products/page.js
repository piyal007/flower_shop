"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import Pagination from "@/components/ui/pagination.js";

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const perPage = 8;

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const all = Array.from({ length: 24 }).map((_, i) => ({
        id: String(i + 1),
        name: `Bouquet ${i + 1}`,
        description: "A lovely hand-picked bouquet perfect for any occasion.",
        price: (29 + (i % 8) * 5).toFixed(2),
        category: i % 2 === 0 ? "tulip" : "rose",
        image: "/flowers-product-1-opt-380x513.jpg",
      }));
      const q = query.toLowerCase();
      const filtered = all.filter((p) =>
        (category === "all" || p.category === category) &&
        (p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
      );
      const start = (page - 1) * perPage;
      const end = start + perPage;
      setItems(filtered.slice(start, end));
      setTotal(filtered.length);
    }
    fetchData();
  }, [query, category, page]);

  const totalPages = Math.max(1, Math.ceil(total / perPage));

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4 sm:justify-between mb-6">
        <div className="flex-1">
          <label className="block text-sm mb-1">Search</label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="Search products..."
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Filter</label>
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="all">All</option>
            <option value="tulip">Tulip</option>
            <option value="rose">Rose</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((p) => (
          <div key={p.id} className="rounded-lg border overflow-hidden">
            <div className="relative aspect-[3/4]">
              <Image src={p.image} alt={p.name} fill className="object-cover" />
            </div>
            <div className="p-4 space-y-1">
              <h3 className="text-base font-semibold">{p.name}</h3>
              <p className="text-sm text-foreground/70">{p.description}</p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-medium">${p.price}</span>
                <Link className="text-sm text-primary hover:underline" href={`/products/${p.id}`}>Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <Pagination page={page} totalPages={totalPages} />
      </div>
    </div>
  );
}


