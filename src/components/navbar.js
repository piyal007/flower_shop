"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user, signOut, loading } = useAuth();
  const isActive = (href) => pathname === href;

  const handleSignOut = async () => {
    try {
      await signOut();
      setOpen(false);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className={cn("text-2xl", "[font-family:var(--font-great-vibes)]")} onClick={() => setOpen(false)}>FlowerShop</Link>
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
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">{user.displayName || user.email}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
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
              )}
              <div className="flex items-center gap-2 pt-2">
                {user ? (
                  <div className="w-full space-y-2">
                    <div className="flex items-center gap-2 px-1">
                      <User className="h-4 w-4" />
                      <span className="text-sm font-medium">{user.displayName || user.email}</span>
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


