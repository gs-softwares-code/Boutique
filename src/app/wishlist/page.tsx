"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { useWishlist } from "@/components/CartProvider";
import { ProductCard } from "@/components/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data: Product[]) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  const items = useMemo(() => products.filter((p) => wishlist.has(p.id)), [products, wishlist]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <h1 className="font-serif-display text-4xl text-espresso">Your Wishlist</h1>
      <p className="mt-2 text-sm text-espresso/55">
        {items.length} {items.length === 1 ? "design" : "designs"} saved
      </p>

      {loading ? (
        <p className="py-24 text-center text-espresso/50">Loading…</p>
      ) : items.length === 0 ? (
        <div className="text-center py-24">
          <p className="font-serif-display text-2xl text-espresso">Nothing saved yet</p>
          <p className="mt-2 text-espresso/60">Tap the heart on any design to keep it here.</p>
          <Link href="/collections" className="btn-luxe mt-8">Explore Collections</Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
