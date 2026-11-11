"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@/components/admin/icons";
import { formatDate, bookingStatusLabel, bespokeStatusLabel } from "@/lib/format";
import type { Booking, BespokeRequest } from "@/lib/types";

export function AppointmentsManager() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bespoke, setBespoke] = useState<BespokeRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/bookings").then((r) => r.json()),
      fetch("/api/admin/bespoke").then((r) => r.json()),
    ])
      .then(([b, r]) => {
        setBookings(b as Booking[]);
        setBespoke(r as BespokeRequest[]);
      })
      .finally(() => setLoading(false));
  }, []);

  async function setBookingStatus(id: string, status: Booking["status"]) {
    const res = await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      const data = await res.json();
      setBookings((prev) => prev.map((x) => (x.id === id ? data.booking : x)));
    }
  }

  async function setBespokeStatus(id: string, status: BespokeRequest["status"]) {
    const res = await fetch("/api/admin/bespoke", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      const data = await res.json();
      setBespoke((prev) => prev.map((x) => (x.id === id ? data.request : x)));
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 text-espresso/50 py-10">
        <Spinner className="w-5 h-5" /> Loading…
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-serif-display text-3xl text-espresso">Appointments</h1>
        <p className="mt-1 text-sm text-espresso/55">{bookings.length} booking requests</p>
        <div className="mt-5 border border-line divide-y divide-line-soft">
          {bookings.length === 0 && <p className="px-5 py-6 text-sm text-espresso/50">No appointment requests yet.</p>}
          {bookings.map((b) => (
            <div key={b.id} className="px-5 py-4 grid md:grid-cols-[1fr_auto] gap-4 items-center">
              <div>
                <p className="font-medium capitalize">{b.type.replace("-", " ")} — {b.name}</p>
                <p className="text-sm text-espresso/55">
                  {formatDate(b.date)} · {b.time} · {b.phone}
                </p>
                {b.occasion && <p className="text-xs text-espresso/45 mt-1">Occasion: {b.occasion}</p>}
                {b.requirements && <p className="text-xs text-espresso/45 mt-1">{b.requirements}</p>}
              </div>
              <select
                value={b.status}
                onChange={(e) => setBookingStatus(b.id, e.target.value as Booking["status"])}
                className="border border-line bg-transparent px-2 py-1.5 text-sm"
              >
                {(["pending", "confirmed", "cancelled"] as const).map((s) => (
                  <option key={s} value={s}>{bookingStatusLabel[s]}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h1 className="font-serif-display text-3xl text-espresso">Custom Orders</h1>
        <p className="mt-1 text-sm text-espresso/55">{bespoke.length} bespoke requests</p>
        <div className="mt-5 border border-line divide-y divide-line-soft">
          {bespoke.length === 0 && <p className="px-5 py-6 text-sm text-espresso/50">No bespoke requests yet.</p>}
          {bespoke.map((r) => (
            <div key={r.id} className="px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-medium">{r.name} — {r.occasion}</p>
                <select
                  value={r.status}
                  onChange={(e) => setBespokeStatus(r.id, e.target.value as BespokeRequest["status"])}
                  className="border border-line bg-transparent px-2 py-1.5 text-sm"
                >
                  {(["new", "in_review", "in_progress", "delivered"] as const).map((s) => (
                    <option key={s} value={s}>{bespokeStatusLabel[s]}</option>
                  ))}
                </select>
              </div>
              <p className="text-sm text-espresso/55 mt-1">
                {r.fabric && <>Fabric: {r.fabric} · </>}
                {r.color && <>Colour: {r.color} · </>}
                {r.budgetRange && <>Budget: {r.budgetRange}</>}
              </p>
              <p className="text-sm text-espresso/55 mt-1">{r.email} · {r.phone}</p>
              {r.designNotes && <p className="text-sm text-espresso/60 mt-2 italic">“{r.designNotes}”</p>}
              {Object.keys(r.measurements).length > 0 && (
                <details className="mt-2">
                  <summary className="text-xs underline underline-offset-4 text-espresso/55 cursor-pointer">Measurements</summary>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-espresso/60">
                    {Object.entries(r.measurements).map(([k, v]) => (
                      <span key={k}>{k}: {v}</span>
                    ))}
                  </div>
                </details>
              )}
              {r.references.length > 0 && (
                <p className="mt-2 text-xs text-espresso/45">
                  {r.references.length} reference image{r.references.length > 1 ? "s" : ""} attached
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
