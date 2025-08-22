"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import Swal from "sweetalert2";

export default function DashboardPage() {
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
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.displayName || user?.email}! Here's your product overview.</p>
        </div>

        {/* Stats Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="animate-pulse">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                    <div className="ml-4 flex-1">
                      <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                      <div className="h-8 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-2xl font-semibold text-gray-900">{products.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">In Stock</p>
                  <p className="text-2xl font-semibold text-gray-900">{products.filter(p => p.inStock !== false).length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Value</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    ${products.reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Category Breakdown */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>
            <div className="space-y-3">
              {loading ? (
                <div className="animate-pulse space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                      <div className="h-4 bg-gray-200 rounded w-8"></div>
                    </div>
                  ))}
                </div>
              ) : (
                (() => {
                  const categoryCount = products.reduce((acc, product) => {
                    const category = product.category || 'Other';
                    acc[category] = (acc[category] || 0) + 1;
                    return acc;
                  }, {});
                  
                  return Object.entries(categoryCount)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 5)
                    .map(([category, count]) => (
                      <div key={category} className="flex justify-between items-center">
                        <span className="text-gray-600">{category}</span>
                        <span className="font-semibold text-gray-900">{count}</span>
                      </div>
                    ));
                })()
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {loading ? (
                <div className="animate-pulse space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-48 mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded w-24"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                (() => {
                  const recentProducts = [...products]
                    .sort((a, b) => new Date(b.createdAt || b.dateAdded || 0) - new Date(a.createdAt || a.dateAdded || 0))
                    .slice(0, 4);
                  
                  return recentProducts.map((product) => (
                    <div key={product.id} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          Added "{product.name}"
                        </p>
                        <p className="text-xs text-gray-500">
                          {product.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'Recently'}
                        </p>
                      </div>
                    </div>
                  ));
                })()
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
            <p className="text-gray-600 text-sm mt-1">Manage your flower shop efficiently</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/dashboard/add-product"
                className="flex items-center p-4 bg-primary/5 border border-primary/20 rounded-lg hover:bg-primary/10 transition-colors group"
              >
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">Add Product</h3>
                  <p className="text-sm text-gray-600">Add new flowers to inventory</p>
                </div>
              </Link>

              <Link
                href="/products"
                className="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors group"
              >
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">View Catalog</h3>
                  <p className="text-sm text-gray-600">Browse all products</p>
                </div>
              </Link>

              <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">Analytics</h3>
                  <p className="text-sm text-gray-600">View detailed reports</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}