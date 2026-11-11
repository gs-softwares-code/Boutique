"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { LuxeImage } from "@/components/LuxeImage";
import { Spinner } from "@/components/admin/icons";
import { formatINR } from "@/lib/format";
import type { Product, Collection, ColorVariant } from "@/lib/types";

const COLOR_HEX: Record<string, string> = {
  Ivory: "#f4ecdd",
  Espresso: "#3b2f28",
  Blush: "#e4cfc6",
  Black: "#16120f",
  Wine: "#6b2430",
  Rose: "#c2787e",
  Gold: "#c5ad82",
  "Midnight": "#1e2a44",
  Beige: "#d8c7ab",
  Seafoam: "#b8cdc0",
  Maroon: "#7a2733",
  Indigo: "#2d3a5c",
  Navy: "#1f2d4d",
};

interface EditorState {
  id?: string;
  name: string;
  collectionId: string;
  category: string;
  price: string;
  stock: string;
  sizes: string;
  colors: string;
  shortDescription: string;
  description: string;
  fabric: string;
  embroidery: string;
  care: string;
  tones: string;
  customizable: boolean;
  newArrival: boolean;
  bestselling: boolean;
  featured: boolean;
  seasonal: boolean;
  editorial: boolean;
  designerPiece: boolean;
}

const emptyEditor: EditorState = {
  name: "",
  collectionId: "",
  category: "",
  price: "",
  stock: "8",
  sizes: "XS, S, M, L, XL",
  colors: "Ivory, Espresso, Blush",
  shortDescription: "",
  description: "",
  fabric: "",
  embroidery: "",
  care: "Dry clean only",
  tones: "",
  customizable: false,
  newArrival: false,
  bestselling: false,
  featured: false,
  seasonal: false,
  editorial: false,
  designerPiece: false,
};

const BOOL_KEYS = [
  "customizable",
  "newArrival",
  "bestselling",
  "featured",
  "seasonal",
  "editorial",
  "designerPiece",
] as const;

const BOOL_LABELS: Record<(typeof BOOL_KEYS)[number], string> = {
  customizable: "Customizable",
  newArrival: "New Arrival",
  bestselling: "Bestseller",
  featured: "Featured",
  seasonal: "Seasonal",
  editorial: "Editorial",
  designerPiece: "Designer Piece",
};

