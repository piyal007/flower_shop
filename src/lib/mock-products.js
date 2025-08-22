export const PRODUCTS = Array.from({ length: 24 }).map((_, i) => ({
  id: String(i + 1),
  name: `Bouquet ${i + 1}`,
  description: "A lovely hand-picked bouquet perfect for any occasion.",
  price: (29 + (i % 8) * 5).toFixed(2),
  category: i % 2 === 0 ? "tulip" : "rose",
  image: "/flowers-product-1-opt-380x513.jpg",
  longDescription: `This beautiful ${i % 2 === 0 ? "tulip" : "rose"} bouquet is carefully crafted with the finest seasonal flowers. Each arrangement is hand-tied by our expert florists and comes with a personalized gift card. Perfect for birthdays, anniversaries, or just to brighten someone's day.`,
  inStock: true,
  rating: 4.5 + (i % 5) * 0.1,
  reviews: 15 + (i % 20),
}));

export function filterProducts({ query = "", category = "all" }, page = 1, perPage = 8) {
  const q = query.toLowerCase();
  const filtered = PRODUCTS.filter((p) =>
    (category === "all" || p.category === category) &&
    (p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
  );
  const total = filtered.length;
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return { items: filtered.slice(start, end), total };
}


