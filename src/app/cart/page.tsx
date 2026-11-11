"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { LuxeImage } from "@/components/LuxeImage";
import { MinusIcon, PlusIcon, CloseIcon, ArrowRight } from "@/components/icons";
import { formatINR } from "@/lib/format";

export default function CartPage() {
  const { items, count, subtotal, removeItem, updateQuantity } = useCart();

  if (count === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-28 text-center">
        <h1 className="font-serif-display text-4xl text-espresso">Your bag is empty</h1>
        <p className="mt-4 text-espresso/60">Explore the collections and find a piece you love.</p>
        <Link href="/collections" className="btn-luxe mt-8">
          Explore Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <h1 className="font-serif-display text-4xl text-espresso">Shopping Bag</h1>
      <p className="mt-2 text-sm text-espresso/55">{count} {count === 1 ? "item" : "items"} in your bag</p>

      <div className="mt-10 grid lg:grid-cols-[1fr_360px] gap-10 items-start">
        <div className="space-y-6">
          {items.map((item) => (
            <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-5 border-b border-line pb-6">
              <Link href={`/product/${item.slug}`} className="relative w-24 h-32 shrink-0 overflow-hidden">
                <LuxeImage tone={item.imageTone} src={item.imageSrc} alt={item.name} />
              </Link>
              <div className="flex-1">
                <div className="flex justify-between gap-3">
                  <Link href={`/product/${item.slug}`} className="font-serif-display text-xl text-espresso hover:underline">
                    {item.name}
                  </Link>
                  <button aria-label="Remove item" onClick={() => removeItem(item.productId, item.size, item.color)} className="text-espresso/40 hover:text-espresso">
                    <CloseIcon className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-espresso/55 mt-1">
                  {item.color} · Size {item.size}
                </p>
                <p className="text-sm text-espresso mt-3">{formatINR(item.unitPrice)}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center border border-line">
                    <button aria-label="Decrease" onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)} className="p-2.5 hover:bg-ivory-deep">
                      <MinusIcon className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-sm">{item.quantity}</span>
                    <button aria-label="Increase" onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)} className="p-2.5 hover:bg-ivory-deep">
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="font-medium">{formatINR(item.unitPrice * item.quantity)}</p>
                </div>
              </div>
            </div>
          ))}
          <Link href="/collections" className="inline-flex items-center gap-2 text-sm text-espresso/60 hover:text-espresso">
            ← Continue shopping
          </Link>
        </div>

        <aside className="bg-ivory-deep/40 border border-line p-7 sticky top-24">
          <h2 className="font-serif-display text-2xl text-espresso">Summary</h2>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-espresso/60">Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-espresso/60">Shipping</span>
              <span>{subtotal >= 25000 ? "Complimentary" : "Calculated at checkout"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-espresso/60">Taxes</span>
              <span>Included</span>
            </div>
          </div>
          <div className="mt-5 pt-5 border-t border-line flex justify-between">
            <span className="font-medium">Total</span>
            <span className="font-serif-display text-2xl">{formatINR(subtotal)}</span>
          </div>
          <Link href="/checkout" className="btn-luxe w-full mt-6">
            Proceed to Checkout <ArrowRight className="w-4 h-4" />
          </Link>
        </aside>
      </div>
    </div>
  );
}
