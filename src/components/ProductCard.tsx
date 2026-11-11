"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { LuxeImage } from "@/components/LuxeImage";
import { useCart, useWishlist } from "@/components/CartProvider";
import { HeartIcon, PlusIcon, CheckIcon } from "@/components/icons";
import { formatINR } from "@/lib/format";

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const [added, setAdded] = useState(false);
  const wished = has(product.id);

  const defaultColor = product.colors[0]?.name ?? "Ivory";
  const defaultSize = product.sizes[0] ?? "M";

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock <= 0) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      size: defaultSize,
      color: defaultColor,
      quantity: 1,
      unitPrice: product.price,
      imageTone: product.images[0]?.tone ?? 0,
      imageSrc: product.images[0]?.src,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  const badge = product.newArrival
    ? "New"
    : product.bestselling
      ? "Bestseller"
      : product.seasonal
        ? "Seasonal"
        : product.editorial
          ? "Editorial"
          : null;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
      aria-label={product.name}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-champagne/30">
        <LuxeImage
          tone={product.images[0]?.tone ?? 0}
          src={product.images[0]?.src}
          alt={product.name}
          priority={priority}
          className="absolute inset-0 w-full h-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        />
        {badge && (
          <span className="absolute left-3 top-3 bg-ivory/85 backdrop-blur px-2.5 py-1 text-[0.6rem] tracking-luxe uppercase text-espresso">
            {badge}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <button
            onClick={quickAdd}
            disabled={product.stock <= 0}
            className="w-full btn-luxe text-[0.65rem] py-3"
          >
            {product.stock <= 0 ? "Temporarily unavailable" : added ? <><CheckIcon className="w-4 h-4" /> Added</> : <><PlusIcon className="w-4 h-4" /> Add to Bag</>}
          </button>
        </div>
        <button
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggle(product.id);
          }}
          className={`absolute right-3 top-3 w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
            wished ? "bg-blush text-espresso" : "bg-ivory/80 text-espresso hover:bg-ivory"
          }`}
        >
          <HeartIcon className="w-4 h-4" filled={wished} />
        </button>
      </div>
      <div className="pt-4 text-center">
        <h3 className="font-serif-display text-lg text-espresso leading-snug">{product.name}</h3>
        <p className="text-[0.65rem] tracking-luxe uppercase text-espresso/50 mt-1">{product.category}</p>
        <p className="text-sm text-espresso mt-2">
          {formatINR(product.price)}
          {product.compareAtPrice && (
            <span className="text-espresso/40 line-through ml-2">{formatINR(product.compareAtPrice)}</span>
          )}
        </p>
      </div>
    </Link>
  );
}
