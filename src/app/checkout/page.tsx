"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { CheckoutForm } from "@/components/CheckoutForm";

export default function CheckoutPage() {
  const { count } = useCart();

  if (count === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-28 text-center">
        <h1 className="font-serif-display text-4xl text-espresso">Your bag is empty</h1>
        <p className="mt-4 text-espresso/60">Add a few pieces before heading to checkout.</p>
        <Link href="/collections" className="btn-luxe mt-8">
          Explore Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <h1 className="font-serif-display text-4xl text-espresso">Checkout</h1>
      <p className="mt-2 text-sm text-espresso/55">Complimentary shipping on orders over ₹25,000.</p>
      <div className="mt-10">
        <CheckoutForm />
      </div>
    </div>
  );
}
