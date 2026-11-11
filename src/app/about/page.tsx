import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { LuxeImage } from "@/components/LuxeImage";

export const metadata: Metadata = {
  title: "About the Boutique",
  description: "The story, philosophy and craft behind Boutique luxury fashion studio.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative min-h-[54vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <LuxeImage
            tone={1}
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1800&q=80"
            alt="Boutique Atelier"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pb-12 max-w-7xl mx-auto">
          <p className="text-[0.7rem] tracking-luxe uppercase text-gold-soft">Our story</p>
          <h1 className="mt-3 font-serif-display text-5xl sm:text-6xl text-ivory">
            The Boutique Story
          </h1>
        </div>
      </section>

      {/* brand story */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden shadow-xl">
            <LuxeImage
              tone={3}
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80"
              alt="Atelier Crafts"
            />
          </div>
        </Reveal>
        <div>
          <Reveal>
            <SectionHeading align="left" eyebrow="Founded in Mumbai" title="Considered clothing, made to be kept" />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-6 space-y-5 text-espresso/70 leading-relaxed">
              <p>
                Boutique began in a small Mumbai atelier with a single belief: that what we wear
                should be considered, personal, and made to last. We felt fashion had drifted toward
                the hurried and disposable — and we wanted to build the opposite.
              </p>
              <p>
                Today, our studio pairs heritage Indian craft with clean, modern tailoring. Every
                piece is cut, draped, embroidered and finished by hand, in close conversation with
                the person who will wear it.
              </p>
              <p>
                We work slowly, and we work one-on-one. Because elegance is never generic — it is
                always, quietly, yours.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* philosophy + craft */}
      <section className="py-20 bg-ivory-deep/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow="What we stand for" title="Philosophy & Craftsmanship" />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { t: "Craft, first", d: "Zardozi, gota, resham — embroidery worked slowly by hand, never rushed." },
              { t: "Cloth that speaks", d: "Silks, organza, linen and handleom cotton chosen for hand-feel and drape." },
              { t: "Personal by design", d: "Every piece is made for a person, a moment, a story." },
            ].map((x, i) => (
              <Reveal key={x.t} delay={i * 80}>
                <div className="border border-line bg-ivory p-7">
                  <h3 className="font-serif-display text-2xl text-espresso">{x.t}</h3>
                  <p className="mt-3 text-sm text-espresso/60 leading-relaxed">{x.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* design process */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="How we design" title="The design process" />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { t: "Listen", d: "It begins with you — occasion, silhouette, the feeling you want." },
            { t: "Sketch", d: "Our designers translate that into line, proportion and drape." },
            { t: "Select", d: "Cloth, colour and embroidery are chosen for the piece." },
            { t: "Make", d: "Skilled hands cut, stitch and finish the garment." },
          ].map((s, i) => (
            <Reveal key={s.t} delay={i * 70}>
              <div className="border-t border-line pt-5">
                <h3 className="font-serif-display text-xl text-espresso">{s.t}</h3>
                <p className="mt-2 text-sm text-espresso/60 leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* studio images */}
      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="The studio" title="Inside the atelier" />
        </Reveal>
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
          ].map((url, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <LuxeImage tone={i} src={url} alt={`Atelier space ${i + 1}`} />
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <div className="mt-14 text-center">
            <p className="text-espresso/60">Experience it yourself</p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link href="/styling" className="btn-luxe">Book a Styling</Link>
              <Link href="/bespoke" className="btn-luxe btn-luxe-outline">Begin a Bespoke Piece</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
