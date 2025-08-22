// Mock product data
export const mockProducts = [
  {
    id: 1,
    name: "Red Rose Bouquet",
    description: "Classic red roses arranged in a beautiful bouquet, perfect for expressing love and romance",
    price: 89.99,
    image: "/flowers-product-1.jpg",
    category: "Rose Bouquets",
    inStock: true,
    stock: 15,
    createdAt: "2024-01-15T10:30:00Z",
    features: [
      "12 premium red roses",
      "Hand-tied arrangement",
      "Includes gift wrapping",
      "Same-day delivery available"
    ]
  },
  {
    id: 2,
    name: "Spring Tulip Mix",
    description: "Vibrant mixed tulips bringing the freshness of spring to any occasion",
    price: 65.99,
    image: "/flowers-product-2.jpg",
    category: "Tulip Bouquets",
    inStock: true,
    stock: 22,
    createdAt: "2024-02-08T14:15:00Z",
    features: [
      "15 mixed color tulips",
      "Seasonal spring flowers",
      "Fresh from Holland",
      "Long-lasting blooms"
    ]
  },
  {
    id: 3,
    name: "Elegant White Lilies",
    description: "Pure white lilies symbolizing peace and tranquility, ideal for special moments",
    price: 75.99,
    image: "/flowers-product-3.jpg",
    category: "Lily Arrangements",
    inStock: false,
    stock: 0,
    createdAt: "2024-01-22T09:45:00Z",
    features: [
      "8 white oriental lilies",
      "Sophisticated arrangement",
      "Perfect for sympathy",
      "Fragrant blooms"
    ]
  },
  {
    id: 4,
    name: "Sunflower Delight",
    description: "Bright and cheerful sunflowers that bring sunshine to any day",
    price: 55.99,
    image: "/flowers-product-4.jpg",
    category: "Sunflower Bouquets",
    inStock: true,
    stock: 18,
    createdAt: "2024-03-05T16:20:00Z",
    features: [
      "6 large sunflowers",
      "Rustic charm design",
      "Perfect for fall season",
      "Cheerful and bright"
    ]
  },
  {
    id: 5,
    name: "Pink Peony Paradise",
    description: "Luxurious pink peonies creating an enchanting and romantic display",
    price: 125.99,
    image: "/flowers-product-5.jpg",
    category: "Peony Arrangements",
    inStock: true,
    stock: 8,
    createdAt: "2024-02-14T11:00:00Z",
    features: [
      "10 pink peonies",
      "Premium luxury flowers",
      "Seasonal availability",
      "Exquisite fragrance"
    ]
  },
  {
    id: 6,
    name: "Mixed Garden Bouquet",
    description: "A delightful mix of seasonal garden flowers in vibrant colors",
    price: 45.99,
    image: "/flowers-product-6.jpg",
    category: "Mixed Bouquets",
    inStock: true,
    stock: 25,
    createdAt: "2024-01-30T13:10:00Z",
    features: [
      "Variety of seasonal flowers",
      "Colorful arrangement",
      "Budget-friendly option",
      "Fresh garden style"
    ]
  },
  {
    id: 7,
    name: "Purple Lavender Bundle",
    description: "Aromatic lavender stems perfect for relaxation and home decoration",
    price: 35.99,
    image: "/flowers-product-7.jpg",
    category: "Herb Bouquets",
    inStock: true,
    stock: 12,
    createdAt: "2024-03-12T08:25:00Z",
    features: [
      "Fresh lavender stems",
      "Natural aromatherapy",
      "Dried flower option",
      "Long-lasting fragrance"
    ]
  },
  {
    id: 8,
    name: "Orchid Elegance",
    description: "Exotic orchids representing luxury and sophisticated beauty",
    price: 95.99,
    image: "/flowers-product-8.jpg",
    category: "Orchid Arrangements",
    inStock: true,
    stock: 6,
    createdAt: "2024-02-28T15:40:00Z",
    features: [
      "3 premium orchid stems",
      "Exotic and elegant",
      "Long-lasting blooms",
      "Perfect for gifts"
    ]
  }
];

// In-memory storage for new products (in a real app, this would be a database)
let nextId = 9;
export const addedProducts = [];

export function getAllProducts() {
  return [...mockProducts, ...addedProducts];
}

export function getProductById(id) {
  const allProducts = getAllProducts();
  return allProducts.find(product => product.id === parseInt(id));
}

export function addProduct(productData) {
  const newProduct = {
    id: nextId++,
    ...productData,
    inStock: true
  };
  addedProducts.push(newProduct);
  return newProduct;
}