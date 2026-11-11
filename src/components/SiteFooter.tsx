import Link from "next/link";
import { site } from "@/data/site";
import { womenCollections, menCollections } from "@/data/collections";
import { WhatsAppIcon } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer className="bg-espresso-deep text-ivory/85">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-8">
          <div className="col-span-2 md:col-span-1">
            <p className="font-serif-display text-2xl tracking-[0.16em] text-ivory">BOUTIQUE</p>
            <p className="text-[0.6rem] tracking-luxe uppercase text-gold-soft mt-2">Luxury Fashion Studio</p>
            <p className="text-sm mt-5 leading-relaxed text-ivory/60 max-w-xs">
              Bespoke clothing and considered ready-to-wear, crafted by hand in our Mumbai atelier.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full border border-ivory/25 flex items-center justify-center hover:bg-ivory/10 transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              {Object.entries(site.socials).map(([name, href]) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="w-9 h-9 rounded-full border border-ivory/25 flex items-center justify-center text-sm capitalize hover:bg-ivory/10 transition-colors"
                >
                  {name.slice(0, 1)}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[0.68rem] tracking-luxe uppercase text-gold-soft mb-4">Women</h4>
            <ul className="space-y-2.5 text-sm text-ivory/65">
              {womenCollections.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <Link href={`/collections/${c.slug}`} className="hover:text-ivory transition-colors">
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[0.68rem] tracking-luxe uppercase text-gold-soft mb-4">Men</h4>
            <ul className="space-y-2.5 text-sm text-ivory/65 mb-8">
              {menCollections.map((c) => (
                <li key={c.id}>
                  <Link href={`/collections/${c.slug}`} className="hover:text-ivory transition-colors">
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-[0.68rem] tracking-luxe uppercase text-gold-soft mb-3">Atelier</h4>
            <ul className="space-y-2.5 text-sm text-ivory/65">
              <li><Link href="/bespoke" className="hover:text-ivory">Bespoke Studio</Link></li>
              <li><Link href="/bridal" className="hover:text-ivory">Bridal & Occasion</Link></li>
              <li><Link href="/styling" className="hover:text-ivory">Personal Styling</Link></li>
              <li><Link href="/about" className="hover:text-ivory">Our Story</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[0.68rem] tracking-luxe uppercase text-gold-soft mb-4">Visit</h4>
            <address className="not-italic text-sm text-ivory/65 leading-relaxed">
              {site.address.line1}
              <br />
              {site.address.city}, {site.address.state} {site.address.pincode}
              <br />
              India
            </address>
            <div className="mt-4 space-y-1 text-sm text-ivory/65">
              <p><a href={`mailto:${site.email}`} className="hover:text-ivory">{site.email}</a></p>
              <p><a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-ivory">{site.phone}</a></p>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-ivory/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ivory/45">
            © 2026 {site.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-ivory/45">
            <Link href="/about" className="hover:text-ivory">Craftsmanship</Link>
            <Link href="/account" className="hover:text-ivory">Track Order</Link>
            <Link href="/bespoke" className="hover:text-ivory">Custom Orders</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
