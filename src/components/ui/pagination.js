"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Pagination({ page, totalPages, basePath = "?page=", className }) {
  const prev = Math.max(1, page - 1);
  const next = Math.min(totalPages, page + 1);
  return (
    <nav className={cn("flex items-center gap-1", className)} aria-label="Pagination">
      <Link
        className="px-3 h-9 inline-flex items-center justify-center rounded-md border text-sm hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
        href={`${basePath}${prev}`}
        aria-disabled={page === 1}
      >
        Prev
      </Link>
      <span className="px-3 h-9 inline-flex items-center justify-center text-sm">
        {page} / {totalPages}
      </span>
      <Link
        className="px-3 h-9 inline-flex items-center justify-center rounded-md border text-sm hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
        href={`${basePath}${next}`}
        aria-disabled={page === totalPages}
      >
        Next
      </Link>
    </nav>
  );
}


