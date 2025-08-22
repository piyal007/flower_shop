export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center">
          <div className="text-2xl [font-family:var(--font-great-vibes)]">FlowerShop</div>
          <div className="mt-2 text-xs text-foreground/60">© {new Date().getFullYear()} FlowerShop. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}


