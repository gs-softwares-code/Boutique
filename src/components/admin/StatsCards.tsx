"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Spinner } from "@/components/admin/icons";
import { formatINR } from "@/lib/format";

interface Analytics {
  totalOrders: number;
  revenue: number;
  recentOrders: number;
  recentRevenue: number;
  uniqueCustomers: number;
  pendingBookings: number;
  pendingBespoke: number;
  lowStock: { id: string; slug: string; name: string; stock: number }[];
}

export function StatsCards() {
  const [data, setData] = useState<Analytics | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(async (r) => {
        if (!r.ok) throw new Error("unauthorized");
        return r.json();
      })
      .then(setData)
      .catch(() => setError("Could not load analytics."));
  }, []);

  if (error) return <p className="text-red-700">{error}</p>;
  if (!data) {
    return (
      <div className="flex items-center gap-3 text-espresso/50 py-10">
        <Spinner className="w-5 h-5" /> Loading analytics…
      </div>
    );
  }

  const cards = [
    { label: "Total orders", value: String(data.totalOrders) },
    { label: "Revenue", value: formatINR(data.revenue) },
    { label: "Orders (last 30d)", value: String(data.recentOrders) },
    { label: "Revenue (last 30d)", value: formatINR(data.recentRevenue) },
    { label: "Unique customers", value: String(data.uniqueCustomers) },
    { label: "Pending bookings", value: String(data.pendingBookings) },
    { label: "New bespoke", value: String(data.pendingBespoke) },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="border border-line p-5 bg-ivory-deep/30">
            <p className="text-[0.62rem] tracking-luxe uppercase text-espresso/55">{c.label}</p>
            <p className="mt-2 font-serif-display text-2xl text-espresso">{c.value}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 font-serif-display text-2xl text-espresso">Low stock alerts</h2>
      {data.lowStock.length === 0 ? (
        <p className="mt-3 text-sm text-espresso/55">All products are sufficiently stocked.</p>
      ) : (
        <div className="mt-4 border border-line divide-y divide-line">
          {data.lowStock.map((p) => (
            <div key={p.id} className="flex items-center justify-between px-5 py-3">
              <Link href={`/product/${p.slug}`} className="hover:underline">{p.name}</Link>
              <span className={`text-sm font-medium ${p.stock <= 0 ? "text-red-700" : "text-amber-700"}`}>
                {p.stock <= 0 ? "Out of stock" : `${p.stock} left`}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
