import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { LuxeImage } from "@/components/LuxeImage";
import { CheckIcon, TruckIcon, ShieldIcon } from "@/components/icons";
import { formatINR, formatDateTime, orderStatusLabel } from "@/lib/format";

export default async function OrderPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ placed?: string }>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const order = db.orderById(id);
  if (!order) notFound();

  const placed = sp.placed === "1";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {placed && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-6 py-5 mb-8 flex items-center gap-4">
          <span className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center">
            <CheckIcon className="w-5 h-5" />
          </span>
          <div>
            <p className="font-medium">Thank you — your order is confirmed.</p>
            <p className="text-sm text-emerald-800/80">A confirmation has been sent to {order.customerEmail}.</p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[0.68rem] tracking-luxe uppercase text-gold">Order</p>
          <h1 className="mt-1 font-serif-display text-4xl text-espresso">#{order.id.slice(0, 8).toUpperCase()}</h1>
        </div>
        <div className="text-right">
          <p className="text-sm text-espresso/55">Placed on {formatDateTime(order.createdAt)}</p>
          <p className="mt-1 inline-block bg-espresso text-ivory text-[0.68rem] tracking-luxe uppercase px-3 py-1.5">
            {orderStatusLabel[order.status]}
          </p>
        </div>
      </div>

      {/* status timeline */}
      <div className="mt-8 border border-line p-6 bg-ivory-deep/30">
        <div className="flex items-center gap-3 mb-4">
          <TruckIcon className="w-5 h-5 text-espresso/60" />
          <h2 className="font-serif-display text-xl text-espresso">Order tracking</h2>
        </div>
        <ol className="space-y-3 text-sm">
          {order.timeline.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className={`mt-1.5 w-2 h-2 rounded-full ${i === order.timeline.length - 1 ? "bg-espresso" : "bg-champagne-deep"}`} />
              <div>
                <p className="font-medium text-espresso">{orderStatusLabel[step.status]}</p>
                <p className="text-xs text-espresso/50">{formatDateTime(step.at)}</p>
              </div>
            </li>
          ))}
        </ol>
        {order.status !== "delivered" && order.status !== "cancelled" && (
          <p className="mt-4 text-xs text-espresso/55">
            Estimated delivery within 3–7 business days. You&apos;ll receive updates by email and SMS.
          </p>
        )}
      </div>

      {/* items */}
      <div className="mt-10">
        <h2 className="font-serif-display text-2xl text-espresso mb-5">Items</h2>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4 border-b border-line pb-4">
              <div className="relative w-16 h-20 shrink-0 overflow-hidden">
                <LuxeImage tone={item.imageTone} src={item.imageSrc} alt={item.name} />
              </div>
              <div className="flex-1 text-sm">
                <p className="font-medium">{item.name}</p>
                <p className="text-espresso/50 text-xs mt-0.5">{item.color} · Size {item.size} × {item.quantity}</p>
                <p className="mt-1">{formatINR(item.unitPrice * item.quantity)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* totals */}
      <div className="mt-8 grid sm:grid-cols-2 gap-8">
        <div className="border border-line p-6">
          <h3 className="text-[0.68rem] tracking-luxe uppercase text-espresso/60 mb-4">Shipping address</h3>
          <p className="text-sm leading-relaxed">
            {order.shippingAddress.fullName}
            <br />
            {order.shippingAddress.line1}
            {order.shippingAddress.line2 && (
              <>
                <br />
                {order.shippingAddress.line2}
              </>
            )}
            <br />
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}
            <br />
            +91 {order.shippingAddress.phone}
          </p>
        </div>
        <div className="border border-line p-6">
          <h3 className="text-[0.68rem] tracking-luxe uppercase text-espresso/60 mb-4">Payment summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-espresso/60">Subtotal</span><span>{formatINR(order.subtotal)}</span></div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700"><span>Discount</span><span>− {formatINR(order.discount)}</span></div>
            )}
            <div className="flex justify-between"><span className="text-espresso/60">Shipping</span><span>{order.shipping === 0 ? "Complimentary" : formatINR(order.shipping)}</span></div>
            <div className="flex justify-between border-t border-line pt-2 font-medium"><span>Total</span><span>{formatINR(order.total)}</span></div>
            <div className="flex justify-between text-xs text-espresso/50 pt-2">
              <span>Method</span>
              <span className="capitalize">{order.paymentMethod.replace(/([a-z])([A-Z])/g, "$1 $2")}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Link href="/collections" className="btn-luxe">Continue Shopping</Link>
        <Link href="/account?tab=orders" className="btn-luxe btn-luxe-outline">Go to My Account</Link>
      </div>

      <p className="mt-8 flex items-center gap-2 text-xs text-espresso/45">
        <ShieldIcon className="w-4 h-4" /> Need help? Contact {`atelier@boutique.example`} with your order number.
      </p>
    </div>
  );
}
