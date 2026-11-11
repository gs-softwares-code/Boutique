"use client";

import { useMemo, useState } from "react";
import type { Product, Collection } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";
import { ChevronDown, CloseIcon } from "@/components/icons";

type SortKey = "featured" | "newest" | "price-asc" | "price-desc" | "name";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name: A–Z" },
];

const PRICE_BANDS = [
  { label: "All prices", min: 0, max: Infinity },
  { label: "Under ₹15,000", min: 0, max: 15000 },
  { label: "₹15,000 – ₹30,000", min: 15000, max: 30000 },
  { label: "Above ₹30,000", min: 30000, max: Infinity },
];

export interface CollectionsInit {
  category?: string;
  query?: string;
  collection?: string;
  sort?: string;
}

export function CollectionsBrowser({
  products,
  collections,
  initial = {},
}: {
  products: Product[];
  collections: Collection[];
  initial?: CollectionsInit;
}) {
  const [category, setCategory] = useState<string>(initial.category ?? "all");
  const [query, setQuery] = useState(initial.query ?? "");
  const [qInput, setQInput] = useState(initial.query ?? "");
  const [collectionSlug, setCollectionSlug] = useState<string>(initial.collection ?? "all");
  const [sort, setSort] = useState<SortKey>((initial.sort as SortKey) || "featured");
  const [priceBand, setPriceBand] = useState(0);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const allSizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.sizes.forEach((s) => set.add(s)));
    return [...set];
  }, [products]);

  const allColors = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.colors.forEach((c) => set.add(c.name)));
    return [...set];
  }, [products]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (collectionSlug !== "all") {
      const coll = collections.find((c) => c.slug === collectionSlug);
      if (coll) list = list.filter((p) => p.collectionId === coll.id);
    }
    if (category !== "all") {
      const ids = collections.filter((c) => c.category === category).map((c) => c.id);
      list = list.filter((p) => ids.includes(p.collectionId));
    }
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((p) =>
        [p.name, p.category, p.shortDescription, p.description, p.fabric, p.tags.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(q),
      );
    }
    const band = PRICE_BANDS[priceBand];
    list = list.filter((p) => p.price >= band.min && p.price <= band.max);
    if (sizes.length) list = list.filter((p) => p.sizes.some((s) => sizes.includes(s)));
    if (colors.length) list = list.filter((p) => p.colors.some((c) => colors.includes(c.name)));
    if (inStockOnly) list = list.filter((p) => p.stock > 0);

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        list = list.filter((p) => p.newArrival).concat(list.filter((p) => !p.newArrival));
        break;
      default:
        list = list.filter((p) => p.featured).concat(list.filter((p) => !p.featured));
    }
    return list;
  }, [products, collections, collectionSlug, category, query, priceBand, sizes, colors, inStockOnly, sort]);

  function toggleSize(s: string) {
    setSizes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  }
  function toggleColor(c: string) {
    setColors((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  }

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    setQuery(qInput);
  }

  const hasActiveFilters =
    category !== "all" ||
    collectionSlug !== "all" ||
    query !== "" ||
    priceBand !== 0 ||
    sizes.length > 0 ||
    colors.length > 0 ||
    inStockOnly;

  function resetFilters() {
    setCategory("all");
    setCollectionSlug("all");
    setQuery("");
    setQInput("");
    setPriceBand(0);
    setSizes([]);
    setColors([]);
    setInStockOnly(false);
  }

  return (
    <div>
      {/* toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-y border-line py-3">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="flex items-center gap-2 text-[0.7rem] tracking-luxe uppercase border border-line px-3 py-2 hover:border-espresso transition-colors"
          >
            Filters
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>
          {hasActiveFilters && (
            <button onClick={resetFilters} className="flex items-center gap-1 text-[0.7rem] uppercase tracking-wide text-espresso/50 hover:text-espresso">
              <CloseIcon className="w-3.5 h-3.5" /> Clear all
            </button>
          )}
        </div>

        <form onSubmit={submitSearch} className="flex items-center gap-2">
          <input
            value={qInput}
            onChange={(e) => setQInput(e.target.value)}
            placeholder="Search within results…"
            className="border border-line bg-transparent px-3 py-2 text-sm w-44 sm:w-56 focus:border-espresso focus:outline-none"
            aria-label="Search within results"
          />
        </form>

        <div className="flex items-center gap-2">
          <label className="text-[0.65rem] uppercase tracking-luxe text-espresso/50 hidden sm:block">Sort</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="border border-line bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-espresso"
            aria-label="Sort products"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* filter panel */}
      {showFilters && (
        <div className="border-b border-line py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="text-[0.68rem] tracking-luxe uppercase text-espresso/60 mb-3">Category</h4>
            <div className="flex flex-wrap gap-2">
              {["all", "women", "men"].map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3 py-1.5 text-xs uppercase tracking-wide border transition-colors ${
                    category === c ? "bg-espresso text-ivory border-espresso" : "border-line hover:border-espresso"
                  }`}
                >
                  {c === "all" ? "All" : c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[0.68rem] tracking-luxe uppercase text-espresso/60 mb-3">Collection</h4>
            <select
              value={collectionSlug}
              onChange={(e) => setCollectionSlug(e.target.value)}
              className="w-full border border-line bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-espresso"
            >
              <option value="all">All collections</option>
              {collections.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h4 className="text-[0.68rem] tracking-luxe uppercase text-espresso/60 mb-3">Price</h4>
            <div className="flex flex-col gap-2">
              {PRICE_BANDS.map((band, i) => (
                <label key={band.label} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    checked={priceBand === i}
                    onChange={() => setPriceBand(i)}
                    className="accent-espresso"
                  />
                  {band.label}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <h4 className="text-[0.68rem] tracking-luxe uppercase text-espresso/60 mb-3">Size</h4>
              <div className="flex flex-wrap gap-2">
                {allSizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSize(s)}
                    className={`w-9 h-9 text-xs border transition-colors ${
                      sizes.includes(s) ? "bg-espresso text-ivory border-espresso" : "border-line hover:border-espresso"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[0.68rem] tracking-luxe uppercase text-espresso/60 mb-3">Colour</h4>
              <div className="flex flex-wrap gap-2">
                {allColors.map((name) => (
                  <button
                    key={name}
                    onClick={() => toggleColor(name)}
                    className={`px-3 py-1.5 text-xs border transition-colors ${
                      colors.includes(name) ? "bg-espresso text-ivory border-espresso" : "border-line hover:border-espresso"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="accent-espresso"
              />
              In stock only
            </label>
          </div>
        </div>
      )}

      {/* results count */}
      <div className="flex items-center justify-between py-4">
        <p className="text-sm text-espresso/55">
          {filtered.length} {filtered.length === 1 ? "design" : "designs"}
        </p>
      </div>

      {/* grid */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-serif-display text-2xl text-espresso">No pieces match your selection</p>
          <p className="mt-2 text-sm text-espresso/55">Try widening a filter or clearing your search.</p>
          <button onClick={resetFilters} className="btn-luxe btn-luxe-outline mt-6">
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-8 pb-20">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 4} />
          ))}
        </div>
      )}
    </div>
  );
}