export function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editor, setEditor] = useState<EditorState | null>(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    try {
      const [p, c] = await Promise.all([
        fetch("/api/admin/products").then((r) => r.json()),
        fetch("/api/products").then((r) => r.json()),
      ]);
      setProducts(p as Product[]);
      setCollections(c as Collection[]);
    } catch {
      setError("Could not load products.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => load(), 0);
    return () => window.clearTimeout(t);
  }, [load]);

  function openNew() {
    setEditor({ ...emptyEditor });
    setNotice("");
  }

  function openEdit(p: Product) {
    setEditor({
      id: p.id,
      name: p.name,
      collectionId: p.collectionId,
      category: p.category,
      price: String(p.price),
      stock: String(p.stock),
      sizes: p.sizes.join(", "),
      colors: p.colors.map((c) => c.name).join(", "),
      shortDescription: p.shortDescription,
      description: p.description,
      fabric: p.fabric,
      embroidery: p.embroidery,
      care: p.care.join(", "),
      tones: p.images.map((i) => i.tone).join(", "),
      customizable: p.customizable,
      newArrival: !!p.newArrival,
      bestselling: !!p.bestselling,
      featured: !!p.featured,
      seasonal: !!p.seasonal,
      editorial: !!p.editorial,
      designerPiece: !!p.designerPiece,
    });
    setNotice("");
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    load();
  }

  function parseColors(text: string): ColorVariant[] {
    return text
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((name) => ({ name, hex: COLOR_HEX[name] ?? "#d8cdbd" }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!editor) return;
    setSaving(true);
    setNotice("");
    const payload = {
      name: editor.name,
      collectionId: editor.collectionId,
      category: editor.category,
      price: Number(editor.price),
      stock: Number(editor.stock) || 0,
      sizes: editor.sizes.split(",").map((s) => s.trim()).filter(Boolean),
      colors: parseColors(editor.colors),
      shortDescription: editor.shortDescription,
      description: editor.description,
      fabric: editor.fabric,
      embroidery: editor.embroidery,
      care: editor.care.split(",").map((s) => s.trim()).filter(Boolean),
      tones: editor.tones.split(",").map((s) => Number(s.trim())).filter((n) => Number.isFinite(n)),
      customizable: editor.customizable,
      newArrival: editor.newArrival,
      bestselling: editor.bestselling,
      featured: editor.featured,
      seasonal: editor.seasonal,
      editorial: editor.editorial,
      designerPiece: editor.designerPiece,
    };

    try {
      const res = editor.id
        ? await fetch(`/api/admin/products/${editor.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/admin/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
      const data = await res.json();
      if (!res.ok) {
        setNotice(`Error: ${data.error ?? "Failed to save."}`);
        return;
      }
      setNotice(editor.id ? "Product updated." : "Product created.");
      setEditor(null);
      load();
    } catch {
      setNotice("Error saving product.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-display text-3xl text-espresso">Products</h1>
          <p className="mt-1 text-sm text-espresso/55">{products.length} designs</p>
        </div>
        <button onClick={openNew} className="btn-luxe">+ Add product</button>
      </div>

      {notice && <p className="mt-4 text-sm text-espresso/70 bg-ivory-deep/50 px-4 py-3">{notice}</p>}

      {loading ? (
        <div className="flex items-center gap-3 text-espresso/50 py-10">
          <Spinner className="w-5 h-5" /> Loading…
        </div>
      ) : error ? (
        <p className="text-red-700 py-10">{error}</p>
      ) : (
        <div className="mt-6 border border-line overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr className="text-left text-[0.65rem] tracking-luxe uppercase text-espresso/55 border-b border-line">
                <th className="px-4 py-3">Design</th>
                <th className="px-4 py-3">Collection</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Badges</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-ivory-deep/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-15 h-[60px] shrink-0 overflow-hidden">
                        <LuxeImage tone={p.images[0]?.tone ?? 0} src={p.images[0]?.src} alt={p.name} />
                      </div>
                      <Link href={`/product/${p.slug}`} className="font-medium hover:underline">{p.name}</Link>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-espresso/60">{p.category}</td>
                  <td className="px-4 py-3">{formatINR(p.price)}</td>
                  <td className="px-4 py-3">
                    <span className={p.stock <= 0 ? "text-red-700" : p.stock <= 3 ? "text-amber-700" : ""}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      {p.newArrival && <Badge>New</Badge>}
                      {p.bestselling && <Badge>Best</Badge>}
                      {p.seasonal && <Badge>Seasonal</Badge>}
                      {p.featured && <Badge>Featured</Badge>}
                      {p.customizable && <Badge>Custom</Badge>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button onClick={() => openEdit(p)} className="text-espresso/70 hover:text-espresso underline underline-offset-4 mr-4">Edit</button>
                    <button onClick={() => remove(p.id)} className="text-red-700/80 hover:text-red-700 underline underline-offset-4">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editor && (
        <div className="fixed inset-0 z-[85] overflow-y-auto">
          <button aria-label="Close editor" className="fixed inset-0 bg-black/50" onClick={() => setEditor(null)} />
          <div className="relative bg-ivory max-w-3xl mx-auto my-10 p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif-display text-2xl text-espresso">
                {editor.id ? "Edit product" : "New product"}
              </h2>
              <button onClick={() => setEditor(null)} className="text-espresso/50 hover:text-espresso">Close</button>
            </div>
            <form onSubmit={save} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Name" required>
                  <input className="input-luxe" value={editor.name} onChange={(e) => setEditor({ ...editor, name: e.target.value })} />
                </Field>
                <Field label="Collection" required>
                  <select className="input-luxe" value={editor.collectionId} onChange={(e) => setEditor({ ...editor, collectionId: e.target.value })}>
                    <option value="">Select collection</option>
                    {collections.map((c) => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Category" required>
                  <input className="input-luxe" value={editor.category} onChange={(e) => setEditor({ ...editor, category: e.target.value })} />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Price (₹)" required>
                    <input inputMode="numeric" className="input-luxe" value={editor.price} onChange={(e) => setEditor({ ...editor, price: e.target.value })} />
                  </Field>
                  <Field label="Stock">
                    <input inputMode="numeric" className="input-luxe" value={editor.stock} onChange={(e) => setEditor({ ...editor, stock: e.target.value })} />
                  </Field>
                </div>
                <Field label="Sizes (comma separated)">
                  <input className="input-luxe" value={editor.sizes} onChange={(e) => setEditor({ ...editor, sizes: e.target.value })} />
                </Field>
                <Field label="Colours">
                  <input className="input-luxe" value={editor.colors} onChange={(e) => setEditor({ ...editor, colors: e.target.value })} />
                </Field>
                <Field label="Image tones (0–11)">
                  <input className="input-luxe" value={editor.tones} onChange={(e) => setEditor({ ...editor, tones: e.target.value })} />
                </Field>
                <Field label="Fabric">
                  <input className="input-luxe" value={editor.fabric} onChange={(e) => setEditor({ ...editor, fabric: e.target.value })} />
                </Field>
                <Field label="Embroidery">
                  <input className="input-luxe" value={editor.embroidery} onChange={(e) => setEditor({ ...editor, embroidery: e.target.value })} />
                </Field>
              </div>
              <Field label="Short description">
                <textarea className="input-luxe min-h-16" value={editor.shortDescription} onChange={(e) => setEditor({ ...editor, shortDescription: e.target.value })} />
              </Field>
              <Field label="Full description">
                <textarea className="input-luxe min-h-24" value={editor.description} onChange={(e) => setEditor({ ...editor, description: e.target.value })} />
              </Field>
              <Field label="Care instructions (comma separated)">
                <input className="input-luxe" value={editor.care} onChange={(e) => setEditor({ ...editor, care: e.target.value })} />
              </Field>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {BOOL_KEYS.map((key) => (
                  <label key={key} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editor[key]}
                      onChange={(e) =>
                        setEditor((prev) =>
                          prev ? ({ ...prev, [key]: e.target.checked } as EditorState) : prev,
                        )
                      }
                      className="accent-espresso"
                    />
                    {BOOL_LABELS[key]}
                  </label>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-luxe">
                  {saving ? "Saving…" : editor.id ? "Save changes" : "Create product"}
                </button>
                <button type="button" onClick={() => setEditor(null)} className="btn-luxe btn-luxe-outline">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="label-luxe">{label} {required && <span className="text-red-700">*</span>}</label>
      {children}
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="bg-ivory-deep border border-line px-1.5 py-0.5 text-[0.6rem] tracking-wide uppercase">{children}</span>;
}
