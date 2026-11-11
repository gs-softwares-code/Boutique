"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@/components/admin/icons";
import type { Campaign } from "@/lib/types";

function blankCampaign(): Campaign {
  return {
    id: `camp-${Date.now()}`,
    title: "",
    subtitle: "",
    cta: "Shop the edit",
    href: "/collections",
    tone: 4,
    active: false,
  };
}

export function CampaignsManager() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    fetch("/api/admin/campaigns")
      .then((r) => r.json())
      .then((data) => setCampaigns(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  function update(i: number, patch: Partial<Campaign>) {
    setCampaigns((prev) => prev.map((c, idx) => (idx === i ? { ...c, ...patch } : c)));
  }

  async function save() {
    setSaving(true);
    setNotice("");
    const res = await fetch("/api/admin/campaigns", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(campaigns),
    });
    if (res.ok) setNotice("Campaigns saved. They appear on the homepage.");
    else setNotice("Failed to save campaigns.");
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 text-espresso/50 py-10">
        <Spinner className="w-5 h-5" /> Loading…
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-display text-3xl text-espresso">Homepage Content</h1>
          <p className="mt-1 text-sm text-espresso/55">Manage promotional campaign banners.</p>
        </div>
        <button onClick={() => setCampaigns((prev) => [...prev, blankCampaign()])} className="btn-luxe">+ Add campaign</button>
      </div>

      {notice && <p className="mt-4 text-sm text-espresso/70 bg-ivory-deep/50 px-4 py-3">{notice}</p>}

      <div className="mt-6 space-y-4">
        {campaigns.length === 0 && (
          <p className="text-sm text-espresso/50 border border-dashed border-line p-8 text-center">
            No campaigns yet. Add one to promote a seasonal edit or collection.
          </p>
        )}
        {campaigns.map((c, i) => (
          <div key={c.id} className="border border-line p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label-luxe">Title</label>
                <input className="input-luxe" value={c.title} onChange={(e) => update(i, { title: e.target.value })} />
              </div>
              <div>
                <label className="label-luxe">Button text</label>
                <input className="input-luxe" value={c.cta} onChange={(e) => update(i, { cta: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <label className="label-luxe">Subtitle</label>
                <input className="input-luxe" value={c.subtitle} onChange={(e) => update(i, { subtitle: e.target.value })} />
              </div>
              <div>
                <label className="label-luxe">Link (href)</label>
                <input className="input-luxe" value={c.href} onChange={(e) => update(i, { href: e.target.value })} />
              </div>
              <div>
                <label className="label-luxe">Art tone (0–11)</label>
                <input inputMode="numeric" className="input-luxe" value={String(c.tone)} onChange={(e) => update(i, { tone: Number(e.target.value) || 0 })} />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={c.active}
                  onChange={(e) => update(i, { active: e.target.checked })}
                  className="accent-espresso"
                />
                Active
              </label>
              <button onClick={() => setCampaigns((prev) => prev.filter((_, idx) => idx !== i))} className="text-red-700/80 hover:text-red-700 text-sm underline underline-offset-4">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {campaigns.length > 0 && (
        <button onClick={save} disabled={saving} className="btn-luxe mt-6">
          {saving ? "Saving…" : "Save campaigns"}
        </button>
      )}
    </div>
  );
}
