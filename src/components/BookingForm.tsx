"use client";

import { useMemo, useState } from "react";
import { CheckIcon } from "@/components/icons";

const BOOKING_TYPES = [
  { id: "styling", label: "Personal Styling" },
  { id: "bridal", label: "Bridal Consultation" },
  { id: "consultation", label: "Boutique Consultation" },
  { id: "fitted", label: "Fitting Session" },
];

const TIME_SLOTS = ["10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM"];

export function BookingForm({ defaultType = "styling" }: { defaultType?: string }) {
  const [type, setType] = useState(defaultType);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [occasion, setOccasion] = useState("");
  const [requirements, setRequirements] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const dates = useMemo(() => {
    const out: string[] = [];
    const d = new Date();
    while (out.length < 14) {
      d.setDate(d.getDate() + 1);
      const day = d.getDay();
      if (day !== 0) {
        out.push(
          `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
        );
      }
    }
    return out;
  }, []);

  function formatPickerLabel(value: string) {
    const [y, m, day] = value.split("-");
    const d = new Date(Number(y), Number(m) - 1, Number(day));
    return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, type, date, time, occasion, requirements }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not book the appointment.");
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
      <div className="text-center py-10 border border-line p-8 bg-ivory-deep/30">
        <span className="mx-auto w-12 h-12 rounded-full bg-espresso text-ivory flex items-center justify-center">
          <CheckIcon className="w-6 h-6" />
        </span>
        <h3 className="mt-4 font-serif-display text-2xl text-espresso">Your appointment is requested</h3>
        <p className="mt-2 text-sm text-espresso/60 max-w-sm mx-auto">
          Our concierge will confirm your slot by email within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label className="label-luxe">Appointment type</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {BOOKING_TYPES.map((t) => (
            <button
              type="button"
              key={t.id}
              onClick={() => setType(t.id)}
              className={`text-left px-4 py-3 text-sm border transition-colors ${
                type === t.id ? "border-espresso bg-ivory-deep/50" : "border-line hover:border-espresso"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label-luxe">Full name</label>
          <input className="input-luxe" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label className="label-luxe">Email</label>
          <input type="email" className="input-luxe" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="label-luxe">Mobile</label>
          <input inputMode="numeric" maxLength={10} className="input-luxe" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div>
          <label className="label-luxe">Occasion (optional)</label>
          <input className="input-luxe" value={occasion} onChange={(e) => setOccasion(e.target.value)} placeholder="Wedding, celebration, work…" />
        </div>
        <div>
          <label className="label-luxe">Preferred date</label>
          <select className="input-luxe" value={date} onChange={(e) => setDate(e.target.value)} required>
            <option value="">Select a date</option>
            {dates.map((d) => (
              <option key={d} value={d}>{formatPickerLabel(d)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-luxe">Preferred time</label>
          <select className="input-luxe" value={time} onChange={(e) => setTime(e.target.value)} required>
            <option value="">Select a time</option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="label-luxe">Special requirements (optional)</label>
        <textarea className="input-luxe min-h-24" value={requirements} onChange={(e) => setRequirements(e.target.value)} />
      </div>

      {error && <p className="text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3">{error}</p>}

      <button type="submit" disabled={submitting} className="btn-luxe w-full">
        {submitting ? "Requesting…" : "Confirm Appointment Request"}
      </button>
    </form>
  );
}
