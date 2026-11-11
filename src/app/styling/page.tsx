import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { LuxeImage } from "@/components/LuxeImage";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Personal Styling & Appointments",
  description: "Book a boutique consultation, personal styling session or bridal consultation with our atelier.",
};

export default async function StylingPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const sp = await searchParams;
  const type = typeof sp.type === "string" && ["styling", "bridal", "consultation", "fitted"].includes(sp.type) ? sp.type : "styling";

  return (
    <div>
      <section className="relative min-h-[52vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <LuxeImage
            tone={7}
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1800&q=80"
            alt="Personal Styling Studio"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pb-12 max-w-7xl mx-auto">
          <p className="text-[0.7rem] tracking-luxe uppercase text-gold-soft">Personal styling</p>
          <h1 className="mt-3 font-serif-display text-5xl sm:text-6xl text-ivory">
            Styling, tailored to you
          </h1>
          <p className="mt-4 max-w-xl text-ivory/75 leading-relaxed">
            Book a private consultation and our stylists will curate outfits for your occasions,
            silhouette and taste — in store or online.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div>
          <Reveal>
            <SectionHeading align="left" eyebrow="How it works" title="The styling experience" />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-8 space-y-6">
              {[
                { n: "01", t: "Tell us about you", d: "Occasions, budget and the pieces you're looking for." },
                { n: "02", t: "We curate", d: "Your stylist selects a considered edit from the atelier." },
                { n: "03", t: "Review in private", d: "Try, adjust and fall in love — in store or via video call." },
                { n: "04", t: "Made to be kept", d: "Order, bespoke tailoring or a full made-to-measure piece." },
              ].map((s) => (
                <div key={s.n} className="flex gap-5">
                  <span className="font-serif-display text-3xl text-champagne-deep">{s.n}</span>
                  <div>
                    <h3 className="font-serif-display text-xl text-espresso">{s.t}</h3>
                    <p className="mt-1 text-sm text-espresso/60 leading-relaxed">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-8 text-sm text-espresso/55 leading-relaxed p-5 border border-line bg-ivory-deep/30">
              Styling consultations are complimentary for clients. Bridal consultations include a
              dedicated stylist and full trousseau planning.
            </p>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="border border-line p-7 lg:p-9 bg-ivory-deep/30 sticky top-24">
            <h2 className="font-serif-display text-3xl text-espresso mb-6">Book an appointment</h2>
            <BookingForm defaultType={type} />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
