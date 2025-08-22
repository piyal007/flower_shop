"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href) => pathname === href;
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
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <Button asChild>
              <Link href="/auth">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/auth">Register</Link>
            </Button>
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
              <div className="flex items-center gap-2 pt-2">
                <Button asChild className="flex-1">
                  <Link href="/auth" onClick={() => setOpen(false)}>Login</Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link href="/auth" onClick={() => setOpen(false)}>Register</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}


