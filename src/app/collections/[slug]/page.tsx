import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { CollectionsBrowser } from "@/components/CollectionsBrowser";
import { LuxeImage } from "@/components/LuxeImage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = db.collectionBySlug(slug);
  if (!collection) return { title: "Collection not found" };
  return {
    title: collection.title,
    description: collection.description,
  };
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = db.collectionBySlug(slug);
  if (!collection) notFound();

  const products = db.productsByCollection(collection.id);
  const collections = db.collections();

  return (
    <div>
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <LuxeImage
            tone={collection.heroTone}
            src={collection.heroImage ?? collection.coverImage}
            alt={collection.title}
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pb-14 max-w-7xl mx-auto">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-[0.68rem] tracking-luxe uppercase text-ivory/70 hover:text-ivory mb-6"
          >
            ← All Collections
          </Link>
          <p className="text-[0.7rem] tracking-luxe uppercase text-gold-soft">
            {collection.category === "women" ? "Women" : "Men"} · {collection.subtitle}
          </p>
          <h1 className="mt-3 font-serif-display text-5xl sm:text-6xl lg:text-7xl text-ivory leading-none">
            {collection.title}
          </h1>
          <p className="mt-5 max-w-2xl text-ivory/80 text-sm sm:text-base leading-relaxed">
            {collection.description}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <CollectionsBrowser
          products={products}
          collections={collections}
          initial={{ collection: collection.slug, category: collection.category }}
        />
      </section>
    </div>
  );
}
