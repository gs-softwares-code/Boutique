"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import { LuxeImage } from "@/components/LuxeImage";
import { ShieldIcon, CheckIcon, ArrowLeft } from "@/components/icons";
import { formatINR } from "@/lib/format";
import { site } from "@/data/site";
import { applyCoupon } from "@/lib/coupons";

interface AddressState {
  fullName: string;
  email: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
}

const emptyAddress: AddressState = {
  fullName: "",
  email: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
};

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI", hint: "GPay, PhonePe, Paytm & more" },
  { id: "card", label: "Credit / Debit Card", hint: "Visa, Mastercard, RuPay" },
  { id: "netbanking", label: "Net Banking", hint: "All major Indian banks" },
  { id: "cod", label: "Cash on Delivery", hint: "Pay at your door" },
] as const;

type MethodId = (typeof PAYMENT_METHODS)[number]["id"];

export function CheckoutForm() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();

  const [address, setAddress] = useState<AddressState>(emptyAddress);
  const [method, setMethod] = useState<MethodId>("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [bank, setBank] = useState("");
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponMessage, setCouponMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((me) => {
        if (me?.addresses?.length) {
          const a = me.addresses[0];
          setAddress((prev) => ({
            ...prev,
            fullName: me.name ?? prev.fullName,
            email: me.email ?? prev.email,
            line1: a.line1 ?? prev.line1,
            line2: a.line2 ?? prev.line2,
            city: a.city ?? prev.city,
            state: a.state ?? prev.state,
            pincode: a.pincode ?? prev.pincode,
            phone: a.phone ?? prev.phone,
          }));
        }
      });
  }, []);

  const discount = useMemo(() => coupon?.discount ?? 0, [coupon]);
  const shipping = useMemo(
    () => (subtotal - discount >= site.freeShippingAbove ? 0 : site.shippingBase),
    [subtotal, discount],
  );
  const total = subtotal - discount + shipping;

  function set<K extends keyof AddressState>(key: K, value: string) {
    setAddress((prev) => ({ ...prev, [key]: value }));
  }

  function applyCouponCode() {
    const res = applyCoupon(couponInput, subtotal);
    setCouponMessage(res.message);
    if (res.valid) {
      setCoupon({ code: couponInput.trim().toUpperCase(), discount: res.discount });
    } else {
      setCoupon(null);
    }
  }

  function validate(): string | null {
    if (!address.fullName.trim()) return "Please enter your full name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(address.email)) return "Please enter a valid email.";
    if (!/^[6-9][0-9]{9}$/.test(address.phone.trim())) return "Please enter a valid 10-digit mobile number.";
    if (!address.line1.trim()) return "Please enter your address.";
    if (!address.city.trim()) return "Please enter your city.";
    if (!address.state.trim()) return "Please enter your state.";
    if (!/^[1-9][0-9]{5}$/.test(address.pincode.trim())) return "Please enter a valid 6-digit pincode.";
    if (method === "upi" && !upiId.trim()) return "Please enter your UPI ID.";
    if (method === "card" && !/^[0-9]{12,19}$/.test(cardNumber.replace(/\s/g, ""))) return "Please enter a valid card number.";
    if (method === "netbanking" && !bank) return "Please select your bank.";
    return null;
  }

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    const problem = validate();
    if (problem) {
      setError(problem);
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          shippingAddress: {
            label: "Home",
            fullName: address.fullName,
            email: address.email,
            line1: address.line1,
            line2: address.line2 || undefined,
            city: address.city,
            state: address.state,
            pincode: address.pincode,
            phone: address.phone,
          },
          paymentMethod: method,
          couponCode: coupon?.code,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong placing your order.");
        setSubmitting(false);
        return;
      }
      clearCart();
      router.push(`/order/${data.orderId}?placed=1`);
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={placeOrder} className="grid lg:grid-cols-[1fr_400px] gap-10 items-start">
      <div className="space-y-10">
        {/* contact & shipping */}
        <section>
          <h2 className="font-serif-display text-2xl text-espresso mb-5">Contact & Shipping</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="label-luxe">Full name</label>
              <input className="input-luxe" value={address.fullName} onChange={(e) => set("fullName", e.target.value)} />
            </div>
            <div>
              <label className="label-luxe">Email</label>
              <input type="email" className="input-luxe" value={address.email} onChange={(e) => set("email", e.target.value)} />
            </div>
            <div>
              <label className="label-luxe">Mobile</label>
              <input inputMode="numeric" maxLength={10} className="input-luxe" value={address.phone} onChange={(e) => set("phone", e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className="label-luxe">Address line 1</label>
              <input className="input-luxe" value={address.line1} onChange={(e) => set("line1", e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className="label-luxe">Address line 2 (optional)</label>
              <input className="input-luxe" value={address.line2} onChange={(e) => set("line2", e.target.value)} />
            </div>
            <div>
              <label className="label-luxe">City</label>
              <input className="input-luxe" value={address.city} onChange={(e) => set("city", e.target.value)} />
            </div>
            <div>
              <label className="label-luxe">State</label>
              <input className="input-luxe" value={address.state} onChange={(e) => set("state", e.target.value)} />
            </div>
            <div>
              <label className="label-luxe">Pincode</label>
              <input inputMode="numeric" maxLength={6} className="input-luxe" value={address.pincode} onChange={(e) => set("pincode", e.target.value)} />
            </div>
          </div>
        </section>

        {/* payment */}
        <section>
          <h2 className="font-serif-display text-2xl text-espresso mb-5">Payment</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PAYMENT_METHODS.map((m) => (
              <button
                type="button"
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`text-left p-4 border transition-colors ${
                  method === m.id ? "border-espresso bg-ivory-deep/50" : "border-line hover:border-espresso"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{m.label}</span>
                  <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${method === m.id ? "border-espresso" : "border-line"}`}>
                    {method === m.id && <span className="w-2 h-2 rounded-full bg-espresso" />}
                  </span>
                </div>
                <p className="text-xs text-espresso/50 mt-1">{m.hint}</p>
              </button>
            ))}
          </div>

          {method === "upi" && (
            <div className="mt-4">
              <label className="label-luxe">UPI ID</label>
              <input className="input-luxe" placeholder="yourname@okhdfcbank" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
            </div>
          )}
          {method === "card" && (
            <div className="mt-4">
              <label className="label-luxe">Card number</label>
              <input className="input-luxe" inputMode="numeric" placeholder="XXXX XXXX XXXX XXXX" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
              <p className="text-xs text-espresso/45 mt-2 flex items-center gap-2">
                <ShieldIcon className="w-4 h-4" /> Demo checkout — no real payment is processed.
              </p>
            </div>
          )}
          {method === "netbanking" && (
            <div className="mt-4">
              <label className="label-luxe">Select bank</label>
              <select className="input-luxe" value={bank} onChange={(e) => setBank(e.target.value)}>
                <option value="">Choose your bank</option>
                {["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank", "Kotak Mahindra"].map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          )}
          {method === "cod" && (
            <p className="mt-4 text-sm text-espresso/60">
              Pay a {formatINR(site.shippingBase)} COD fee to our delivery partner on arrival — waived above ₹25,000.
            </p>
          )}
        </section>
      </div>

      {/* order summary */}
      <aside className="bg-ivory-deep/40 border border-line p-7 sticky top-24">
        <h2 className="font-serif-display text-2xl text-espresso mb-5">Order Summary</h2>
        <div className="space-y-4 max-h-72 overflow-y-auto pr-1 mb-5">
          {items.map((item) => (
            <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-3 items-center">
              <div className="relative w-14 h-18 h-[72px] shrink-0 overflow-hidden">
                <LuxeImage tone={item.imageTone} src={item.imageSrc} alt={item.name} />
              </div>
              <div className="flex-1 text-sm">
                <p className="leading-tight">{item.name}</p>
                <p className="text-espresso/50 text-xs mt-0.5">
                  {item.color} · {item.size} × {item.quantity}
                </p>
                <p className="mt-1">{formatINR(item.unitPrice * item.quantity)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2.5 text-sm border-t border-line pt-4">
          <div className="flex justify-between">
            <span className="text-espresso/60">Subtotal</span>
            <span>{formatINR(subtotal)}</span>
          </div>
          <div className="flex justify-between items-center gap-2">
            <input
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="Coupon code"
              className="input-luxe flex-1 !py-2"
            />
            <button type="button" onClick={applyCouponCode} className="btn-luxe px-4 !py-2">Apply</button>
          </div>
          {couponMessage && (
            <p className={`text-xs ${coupon ? "text-emerald-700" : "text-red-600"}`}>{couponMessage}</p>
          )}
          {coupon && (
            <div className="flex justify-between text-emerald-800">
              <span>Coupon ({coupon.code})</span>
              <span>− {formatINR(coupon.discount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-espresso/60">Shipping</span>
            <span>{shipping === 0 ? "Complimentary" : formatINR(shipping)}</span>
          </div>
          <div className="flex justify-between border-t border-line pt-3">
            <span className="font-medium">Total</span>
            <span className="font-serif-display text-2xl">{formatINR(total)}</span>
          </div>
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3">{error}</p>
        )}

        <button type="submit" disabled={submitting} className="btn-luxe w-full mt-5">
          {submitting ? "Placing order…" : <>Place Order <CheckIcon className="w-4 h-4" /></>}
        </button>
        <p className="mt-4 text-xs text-espresso/45 leading-relaxed flex items-start gap-2">
          <ShieldIcon className="w-4 h-4 shrink-0 mt-0.5" />
          Checkout is simulated — no real payment is taken. Delivery in 3–7 days within India.
        </p>
        <Link href="/cart" className="mt-4 inline-flex items-center gap-2 text-sm text-espresso/60 hover:text-espresso">
          <ArrowLeft className="w-4 h-4" /> Back to bag
        </Link>
      </aside>
    </form>
  );
}
