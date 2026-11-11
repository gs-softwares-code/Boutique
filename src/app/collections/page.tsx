import type { Metadata } from "next";
import { db } from "@/lib/db";
import { CollectionsBrowser } from "@/components/CollectionsBrowser";
import { LuxeImage } from "@/components/LuxeImage";

export const metadata: Metadata = {
  title: "Collections",
  description: "Explore women's and men's collections — designer suits, bridal wear, sarees, lehengas and bespoke pieces.",
};

export const dynamic = "force-dynamic";

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const category = typeof sp.category === "string" ? sp.category : undefined;
  const q = typeof sp.q === "string" ? sp.q : undefined;
  const sort = typeof sp.sort === "string" ? sp.sort : undefined;
  const collection = typeof sp.collection === "string" ? sp.collection : undefined;

  const products = db.products();
  const collections = db.collections();

  return (
    <div>
      <section className="relative h-[48vh] min-h-[340px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <LuxeImage
            tone={2}
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=85"
            alt="The Collections"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pb-12 max-w-7xl mx-auto">
          <p className="text-[0.7rem] tracking-luxe uppercase text-gold-soft">The edit</p>
          <h1 className="mt-3 font-serif-display text-4xl sm:text-5xl lg:text-6xl text-ivory">
            The Collections
          </h1>
          <p className="mt-4 max-w-xl text-ivory/75 text-sm sm:text-base leading-relaxed">
            Organized worlds of drape, cloth and silhouette — from everyday kurtis to fully bespoke
            couture.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <CollectionsBrowser
          products={products}
          collections={collections}
          initial={{ category, query: q, sort, collection }}
        />
      </section>
    </div>
  );
}
