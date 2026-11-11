"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Spinner } from "@/components/admin/icons";
import { formatINR, formatDateTime, orderStatusLabel } from "@/lib/format";
import type { Order, OrderStatus } from "@/lib/types";

const STATUSES: OrderStatus[] = ["placed", "confirmed", "in_progress", "shipped", "delivered", "cancelled"];

export function OrdersManager() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/orders")
      .then(async (r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(setOrders)
      .catch(() => setError("Could not load orders."))
      .finally(() => setLoading(false));
  }, []);

  async function setStatus(id: string, status: OrderStatus) {
    const res = await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      const data = await res.json();
      setOrders((prev) => prev.map((o) => (o.id === id ? data.order : o)));
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 text-espresso/50 py-10">
        <Spinner className="w-5 h-5" /> Loading orders…
      </div>
    );
  }
  if (error) return <p className="text-red-700">{error}</p>;

  return (
    <div>
      <h1 className="font-serif-display text-3xl text-espresso">Orders</h1>
      <p className="mt-1 text-sm text-espresso/55">{orders.length} orders</p>

      <div className="mt-6 border border-line overflow-x-auto">
        <table className="w-full text-sm min-w-[860px]">
          <thead>
            <tr className="text-left text-[0.65rem] tracking-luxe uppercase text-espresso/55 border-b border-line">
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line-soft">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-ivory-deep/30">
                <td className="px-4 py-3">
                  <Link href={`/order/${o.id}`} className="font-medium hover:underline">#{o.id.slice(0, 8).toUpperCase()}</Link>
                </td>
                <td className="px-4 py-3">
                  <span className="block font-medium">{o.customerName}</span>
                  <span className="text-xs text-espresso/50">{o.customerEmail}</span>
                </td>
                <td className="px-4 py-3 text-espresso/60">{formatDateTime(o.createdAt)}</td>
                <td className="px-4 py-3">{o.items.reduce((s, i) => s + i.quantity, 0)}</td>
                <td className="px-4 py-3 font-medium">{formatINR(o.total)}</td>
                <td className="px-4 py-3 text-espresso/60 capitalize">{o.paymentMethod.replace(/-/g, " ")}</td>
                <td className="px-4 py-3">
                  <select
                    value={o.status}
                    onChange={(e) => setStatus(o.id, e.target.value as OrderStatus)}
                    className="border border-line bg-transparent px-2 py-1.5 text-sm"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{orderStatusLabel[s]}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
