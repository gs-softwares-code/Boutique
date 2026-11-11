import Link from "next/link";
import { db } from "@/lib/db";
import { collections } from "@/data/collections";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { CollectionCard } from "@/components/CollectionCard";
import { LuxeImage } from "@/components/LuxeImage";
import { NewsletterForm } from "@/components/NewsletterForm";
import { ArrowRight, SparkleIcon, ScissorsIcon, ShieldIcon, TruckIcon } from "@/components/icons";

export default function HomePage() {
  const products = db.products();
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 4);
  const bestsellers = products.filter((p) => p.bestselling).slice(0, 4);
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const seasonal = products.filter((p) => p.seasonal).slice(0, 4);
  const womenCollections = collections.filter((c) => c.category === "women").slice(0, 6);

  const activeCampaigns = db.campaigns().filter((c) => c.active);
  const banner = activeCampaigns[0] ?? {
    title: "The Winter Atelier Edit",
    subtitle: "Velvet, silk and hand-finishing for the season — a focused wardrobe for evenings and celebrations.",
    cta: "Shop the Edit",
    href: "/collections?sort=seasonal",
    tone: 4,
  };

  return (
    <div>
      {/* ---------- HERO ---------- */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <LuxeImage
            tone={8}
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=85"
            alt="Boutique Luxury Editorial"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/60" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto text-ivory">
          <Reveal>
            <p className="text-[0.72rem] tracking-luxe uppercase text-gold-soft">The Luxury Fashion Studio</p>
            <h1 className="mt-6 font-serif-display text-5xl sm:text-6xl lg:text-7xl text-ivory leading-[1.05] text-balance">
              Elegance, Tailored to You.
            </h1>
            <p className="mt-6 text-ivory/85 leading-relaxed max-w-xl mx-auto">
              Bespoke couture and considered ready-to-wear, crafted by hand in our atelier for moments
              that deserve more than ordinary.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/collections" className="btn-luxe">
                Discover Collection
              </Link>
              <Link href="/styling" className="btn-luxe btn-luxe-light">
                Book a Styling
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- NEW ARRIVALS ---------- */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <SectionHeading
                align="left"
                eyebrow="Just arrived"
                title="New Arrivals"
                subtitle="Fresh from the atelier — consider each piece a quiet statement."
              />
              <Link
                href="/collections?sort=newest"
                className="shrink-0 inline-flex items-center gap-2 text-[0.7rem] tracking-luxe uppercase text-espresso hover:opacity-60"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
            {newArrivals.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <ProductCard product={p} priority={i < 2} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- EXCLUSIVE COLLECTIONS ---------- */}
      <section className="py-16 lg:py-24 bg-ivory-deep/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="The edit"
              title="Exclusive Collections"
              subtitle="Curated worlds of drape, texture and silhouette."
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {womenCollections.map((c, i) => (
              <Reveal key={c.id} delay={i * 70}>
                <CollectionCard collection={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- BESTSELLING ---------- */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow="Most loved" title="Bestselling Designs" />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
            {bestsellers.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FEATURED DESIGNER PIECES ---------- */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow="The atelier" title="Featured Designer Pieces" />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- SEASONAL CAMPAIGN ---------- */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-espresso text-ivory">
            <div className="absolute inset-0 opacity-55">
              <LuxeImage
                tone={banner.tone}
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=80"
                alt="Seasonal Campaign"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/80 to-transparent" />
            <div className="relative z-10 px-6 sm:px-12 py-14 lg:py-20 max-w-xl">
              <Reveal>
                <p className="text-[0.7rem] tracking-luxe uppercase text-gold-soft">The Seasonal Campaign</p>
                <h2 className="mt-4 font-serif-display text-4xl lg:text-5xl leading-tight">
                  {banner.title}
                </h2>
                <p className="mt-5 text-ivory/70 leading-relaxed">{banner.subtitle}</p>
                <Link href={banner.href} className="btn-luxe btn-luxe-light mt-8">
                  {banner.cta}
                </Link>
              </Reveal>
            </div>
          </div>
          {seasonal.length > 0 && (
            <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
              {seasonal.map((p, i) => (
                <Reveal key={p.id} delay={i * 70}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ---------- THE BOUTIQUE STORY ---------- */}
      <section className="py-20 lg:py-28 bg-ivory-deep/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden shadow-xl">
              <LuxeImage
                tone={1}
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80"
                alt="The Boutique Atelier Story"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Our story"
                title="The Boutique Story"
                subtitle="Boutique began with a single belief: that clothing should be considered, personal and made to be kept. Today, our atelier pairs heritage craft with modern tailoring to dress moments that matter."
              />
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-8 space-y-4 text-espresso/70 leading-relaxed text-[0.95rem]">
                <p>
                  Every piece is cut, stitched and finished by hand — from a single draped silk to a
                  fully bespoke bridal lehenga.
                </p>
                <p>
                  We work one-on-one with clients to understand silhouette, occasion and character,
                  because elegance is always personal.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <Link href="/about" className="btn-luxe btn-luxe-outline mt-8">
                Read our story
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- SIGNATURE CRAFTSMANSHIP ---------- */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow="The craft" title="Signature Craftsmanship" />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: <ScissorsIcon className="w-6 h-6" />, title: "Hand Cut", text: "Each pattern is measured, cut and draped by master artisans." },
              { icon: <SparkleIcon className="w-6 h-6" />, title: "Embroidered by Hand", text: "Zardozi, gota and resham — worked slowly, meticulously." },
              { icon: <ShieldIcon className="w-6 h-6" />, title: "Finest Fabrics", text: "Silks, organza and breathable cotton, sourced for hand-feel." },
              { icon: <TruckIcon className="w-6 h-6" />, title: "Delivered to You", text: "Careful packaging and tracked delivery across India." },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-full border border-line flex items-center justify-center text-espresso">
                    {f.icon}
                  </div>
                  <h3 className="mt-5 font-serif-display text-xl text-espresso">{f.title}</h3>
                  <p className="mt-3 text-sm text-espresso/60 leading-relaxed">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PERSONALIZED STYLING CTA ---------- */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <div className="relative overflow-hidden border border-line">
              <div className="absolute inset-0 opacity-40">
                <LuxeImage
                  tone={6}
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80"
                  alt="Personal Styling Consultation"
                />
              </div>
              <div className="absolute inset-0 bg-ivory/70" />
              <div className="relative z-10 py-16 lg:py-20 px-6">
                <p className="text-[0.7rem] tracking-luxe uppercase text-gold">Personal styling</p>
                <h2 className="mt-4 font-serif-display text-4xl lg:text-5xl text-espresso leading-tight">
                  Let us curate your wardrobe.
                </h2>
                <p className="mt-5 text-espresso/70 max-w-md mx-auto leading-relaxed">
                  Book a complimentary consultation and receive outfit recommendations tailored to your
                  occasions, silhouette and taste.
                </p>
                <Link href="/styling" className="btn-luxe mt-8">
                  Book an Appointment
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- INSTAGRAM GALLERY ---------- */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow="@boutique.studio" title="From the Atelier" />
          </Reveal>
          <div className="mt-12 grid grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {[
              "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
            ].map((imgUrl, i) => (
              <Reveal key={i} delay={i * 60}>
                <Link
                  href="/collections"
                  aria-label="Explore the gallery"
                  className="block aspect-square overflow-hidden relative group"
                >
                  <div className="absolute inset-0 transition-transform duration-[1400ms] group-hover:scale-105">
                    <LuxeImage tone={i} src={imgUrl} alt={`Atelier snapshot ${i + 1}`} />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- NEWSLETTER ---------- */}
      <section className="py-20 lg:py-24 bg-espresso-deep text-ivory">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <p className="text-[0.7rem] tracking-luxe uppercase text-gold-soft">The atelier circle</p>
            <h2 className="mt-4 font-serif-display text-3xl sm:text-4xl">
              Join our mailing list
            </h2>
            <p className="mt-4 text-ivory/65 text-sm leading-relaxed">
              New collections, private previews and atelier news — written, never spammed.
            </p>
            <div className="mt-8">
              <NewsletterForm />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
