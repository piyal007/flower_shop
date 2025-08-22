"use client";
import { useState } from "react";
import Image from "next/image";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!formData.name.trim()) {
      toast.error("Product name is required");
      setIsLoading(false);
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Product description is required");
      setIsLoading(false);
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast.error("Please enter a valid price");
      setIsLoading(false);
      return;
    }

    try {
      // Show loading toast
      const loadingToast = toast.loading("Adding product...");

      // Create product object
      const productData = {
        id: Date.now().toString(), // Simple ID generation
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category || 'General',
        image: formData.image || '/images/default-product.jpg',
        stock: parseInt(formData.stock) || 0,
        createdAt: new Date().toISOString(),
        features: []
      };

      // Save to localStorage first
      const existingProducts = JSON.parse(localStorage.getItem("products") || "[]");
      const updatedProducts = [...existingProducts, productData];
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      // Try to send to API as well (optional)
      try {
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });

        if (response.ok) {
          const apiProduct = await response.json();
          console.log('Product also saved to API:', apiProduct);
        }
      } catch (apiError) {
        console.log('API save failed, but product saved locally:', apiError);
      }

      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.success("Product added successfully!");

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: "",
      });

      // Optional: Redirect to dashboard after a delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);

    } catch (error) {
      toast.error(error.message || "Error adding product. Please try again.");
      console.error("Error adding product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-pink-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#ed2353] via-[#f73d64] to-[#ff5675] px-8 py-6">
              <h1 className="text-3xl font-bold text-white">Add New Product</h1>
              <p className="text-pink-100 mt-2">Fill in the details below to add a new product to your inventory</p>
            </div>

            {/* Form */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-2">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ed2353] focus:border-[#ed2353] transition-colors"
                        placeholder="Enter product name"
                      />
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-semibold text-gray-800 mb-2">
                        Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ed2353] focus:border-[#ed2353] transition-colors"
                      >
                        <option value="">Select a category</option>
                        <option value="Rose Bouquets">Rose Bouquets</option>
                        <option value="Tulip Bouquets">Tulip Bouquets</option>
                        <option value="Lily Arrangements">Lily Arrangements</option>
                        <option value="Sunflower Bouquets">Sunflower Bouquets</option>
                        <option value="Peony Arrangements">Peony Arrangements</option>
                        <option value="Mixed Bouquets">Mixed Bouquets</option>
                        <option value="Herb Bouquets">Herb Bouquets</option>
                        <option value="Orchid Arrangements">Orchid Arrangements</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="price" className="block text-sm font-semibold text-gray-800 mb-2">
                          Price ($) *
                        </label>
                        <input
                          type="number"
                          id="price"
                          name="price"
                          required
                          min="0"
                          step="0.01"
                          value={formData.price}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ed2353] focus:border-[#ed2353] transition-colors"
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <label htmlFor="stock" className="block text-sm font-semibold text-gray-800 mb-2">
                          Stock Quantity
                        </label>
                        <input
                          type="number"
                          id="stock"
                          name="stock"
                          min="0"
                          value={formData.stock}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ed2353] focus:border-[#ed2353] transition-colors"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="description" className="block text-sm font-semibold text-gray-800 mb-1">
                        Description *
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        required
                        rows={5}
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ed2353] focus:border-[#ed2353] transition-colors resize-none"
                        placeholder="Enter detailed product description..."
                      />
                    </div>

                    <div>
                      <label htmlFor="image" className="block text-sm font-semibold text-gray-800 mb-2">
                        Image URL
                      </label>
                      <input
                        type="url"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ed2353] focus:border-[#ed2353] transition-colors"
                        placeholder="https://example.com/image.jpg"
                      />
                      {formData.image && (
                        <div className="mt-3">
                          <Image
                            src={formData.image}
                            alt="Preview"
                            width={128}
                            height={128}
                            className="w-32 h-32 object-cover rounded-lg border-2 border-pink-200 shadow-md"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-6 border-t border-gray-200">
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => router.push("/dashboard")}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ed2353] focus:ring-offset-2 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-8 py-3 bg-gradient-to-r from-[#ed2353] via-[#f73d64] to-[#ff5675] text-white rounded-lg hover:from-[#d91e47] hover:to-[#f73d64] focus:outline-none focus:ring-2 focus:ring-[#ed2353] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold cursor-pointer shadow-lg hover:shadow-xl"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Adding Product...
                        </div>
                      ) : (
                        "Add Product"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}