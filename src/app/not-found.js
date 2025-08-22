import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center px-6">
        {/* 404 Number */}
        <div className="text-6xl font-bold text-primary mb-4">404</div>
        
        {/* Flower Icon */}
        <div className="mb-6">
          <svg 
            className="w-16 h-16 mx-auto text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Page Not Found
        </h1>
        
        {/* Description */}
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. The page might have been moved or doesn't exist.
        </p>

        {/* Back to Home Button */}
        <Link 
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
        >
          <svg 
            className="w-4 h-4 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </Link>

        {/* Additional Links */}
        <div className="mt-6 text-sm">
          <span className="text-gray-500">Or visit our </span>
          <Link href="/products" className="text-primary hover:underline">
            Products
          </Link>
          <span className="text-gray-500"> page</span>
        </div>
      </div>
    </div>
  );
}