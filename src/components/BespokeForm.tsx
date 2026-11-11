"use client";

import { useRef, useState } from "react";
import { CheckIcon, CloseIcon } from "@/components/icons";

const OCCASIONS = ["Wedding", "Engagement", "Festive", "Party", "Evening", "Work", "Everyday", "Other"];
const GARMENTS = ["Lehenga", "Saree", "Anarkali", "Suit", "Sherwani", "Kurta", "Western", "Co-ord", "Other"];
const FABRICS = ["Silk", "Georgette", "Organza", "Velvet", "Linen", "Cotton", "Chanderi", "Blend / Unsure"];
const BUDGETS = ["Under ₹25,000", "₹25,000 – ₹50,000", "₹50,000 – ₹1,00,000", "Above ₹1,00,000"];

const MEASUREMENTS = [
  { id: "bust", label: "Bust / Chest (cm)" },
  { id: "waist", label: "Waist (cm)" },
  { id: "hip", label: "Hip (cm)" },
  { id: "shoulder", label: "Shoulder (cm)" },
  { id: "length", label: "Desired length (cm)" },
];

export function BespokeForm({ initialProduct }: { initialProduct?: string }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    occasion: "",
    garment: "",
    fabric: "",
    color: "",
    budgetRange: "",
    designNotes: "",
  });
  const [measurements, setMeasurements] = useState<Record<string, string>>({});
  const [references, setReferences] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  function addReferences(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const remaining = 3 - references.length;
    files.slice(0, remaining).forEach((file) => {
      if (file.size > 2.5 * 1024 * 1024) return;
      const reader = new FileReader();
      reader.onload = () => {
        const url = String(reader.result);
        setReferences((prev) => (prev.length < 3 ? [...prev, url] : prev));
      };
      reader.readAsDataURL(file);
    });
    if (fileRef.current) fileRef.current.value = "";
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/bespoke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          measurements,
          references: references.map((r, i) => ({ name: `Reference ${i + 1}`, tone: i })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not submit your request.");
        setSubmitting(false);
        return;
      }
      setDone(true);
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="text-center py-12 border border-line p-8 bg-ivory-deep/30">
        <span className="mx-auto w-12 h-12 rounded-full bg-espresso text-ivory flex items-center justify-center">
          <CheckIcon className="w-6 h-6" />
        </span>
        <h3 className="mt-4 font-serif-display text-2xl text-espresso">Request received</h3>
        <p className="mt-2 text-sm text-espresso/60 max-w-sm mx-auto">
          Our atelier will review your brief and reach out within 2 business days to begin.
        </p>
      </div>
    );
  }

  const select = (options: string[], value: string, onChange: (v: string) => void, placeholder: string) => (
    <select className="input-luxe" value={value} onChange={(e) => onChange(e.target.value)} required>
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {initialProduct && (
        <p className="text-sm text-espresso/60 bg-ivory-deep/50 border border-line px-4 py-3">
          You&apos;re customizing a piece from our collection — reference it in your notes if helpful.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="label-luxe">Full name</label>
          <input className="input-luxe" value={form.name} onChange={(e) => set("name", e.target.value)} required />
        </div>
        <div>
          <label className="label-luxe">Email</label>
          <input type="email" className="input-luxe" value={form.email} onChange={(e) => set("email", e.target.value)} required />
        </div>
        <div>
          <label className="label-luxe">Mobile</label>
          <input inputMode="numeric" maxLength={10} className="input-luxe" value={form.phone} onChange={(e) => set("phone", e.target.value)} required />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label-luxe">Occasion</label>
          {select(OCCASIONS, form.occasion, (v) => set("occasion", v), "Select occasion")}
        </div>
        <div>
          <label className="label-luxe">Garment type</label>
          {select(GARMENTS, form.garment, (v) => set("garment", v), "Select garment")}
        </div>
        <div>
          <label className="label-luxe">Fabric preference</label>
          {select(FABRICS, form.fabric, (v) => set("fabric", v), "Select fabric")}
        </div>
        <div>
          <label className="label-luxe">Colour preference</label>
          <input className="input-luxe" placeholder="e.g. ivory with gold thread" value={form.color} onChange={(e) => set("color", e.target.value)} />
        </div>
        <div>
          <label className="label-luxe">Budget range</label>
          {select(BUDGETS, form.budgetRange, (v) => set("budgetRange", v), "Select budget")}
        </div>
      </div>

      <div>
        <label className="label-luxe">Design notes</label>
        <textarea
          className="input-luxe min-h-28"
          placeholder="Silhouette ideas, inspirations, embroidery preferences, timeline…"
          value={form.designNotes}
          onChange={(e) => set("designNotes", e.target.value)}
        />
      </div>

      {/* measurements */}
      <div>
        <label className="label-luxe">Measurements (optional — helps us begin)</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {MEASUREMENTS.map((m) => (
            <input
              key={m.id}
              className="input-luxe"
              placeholder={m.label}
              inputMode="decimal"
              value={measurements[m.id] ?? ""}
              onChange={(e) => setMeasurements((p) => ({ ...p, [m.id]: e.target.value }))}
            />
          ))}
        </div>
      </div>

      {/* references */}
      <div>
        <label className="label-luxe">Reference images (up to 3)</label>
        <input ref={fileRef} type="file" accept="image/*" multiple onChange={addReferences} className="block w-full text-sm text-espresso/60 file:mr-4 file:border-0 file:bg-espresso file:text-ivory file:px-4 file:py-2 file:text-xs file:tracking-luxe file:uppercase file:cursor-pointer" />
        {references.length > 0 && (
          <div className="mt-3 flex gap-3">
            {references.map((src, i) => (
              <div key={i} className="relative w-20 h-24 overflow-hidden border border-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Reference ${i + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  aria-label={`Remove reference ${i + 1}`}
                  onClick={() => setReferences((prev) => prev.filter((_, x) => x !== i))}
                  className="absolute top-1 right-1 w-5 h-5 bg-black/60 text-white flex items-center justify-center"
                >
                  <CloseIcon className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3">{error}</p>}

      <button type="submit" disabled={submitting} className="btn-luxe w-full">
        {submitting ? "Submitting…" : "Submit Custom Request"}
      </button>
    </form>
  );
}
