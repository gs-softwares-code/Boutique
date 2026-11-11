import type { Metadata } from "next";
import { db } from "@/lib/db";
import { BespokeForm } from "@/components/BespokeForm";
import { LuxeImage } from "@/components/LuxeImage";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Bespoke & Custom Design Studio",
  description: "Request a fully custom outfit — choose fabric, design, measurements and more.",
};

export default async function BespokePage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const sp = await searchParams;
  const productSlug = typeof sp.product === "string" ? sp.product : undefined;
  const referencedProduct = productSlug ? db.productBySlug(productSlug) : undefined;

  return (
    <div>
      <section className="relative min-h-[52vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <LuxeImage
            tone={5}
            src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1800&q=80"
            alt="Bespoke Design Studio"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pb-12 max-w-7xl mx-auto">
          <p className="text-[0.7rem] tracking-luxe uppercase text-gold-soft">The atelier</p>
          <h1 className="mt-3 font-serif-display text-5xl sm:text-6xl text-ivory">
            Bespoke & Custom Design Studio
          </h1>
          <p className="mt-4 max-w-xl text-ivory/75 leading-relaxed">
            A piece conceived around you — silhouette, cloth, embroidery and finish, made by hand.
          </p>
        </div>
      </section>

      {/* process */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="How bespoke works" title="From brief to beautiful" />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { n: "01", t: "Your brief", d: "Share the occasion, inspiration and your ideas below." },
            { n: "02", t: "Consultation", d: "We discuss silhouette, fabric and embroidery one-on-one." },
            { n: "03", t: "Draft & sample", d: "A mock-up and fabric swatches confirm the design." },
            { n: "04", t: "Made by hand", d: "Cut, embroidered and finished by our artisans." },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <div className="border-t border-line pt-5">
                <span className="font-serif-display text-3xl text-champagne-deep">{s.n}</span>
                <h3 className="mt-3 font-serif-display text-xl text-espresso">{s.t}</h3>
                <p className="mt-2 text-sm text-espresso/60 leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* form */}
      <section className="pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="border border-line p-7 lg:p-10 bg-ivory-deep/30">
            <h2 className="font-serif-display text-3xl text-espresso">Request a custom outfit</h2>
            <p className="mt-2 text-sm text-espresso/60">
              Tell us where to begin — we&apos;ll take it from here.
            </p>
            <div className="mt-8">
              <BespokeForm initialProduct={referencedProduct?.name} />
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
