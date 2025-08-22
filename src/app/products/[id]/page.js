import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getProduct(id) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products/${id}`, {
      cache: 'no-store' // Ensure fresh data
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductDetail({ params }) {
  const { id } = params;
  
  // Fetch the specific product by ID
  const product = await getProduct(id);
  
  // If product not found, show 404
  if (!product) {
    notFound();
  }

  const details = product.features && product.features.length > 0 
    ? product.features 
    : [
        "High quality product",
        "Fast shipping available",
        "Customer satisfaction guaranteed",
        `Category: ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}`,
      ];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:items-center">
        <div className="relative w-full h-[360px] sm:h-[480px] md:h-[520px]">
          <Image src={product.image} alt={product.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-contain rounded-md" />
        </div>
        <div className="md:self-center">
          <div className="text-sm text-foreground/60">SKU: FS-{id}</div>
          <h1 className="mt-1 text-3xl font-semibold">{product.name}</h1>
          
          {/* Rating and Reviews - only show if available */}
          {product.rating && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-foreground/60">
                {product.rating} ({product.reviews || 0} reviews)
              </span>
            </div>
          )}

          <div className="mt-3 text-2xl font-bold text-primary">${product.price}</div>
          
          {/* Stock Status */}
          <div className="mt-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              product.inStock 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
            </span>
          </div>

          <p className="mt-4 text-foreground/80">{product.longDescription || product.description}</p>
          
          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2">Features:</h3>
            <ul className="list-disc pl-5 text-sm text-foreground/70 space-y-1">
              {details.map((d, i) => (<li key={i}>{d}</li>))}
            </ul>
          </div>

          <div className="mt-6 flex gap-3">
            <button 
              className={`rounded-full px-6 py-3 text-sm font-medium ${
                product.inStock 
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!product.inStock}
            >
              {product.inStock ? 'Buy Now' : 'Out of Stock'}
            </button>
            <Link href="/products" className="rounded-full border border-input bg-background px-6 py-3 text-sm hover:bg-accent hover:text-accent-foreground">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


