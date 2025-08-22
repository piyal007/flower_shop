"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [displayName, setDisplayName] = useState("");

  const { signIn, signUp, signInWithGoogle } = useAuth();
  const router = useRouter();

  const showWelcomeAlert = async (user) => {
    return new Promise((resolve) => {
      Swal.fire({
        title: 'Welcome!',
        text: `Hi ${user?.displayName || user?.email || 'there'}! Welcome to FlowerShop.`,
        icon: 'success',
        confirmButtonText: 'Continue',
        confirmButtonColor: '#ed2353',
        timer: 2500,
        timerProgressBar: true,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then(() => {
        resolve();
      });
    });
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const loadingToast = toast.loading(isSignUp ? "Creating your account..." : "Signing you in...");

    try {
      let user;
      if (isSignUp) {
        user = await signUp(email, password, displayName);
        toast.dismiss(loadingToast);
      } else {
        user = await signIn(email, password);
        toast.dismiss(loadingToast);
      }

      // Show welcome alert immediately after successful login
      await showWelcomeAlert(user);
      
      // Navigate to products page after welcome alert
      router.push("/products");
    } catch (error) {
      toast.error(error.message || "Something went wrong. Please try again.", { id: loadingToast });
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setError("");

    const loadingToast = toast.loading("Connecting with Google...");

    try {
      const user = await signInWithGoogle();
      toast.dismiss(loadingToast);

      // Show welcome alert immediately after successful login
      await showWelcomeAlert(user);
      
      // Navigate to products page after welcome alert
      router.push("/products");
    } catch (error) {
      toast.error(error.message || "Google sign-in failed. Please try again.", { id: loadingToast });
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isSignUp ? "Create your account" : "Sign in to your account"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Choose your preferred authentication method
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {/* Google Login Button */}
          <div>
            <button
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              )}
              {isLoading ? "Processing..." : "Continue with Google"}
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Email/Password Form */}
          <form className="mt-8 space-y-6" onSubmit={handleEmailAuth}>
            <div className="space-y-4">
              {isSignUp && (
                <div>
                  <label htmlFor="displayName" className="sr-only">Full Name</label>
                  <input
                    id="displayName"
                    name="displayName"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Full Name"
                  />
                </div>
              )}
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {isLoading ? "Processing..." : (isSignUp ? "Create Account" : "Sign In")}
              </button>
            </div>
          </form>

          {/* Toggle Sign Up/Sign In */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
                setEmail("");
                setPassword("");
                setDisplayName("");
              }}
              className="text-indigo-600 hover:text-indigo-500 text-sm font-medium cursor-pointer"
            >
              {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
          loading: {
            iconTheme: {
              primary: '#3B82F6',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}


