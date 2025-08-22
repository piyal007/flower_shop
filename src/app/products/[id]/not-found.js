import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-4xl font-bold text-foreground mb-4">Product Not Found</h1>
      <p className="text-foreground/70 mb-8">
        Sorry, the product you're looking for doesn't exist or may have been removed.
      </p>
      <div className="flex gap-4 justify-center">
        <Link 
          href="/products" 
          className="rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90"
        >
          Browse All Products
        </Link>
        <Link 
          href="/" 
          className="rounded-full border border-input bg-background px-6 py-3 text-sm hover:bg-accent hover:text-accent-foreground"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}