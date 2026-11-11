"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LuxeImage } from "@/components/LuxeImage";
import { formatINR, formatDateTime, formatDate, orderStatusLabel, bookingStatusLabel, bespokeStatusLabel } from "@/lib/format";

interface Summary {
  user: { id: string; name: string; email: string; role: string; addresses: AddressLite[] };
  orders: {
    id: string;
    total: number;
    status: string;
    paymentMethod: string;
    createdAt: string;
    items: { name: string; size: string; color: string; quantity: number; unitPrice: number; imageTone: number; imageSrc?: string }[];
  }[];
  bookings: { id: string; type: string; date: string; time: string; status: string }[];
  bespokeRequests: { id: string; occasion: string; status: string; createdAt: string }[];
}

interface AddressLite {
  id: string;
  label: string;
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "orders", label: "Orders" },
  { id: "addresses", label: "Addresses" },
  { id: "appointments", label: "Appointments" },
  { id: "bespoke", label: "Custom Orders" },
] as const;

type Tab = (typeof TABS)[number]["id"];

export default function AccountPage() {
  return (
    <Suspense fallback={null}>
      <AccountInner />
    </Suspense>
  );
}

function AccountInner() {
  const router = useRouter();
  const params = useSearchParams();
  const [tab, setTab] = useState<Tab>((params.get("tab") as Tab) || "overview");
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/account/summary")
      .then(async (r) => {
        if (r.status === 401) {
          router.replace(`/login?next=${encodeURIComponent("/account")}`);
          return null;
        }
        if (!r.ok) throw new Error("Failed to load account");
        return r.json();
      })
      .then((data) => {
        if (data) setSummary(data);
      })
      .catch(() => setError("Could not load your account."))
      .finally(() => setLoading(false));
  }, [router]);

  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-24 text-center">
        <p className="text-espresso/60">Loading your account…</p>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-24 text-center">
        <p className="text-red-700">{error || "Please sign in to view your account."}</p>
        <Link href="/login" className="btn-luxe mt-6">Sign in</Link>
      </div>
    );
  }

  const { user, orders, bookings, bespokeRequests } = summary;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-[0.68rem] tracking-luxe uppercase text-gold">My account</p>
          <h1 className="mt-1 font-serif-display text-4xl text-espresso">Welcome, {user.name.split(" ")[0]}</h1>
        </div>
        <button onClick={signOut} className="text-sm underline underline-offset-4 text-espresso/60 hover:text-espresso">
          Sign out
        </button>
      </div>

      <div className="mt-8 flex gap-2 flex-wrap border-b border-line pb-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-[0.72rem] tracking-luxe uppercase transition-colors ${
              tab === t.id ? "bg-espresso text-ivory" : "text-espresso/60 hover:text-espresso"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === "overview" && (
          <div className="grid sm:grid-cols-3 gap-5">
            <Link href="/account?tab=orders" className="border border-line p-6 hover:border-espresso transition-colors">
              <p className="font-serif-display text-4xl text-espresso">{orders.length}</p>
              <p className="mt-1 text-sm text-espresso/60">Orders</p>
            </Link>
            <Link href="/account?tab=appointments" className="border border-line p-6 hover:border-espresso transition-colors">
              <p className="font-serif-display text-4xl text-espresso">{bookings.length}</p>
              <p className="mt-1 text-sm text-espresso/60">Appointments</p>
            </Link>
            <Link href="/account?tab=bespoke" className="border border-line p-6 hover:border-espresso transition-colors">
              <p className="font-serif-display text-4xl text-espresso">{bespokeRequests.length}</p>
              <p className="mt-1 text-sm text-espresso/60">Custom orders</p>
            </Link>
          </div>
        )}

        {tab === "orders" && (
          <div className="space-y-6">
            {orders.length === 0 && <EmptyState text="You haven't placed any orders yet." link="/collections" linkLabel="Explore collections" />}
            {orders.map((o) => (
              <Link key={o.id} href={`/order/${o.id}`} className="block border border-line p-6 hover:border-espresso transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-serif-display text-xl text-espresso">#{o.id.slice(0, 8).toUpperCase()}</p>
                  <span className="bg-espresso text-ivory text-[0.62rem] tracking-luxe uppercase px-2.5 py-1">
                    {orderStatusLabel[o.status]}
                  </span>
                </div>
                <p className="mt-1 text-xs text-espresso/50">{formatDateTime(o.createdAt)} · {o.paymentMethod.replace(/-/g, " ")}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {o.items.slice(0, 3).map((item, i) => (
                    <div key={i} className="relative w-14 h-16 overflow-hidden">
                      <LuxeImage tone={item.imageTone} src={item.imageSrc} alt={item.name} />
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-sm text-espresso/60">
                    {o.items.reduce((s, i) => s + i.quantity, 0)} items
                  </p>
                  <p className="font-serif-display text-xl">{formatINR(o.total)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {tab === "addresses" && (
          <div className="grid sm:grid-cols-2 gap-5">
            {user.addresses.length === 0 && <EmptyState text="No saved addresses yet." link="/checkout" linkLabel="Add during checkout" />}
            {user.addresses.map((a) => (
              <div key={a.id} className="border border-line p-6">
                <p className="font-medium">{a.fullName}</p>
                <p className="mt-2 text-sm text-espresso/60 leading-relaxed">
                  {a.line1}
                  {a.line2 && <><br />{a.line2}</>}
                  <br />
                  {a.city}, {a.state} {a.pincode}
                  <br />
                  +91 {a.phone}
                </p>
              </div>
            ))}
          </div>
        )}

        {tab === "appointments" && (
          <div className="space-y-4">
            {bookings.length === 0 && <EmptyState text="No appointments booked yet." link="/styling" linkLabel="Book a session" />}
            {bookings.map((b) => (
              <div key={b.id} className="border border-line p-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-serif-display text-lg text-espresso capitalize">
                    {b.type.replace("-", " ")} appointment
                  </p>
                  <p className="mt-1 text-sm text-espresso/60">
                    {formatDate(b.date)} · {b.time}
                  </p>
                </div>
                <span className="bg-ivory-deep border border-line px-3 py-1 text-[0.62rem] tracking-luxe uppercase">
                  {bookingStatusLabel[b.status]}
                </span>
              </div>
            ))}
          </div>
        )}

        {tab === "bespoke" && (
          <div className="space-y-4">
            {bespokeRequests.length === 0 && <EmptyState text="No custom orders started." link="/bespoke" linkLabel="Begin a bespoke piece" />}
            {bespokeRequests.map((r) => (
              <div key={r.id} className="border border-line p-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-serif-display text-lg text-espresso">{r.occasion}</p>
                  <p className="mt-1 text-sm text-espresso/60">Requested {formatDate(r.createdAt)}</p>
                </div>
                <span className="bg-ivory-deep border border-line px-3 py-1 text-[0.62rem] tracking-luxe uppercase">
                  {bespokeStatusLabel[r.status]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ text, link, linkLabel }: { text: string; link: string; linkLabel: string }) {
  return (
    <div className="text-center py-16 border border-dashed border-line">
      <p className="text-espresso/60">{text}</p>
      <Link href={link} className="btn-luxe btn-luxe-outline mt-6">{linkLabel}</Link>
    </div>
  );
}
