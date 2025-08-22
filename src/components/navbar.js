"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { Menu, X, User, LogOut, Settings, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { user, signOut, loading } = useAuth();
  const isActive = (href) => pathname === href;
  const dropdownRef = useRef(null);

  const handleSignOut = async () => {
    try {
      await signOut();
      setOpen(false);
      setProfileDropdownOpen(false);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
              {/* Flower Icon */}
              <div className="relative">
                <svg 
                  className="w-8 h-8 text-primary group-hover:text-primary/80 transition-colors" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9C21 7.9 20.1 7 19 7C17.9 7 17 7.9 17 9C17 10.1 17.9 11 19 11C20.1 11 21 10.1 21 9ZM7 9C7 7.9 6.1 7 5 7C3.9 7 3 7.9 3 9C3 10.1 3.9 11 5 11C6.1 11 7 10.1 7 9ZM12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10ZM19 13C20.1 13 21 13.9 21 15C21 16.1 20.1 17 19 17C17.9 17 17 16.1 17 15C17 13.9 17.9 13 19 13ZM5 13C6.1 13 7 13.9 7 15C7 16.1 6.1 17 5 17C3.9 17 3 16.1 3 15C3 13.9 3.9 13 5 13ZM12 18C13.1 18 14 18.9 14 20C14 21.1 13.1 22 12 22C10.9 22 10 21.1 10 20C10 18.9 10.9 18 12 18Z"/>
                </svg>
                {/* Small decorative dot */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary/60 rounded-full"></div>
              </div>
              {/* Logo Text */}
              <span className={cn(
                "text-2xl font-semibold text-primary group-hover:text-primary/80 transition-colors",
                "[font-family:var(--font-great-vibes)]"
              )}>
                FlowerShop
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors",
                isActive("/") ? "active text-primary" : "text-foreground/80 hover:text-primary"
              )}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={cn(
                "text-sm font-medium transition-colors",
                isActive("/products") ? "active text-primary" : "text-foreground/80 hover:text-primary"
              )}
            >
              Products
            </Link>
            {user && (
              <Link
                href="/dashboard/add-product"
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActive("/dashboard/add-product") ? "active text-primary" : "text-foreground/80 hover:text-primary"
                )}
              >
                Add Product
              </Link>
            )}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
            ) : user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-50 transition-all duration-200 group cursor-pointer"
                >
                  <div className="relative">
                    {/* Profile Picture with Ring Border */}
                    <div className="w-9 h-9 rounded-full p-0.5 bg-gradient-to-r from-primary via-primary/80 to-primary/60 shadow-sm">
                      <div className="w-full h-full rounded-full overflow-hidden bg-white p-0.5">
                        {user.photoURL ? (
                          <Image
                            src={user.photoURL}
                            alt={user.displayName || user.email}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center rounded-full">
                            <span className="text-white text-sm font-semibold">
                              {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Online Indicator */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
                  </div>
                  
                  {/* Dropdown Indicator */}
                  <ChevronDown className={`h-3 w-3 text-gray-500 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          {/* Profile Picture with Ring Border */}
                          <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-r from-primary via-primary/80 to-primary/60">
                            <div className="w-full h-full rounded-full overflow-hidden bg-white p-0.5">
                              {user.photoURL ? (
                                <Image
                                  src={user.photoURL}
                                  alt={user.displayName || user.email}
                                  width={44}
                                  height={44}
                                  className="w-full h-full object-cover rounded-full"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center rounded-full">
                                  <span className="text-white font-semibold">
                                    {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Online Indicator */}
                          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {user.displayName || 'User'}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                        Dashboard
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>
          <div className="md:hidden">
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              aria-label="Toggle menu"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-2 border-t pt-4">
              <Link
                href="/"
                className={cn(
                  "px-1 py-2 text-base font-medium transition-colors",
                  isActive("/") ? "active text-primary" : "text-foreground/80 hover:text-primary"
                )}
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className={cn(
                  "px-1 py-2 text-base font-medium transition-colors",
                  isActive("/products") ? "active text-primary" : "text-foreground/80 hover:text-primary"
                )}
                onClick={() => setOpen(false)}
              >
                Products
              </Link>
              {user && (
                <>
                  <Link
                    href="/dashboard"
                    className={cn(
                      "px-1 py-2 text-base font-medium transition-colors",
                      isActive("/dashboard") ? "active text-primary" : "text-foreground/80 hover:text-primary"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/add-product"
                    className={cn(
                      "px-1 py-2 text-base font-medium transition-colors",
                      isActive("/dashboard/add-product") ? "active text-primary" : "text-foreground/80 hover:text-primary"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    Add Product
                  </Link>
                </>
              )}
              <div className="flex items-center gap-2 pt-2">
                {user ? (
                  <div className="w-full space-y-2">
                    <div className="flex items-center gap-3 px-1 py-2">
                      <div className="relative">
                        {/* Profile Picture with Ring Border */}
                        <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-r from-primary via-primary/80 to-primary/60">
                          <div className="w-full h-full rounded-full overflow-hidden bg-white p-0.5">
                            {user.photoURL ? (
                              <Image
                                src={user.photoURL}
                                alt={user.displayName || user.email}
                                width={36}
                                height={36}
                                className="w-full h-full object-cover rounded-full"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center rounded-full">
                                <span className="text-white text-sm font-semibold">
                                  {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Online Indicator */}
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{user.displayName || 'User'}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button asChild className="flex-1">
                    <Link href="/login" onClick={() => setOpen(false)}>Login</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}


