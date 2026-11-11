import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { CollectionCard } from "@/components/CollectionCard";
import { LuxeImage } from "@/components/LuxeImage";
import { WhatsAppIcon, ArrowRight } from "@/components/icons";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Bridal & Occasion Wear",
  description: "Exclusive bridal collections, engagement outfits and occasion wear with custom fitting and consultation.",
};

export default function BridalPage() {
  const products = db.products();
  const bridalCollections = db
    .collections()
    .filter((c) => ["c-bridal-wear", "c-festive-collections", "c-lehengas", "c-wedding-wear"].includes(c.id));
  const bridalPicks = products.filter((p) =>
    ["c-bridal-wear", "c-lehengas", "c-wedding-wear", "c-festive-collections"].includes(p.collectionId),
  ).slice(0, 8);

  const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello, I'd like to inquire about bridal couture at Boutique.")}`;

  return (
    <div>
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <LuxeImage
            tone={7}
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=85"
            alt="Bridal Couture Boutique"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pb-14 max-w-7xl mx-auto">
          <p className="text-[0.7rem] tracking-luxe uppercase text-gold-soft">Bridal & Occasion</p>
          <h1 className="mt-3 font-serif-display text-5xl sm:text-6xl lg:text-7xl text-ivory leading-none">
            Dressed for the day
          </h1>
          <p className="mt-5 max-w-xl text-ivory/80 leading-relaxed">
            Bridal couture, engagement looks and occasion wear — embroidered by hand and fitted to
            you alone.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/styling?type=bridal" className="btn-luxe btn-luxe-light">
              Book a Bridal Consultation
            </Link>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-luxe flex items-center gap-2 bg-[#128C7E] border-[#128C7E] hover:bg-[#0e756a]">
              <WhatsAppIcon className="w-4 h-4" /> WhatsApp Inquiry
            </a>
          </div>
        </div>
      </section>

      {/* bridal collections */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="For the occasion" title="Bridal & Occasion Collections" />
        </Reveal>
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
          {bridalCollections.map((c, i) => (
            <Reveal key={c.id} delay={i * 70}>
              <CollectionCard collection={c} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* picks */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col sm:flex-row items-end justify-between gap-4">
            <SectionHeading align="left" eyebrow="Curated" title="Occasion Edit" />
            <Link href="/collections" className="inline-flex items-center gap-2 text-[0.7rem] tracking-luxe uppercase text-espresso hover:opacity-60">
              All collections <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
          {bridalPicks.map((p, i) => (
            <Reveal key={p.id} delay={i * 60}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* services / fitting */}
      <section className="py-20 bg-ivory-deep/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Bespoke service"
                title="Custom fitting & trousseau planning"
                subtitle="Our bridal atelier works with you over several sittings — from the first sketch to the final fitting."
              />
            </Reveal>
            <Reveal delay={100}>
              <ul className="mt-8 space-y-3 text-sm text-espresso/70">
                {[
                  "Dedicated bridal stylist through your journey",
                  "Bespoke silhouettes — lehenga, gown or sherwani",
                  "Hand embroidery, zardozi and heirloom details",
                  "Complete trousseau & gifting coordination",
                  "Home fittings available across Mumbai",
                ].map((x) => (
                  <li key={x} className="flex gap-3">
                    <span className="text-gold mt-0.5">✦</span> {x}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/bespoke" className="btn-luxe">Begin Bespoke</Link>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-luxe btn-luxe-outline flex items-center gap-2">
                  <WhatsAppIcon className="w-4 h-4" /> Chat with the Atelier
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden shadow-xl">
              <LuxeImage
                tone={9}
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80"
                alt="Bridal Trousseau"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
