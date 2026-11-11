"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/types";
import { LuxeImage } from "@/components/LuxeImage";
import { useCart, useWishlist } from "@/components/CartProvider";
import { HeartIcon, CheckIcon, ShieldIcon, TruckIcon, PlusIcon, MinusIcon, CloseIcon } from "@/components/icons";
import { formatINR } from "@/lib/format";

export function ProductView({ product, related }: { product: Product; related: Product[] }) {
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const router = useRouter();
  const wished = has(product.id);

  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState<string>(product.sizes[0] ?? "");
  const [color, setColor] = useState<string>(product.colors[0]?.name ?? "");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const [delivery, setDelivery] = useState<{ state: "idle" | "loading" | "done"; text: string }>({
    state: "idle",
    text: "",
  });
  const [pincode, setPincode] = useState("");
  const imageRef = useRef<HTMLDivElement>(null);

  const image = product.images[activeImage] ?? product.images[0];

  function handleMouseMove(e: React.MouseEvent) {
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoom({ x, y });
  }

  function addToCart(goToCheckout = false) {
    if (product.stock <= 0) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      size,
      color,
      quantity: qty,
      unitPrice: product.price,
      imageTone: image.tone,
      imageSrc: image.src,
    });
    if (goToCheckout) {
      router.push("/checkout");
      return;
    }
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  function checkDelivery(e: React.FormEvent) {
    e.preventDefault();
    setDelivery({ state: "loading", text: "" });
    window.setTimeout(() => {
      const pin = pincode.trim();
      const eta = /^[1-9][0-9]{5}$/.test(pin) ? "3–5 business days" : "based on your delivery pincode";
      setDelivery({ state: "done", text: eta });
    }, 700);
  }

  const sizes = product.sizes;
  const colors = product.colors;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <nav className="text-xs text-espresso/50 mb-6">
        <Link href="/collections" className="hover:text-espresso">Collections</Link>
        <span className="mx-2">/</span>
        <span className="text-espresso/70">{product.category}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* ---------- gallery ---------- */}
        <div>
          <div
            ref={imageRef}
            onMouseMove={zoom ? handleMouseMove : undefined}
            onMouseLeave={() => setZoom(null)}
            className="relative overflow-hidden aspect-[4/5] bg-champagne/30 group"
          >
            <div
              className="absolute inset-0 transition-transform duration-200"
              style={
                zoom
                  ? { transform: "scale(1.9)", transformOrigin: `${zoom.x}% ${zoom.y}%` }
                  : undefined
              }
            >
              <LuxeImage tone={image.tone} src={image.src} alt={image.alt ?? product.name} />
            </div>
            {product.stock <= 0 && (
              <span className="absolute left-4 top-4 bg-ink/80 text-ivory text-[0.65rem] tracking-luxe uppercase px-3 py-1.5">
                Temporarily unavailable
              </span>
            )}
            <span className="absolute bottom-4 right-4 text-[0.6rem] tracking-luxe uppercase text-espresso/40 bg-ivory/60 backdrop-blur px-2 py-1">
              Hover to zoom
            </span>
          </div>

          {/* thumbnails */}
          <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                aria-label={`View image ${i + 1}`}
                className={`relative w-20 h-24 shrink-0 overflow-hidden border transition-colors ${
                  i === activeImage ? "border-espresso" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <LuxeImage tone={img.tone} src={img.src} alt="" />
              </button>
            ))}
          </div>
        </div>

        {/* ---------- info ---------- */}
        <div>
          <p className="text-[0.68rem] tracking-luxe uppercase text-gold">{product.category}</p>
          <h1 className="mt-2 font-serif-display text-4xl lg:text-5xl text-espresso leading-tight">
            {product.name}
          </h1>
          <div className="mt-4 flex items-baseline gap-3">
            <p className="text-xl text-espresso">{formatINR(product.price)}</p>
            {product.compareAtPrice && (
              <p className="text-sm text-espresso/40 line-through">{formatINR(product.compareAtPrice)}</p>
            )}
          </div>

          <p className="mt-6 text-espresso/70 leading-relaxed">{product.shortDescription}</p>

          {/* colour */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <p className="label-luxe mb-0">Colour</p>
              <p className="text-sm text-espresso/70">{color}</p>
            </div>
            <div className="mt-3 flex gap-3 flex-wrap">
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  aria-label={c.name}
                  className={`w-9 h-9 rounded-full border-2 transition-transform ${color === c.name ? "border-espresso scale-105" : "border-transparent hover:scale-105"}`}
                  style={{ background: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* size */}
          <div className="mt-7">
            <div className="flex items-center justify-between">
              <p className="label-luxe mb-0">Size</p>
              <button onClick={() => setSizeGuideOpen(true)} className="text-xs underline underline-offset-4 text-espresso/60 hover:text-espresso">
                Size guide
              </button>
            </div>
            <div className="mt-3 flex gap-2 flex-wrap">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-11 px-3 h-11 text-sm border transition-colors ${
                    size === s ? "bg-espresso text-ivory border-espresso" : "border-line hover:border-espresso"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* quantity + ctas */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border border-line h-12">
              <button aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 h-full hover:bg-ivory-deep">
                <MinusIcon className="w-4 h-4" />
              </button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)} className="px-3 h-full hover:bg-ivory-deep">
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => addToCart()}
              disabled={product.stock <= 0}
              className="btn-luxe flex-1 h-12"
            >
              {added ? <><CheckIcon className="w-4 h-4" /> Added</> : "Add to Bag"}
            </button>
            <button
              aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
              onClick={() => toggle(product.id)}
              className={`w-12 h-12 border flex items-center justify-center transition-colors ${
                wished ? "bg-blush border-blush text-espresso" : "border-line hover:border-espresso"
              }`}
            >
              <HeartIcon className="w-5 h-5" filled={wished} />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button onClick={() => addToCart(true)} disabled={product.stock <= 0} className="btn-luxe btn-luxe-outline">
              Buy Now
            </button>
            {product.customizable && (
              <Link href={`/bespoke?product=${product.slug}`} className="btn-luxe w-full">
                Request Customization
              </Link>
            )}
          </div>

          {/* delivery estimate */}
          <div className="mt-8 p-5 bg-ivory-deep/40 border border-line-soft">
            <div className="flex items-center gap-3">
              <TruckIcon className="w-5 h-5 text-espresso/60" />
              <p className="text-sm text-espresso/70">Delivery estimate</p>
            </div>
            <form onSubmit={checkDelivery} className="mt-3 flex gap-2">
              <input
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter pincode"
                inputMode="numeric"
                maxLength={6}
                className="input-luxe flex-1"
                aria-label="Pincode"
              />
              <button type="submit" className="btn-luxe px-5">Check</button>
            </form>
            {delivery.state === "loading" && <p className="mt-2 text-xs text-espresso/50">Checking…</p>}
            {delivery.state === "done" && (
              <p className="mt-2 text-xs text-espresso/70">
                Estimated delivery: {delivery.text}. Shipping is complimentary over ₹25,000.
              </p>
            )}
          </div>

          {/* detail accordions */}
          <div className="mt-6 divide-y divide-line border-y border-line">
            {[
              { title: "Description", body: product.description },
              { title: "Fabric & Care", body: `${product.fabric} · ${product.embroidery}` },
            ].map((s) => (
              <details key={s.title} className="group py-4">
                <summary className="flex items-center justify-between cursor-pointer list-none text-[0.8rem] tracking-[0.14em] uppercase text-espresso">
                  {s.title}
                  <PlusIcon className="w-4 h-4 transition-transform group-open:rotate-45" />
                </summary>
                <p className="pt-3 text-sm text-espresso/65 leading-relaxed">{s.body}</p>
                {s.title === "Fabric & Care" && (
                  <ul className="pt-2 space-y-1 text-sm text-espresso/65 list-disc pl-5">
                    {product.care.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                )}
              </details>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 text-sm text-espresso/65">
            <div className="flex items-center gap-3">
              <ShieldIcon className="w-5 h-5 text-espresso/50" />
              Secure checkout — UPI, cards, net banking & Cash on Delivery
            </div>
            <div className="flex items-center gap-3">
              <PlusIcon className="w-4 h-4 text-espresso/50" />
              Eligible for customization & made-to-measure
            </div>
          </div>
        </div>
      </div>

      {/* related */}
      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-serif-display text-3xl text-espresso text-center">You may also love</h2>
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
            {related.map((p) => (
              <Link key={p.id} href={`/product/${p.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <LuxeImage
                    tone={p.images[0]?.tone ?? 0}
                    src={p.images[0]?.src}
                    alt={p.name}
                    className="absolute inset-0 w-full h-full transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="pt-3 text-center">
                  <p className="font-serif-display text-lg text-espresso">{p.name}</p>
                  <p className="text-sm text-espresso mt-1">{formatINR(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* size guide modal */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-[85] flex items-center justify-center p-4">
          <button aria-label="Close size guide" className="absolute inset-0 bg-black/50" onClick={() => setSizeGuideOpen(false)} />
          <div className="relative bg-ivory w-full max-w-lg p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif-display text-2xl text-espresso">Size Guide</h3>
              <button aria-label="Close" onClick={() => setSizeGuideOpen(false)} className="p-1">
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[0.68rem] tracking-luxe uppercase text-espresso/60 border-b border-line">
                  <th className="py-2">Size</th>
                  <th className="py-2">Bust (cm)</th>
                  <th className="py-2">Waist (cm)</th>
                  <th className="py-2">Hip (cm)</th>
                </tr>
              </thead>
              <tbody className="text-espresso/75">
                {[
                  ["XS", "82–86", "64–68", "90–94"],
                  ["S", "87–92", "69–74", "95–100"],
                  ["M", "93–98", "75–80", "101–106"],
                  ["L", "99–104", "81–86", "107–112"],
                  ["XL", "105–112", "87–94", "113–120"],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-line-soft">
                    <td className="py-2.5 font-medium">{row[0]}</td>
                    <td className="py-2.5">{row[1]}</td>
                    <td className="py-2.5">{row[2]}</td>
                    <td className="py-2.5">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-5 text-xs text-espresso/55 leading-relaxed">
              Made-to-measure is available for most pieces — we will confirm your exact measurements
              before we begin.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
