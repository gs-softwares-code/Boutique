"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@/components/admin/icons";
import { formatINR, formatDate } from "@/lib/format";

interface CustomerRow {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  orderCount: number;
  totalSpent: number;
  hasMeasurements: boolean;
}

export function CustomersTable() {
  const [rows, setRows] = useState<CustomerRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/customers")
      .then((r) => r.json())
      .then(setRows)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-3 text-espresso/50 py-10">
        <Spinner className="w-5 h-5" /> Loading customers…
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-serif-display text-3xl text-espresso">Customers</h1>
      <p className="mt-1 text-sm text-espresso/55">{rows.length} accounts</p>

      <div className="mt-6 border border-line overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="text-left text-[0.65rem] tracking-luxe uppercase text-espresso/55 border-b border-line">
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Orders</th>
              <th className="px-4 py-3">Total spent</th>
              <th className="px-4 py-3">Measurements</th>
              <th className="px-4 py-3">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line-soft">
            {rows.map((c) => (
              <tr key={c.id} className="hover:bg-ivory-deep/30">
                <td className="px-4 py-3">
                  <span className="block font-medium">{c.name}</span>
                  <span className="text-xs text-espresso/50">{c.email}</span>
                </td>
                <td className="px-4 py-3 text-espresso/60">{formatDate(c.createdAt)}</td>
                <td className="px-4 py-3">{c.orderCount}</td>
                <td className="px-4 py-3 font-medium">{formatINR(c.totalSpent)}</td>
                <td className="px-4 py-3">{c.hasMeasurements ? "On file" : "—"}</td>
                <td className="px-4 py-3 capitalize">{c.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
