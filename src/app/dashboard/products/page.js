"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import Swal from "sweetalert2";

export default function DashboardProductsPage() {
  const [products, setProducts] = useState([]);
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function loadAllProducts() {
      try {
        setLoading(true);
        
        // Load products from API
        const response = await fetch('/api/products');
        let fetchedProducts = [];
        if (response.ok) {
          fetchedProducts = await response.json();
          setApiProducts(fetchedProducts);
        }
        
        // Load user-added products from localStorage
        const savedProducts = JSON.parse(localStorage.getItem("products") || "[]");
        
        // Combine both sources
        const allProducts = [...fetchedProducts, ...savedProducts];
        setProducts(allProducts);
      } catch (error) {
        console.error('Error loading products:', error);
        // Fallback to localStorage only
        const savedProducts = JSON.parse(localStorage.getItem("products") || "[]");
        setProducts(savedProducts);
      } finally {
        setLoading(false);
      }
    }
    
    loadAllProducts();
  }, []);

  const deleteProduct = async (productId) => {
    // Check if it's a user-added product (can be deleted)
    const savedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    const isUserProduct = savedProducts.some(p => p.id === productId);
    
    if (isUserProduct) {
      // Show confirmation dialog for user products
      const result = await Swal.fire({
        title: 'Delete Product?',
        text: 'Are you sure you want to delete this product? This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      });

      if (result.isConfirmed) {
        // Remove from localStorage
        const updatedSavedProducts = savedProducts.filter(product => product.id !== productId);
        localStorage.setItem("products", JSON.stringify(updatedSavedProducts));
        
        // Update combined products list
        const updatedAllProducts = [...apiProducts, ...updatedSavedProducts];
        setProducts(updatedAllProducts);

        // Show success message
        Swal.fire({
          title: 'Deleted!',
          text: 'Your product has been deleted successfully.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    } else {
      // Show info message that API products can't be deleted
      Swal.fire({
        title: 'Cannot Delete',
        text: 'This is a demo product and cannot be deleted. You can only delete products you\'ve added.',
        icon: 'info',
        confirmButtonColor: '#3b82f6',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <ProtectedRoute>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600 mt-2">Manage your flower shop inventory and products</p>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Your Products</h2>
                <p className="text-gray-600 text-sm mt-1">Manage your product inventory</p>
              </div>
              <Link
                href="/dashboard/add-product"
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Add New Product
              </Link>
            </div>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="animate-pulse">
                      <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                      <div className="p-4">
                        <div className="h-6 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded mb-3"></div>
                        <div className="h-8 bg-gray-200 rounded mb-3"></div>
                        <div className="flex space-x-2">
                          <div className="flex-1 h-8 bg-gray-200 rounded"></div>
                          <div className="flex-1 h-8 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
                <p className="text-gray-500 mb-6">Get started by adding your first product to the inventory.</p>
                <Link
                  href="/dashboard/add-product"
                  className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Add Your First Product
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    {product.image ? (
                      <div className="relative h-48 w-full bg-gray-100">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                    ) : (
                      <div className="h-48 w-full bg-gray-100 flex items-center justify-center rounded-t-lg">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xl font-bold text-primary">${product.price}</span>
                        {product.category && (
                          <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full capitalize">
                            {product.category}
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                        <span>Stock: {product.stock || product.quantity || 'N/A'}</span>
                        <span>{product.createdAt ? new Date(product.createdAt).toLocaleDateString() : product.dateAdded ? new Date(product.dateAdded).toLocaleDateString() : 'No Date'}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                        >
                          Delete
                        </button>
                        <Link
                          href={`/products/${product.id}`}
                          className="flex-1 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium text-center"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}