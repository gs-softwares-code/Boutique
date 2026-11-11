"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { LuxeImage } from "@/components/LuxeImage";
import { CloseIcon, MinusIcon, PlusIcon, ArrowRight } from "@/components/icons";
import { formatINR } from "@/lib/format";

export function CartDrawer() {
  const { items, count, subtotal, isOpen, setOpen, removeItem, updateQuantity } = useCart();

  if (!isOpen) return null;

  const freeShippingGap = 25000 - subtotal;

  return (
    <div className="fixed inset-0 z-[80]">
      <button
        aria-label="Close cart"
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={() => setOpen(false)}
      />
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-ivory shadow-2xl flex flex-col">
        <header className="flex items-center justify-between px-6 py-5 border-b border-line">
          <div>
            <p className="text-[0.65rem] tracking-luxe uppercase text-espresso/60">Your selection</p>
            <h2 className="font-serif-display text-2xl">Shopping Bag</h2>
          </div>
          <button aria-label="Close" onClick={() => setOpen(false)} className="p-2 hover:opacity-60">
            <CloseIcon className="w-5 h-5" />
          </button>
        </header>

        {count === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
            <p className="font-serif-display text-2xl text-espresso">Your bag is empty</p>
            <p className="text-sm text-espresso/60">Discover pieces made for your moments.</p>
            <Link href="/collections" onClick={() => setOpen(false)} className="btn-luxe mt-2">
              Explore Collections
            </Link>
          </div>
        ) : (
          <>
            {subtotal < 25000 && (
              <div className="px-6 py-3 bg-champagne/40 text-xs text-espresso">
                You&apos;re ₹{formatINR(freeShippingGap).replace("₹", "")} away from complimentary shipping.
              </div>
            )}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4">
                  <Link
                    href={`/product/${item.slug}`}
                    onClick={() => setOpen(false)}
                    className="relative w-20 h-28 shrink-0 overflow-hidden"
                  >
                    <LuxeImage tone={item.imageTone} src={item.imageSrc} alt={item.name} />
                  </Link>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between gap-2">
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={() => setOpen(false)}
                        className="font-serif-display text-lg leading-tight hover:underline"
                      >
                        {item.name}
                      </Link>
                      <button
                        aria-label="Remove item"
                        onClick={() => removeItem(item.productId, item.size, item.color)}
                        className="text-espresso/40 hover:text-espresso text-sm mt-0.5"
                      >
                        <CloseIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-espresso/55 mt-0.5">
                      {item.color} · Size {item.size}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-line">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                          className="p-2 hover:bg-ivory-deep"
                        >
                          <MinusIcon className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                          className="p-2 hover:bg-ivory-deep"
                        >
                          <PlusIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-sm font-medium">{formatINR(item.unitPrice * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <footer className="border-t border-line px-6 py-5 space-y-4 bg-ivory-deep/40">
              <div className="flex justify-between text-sm">
                <span className="text-espresso/60">Subtotal</span>
                <span className="font-medium">{formatINR(subtotal)}</span>
              </div>
              <p className="text-xs text-espresso/50">
                Shipping and taxes are calculated at checkout.
              </p>
              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className="btn-luxe w-full"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="block text-center text-sm underline underline-offset-4 hover:opacity-70"
              >
                View full bag
              </Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
