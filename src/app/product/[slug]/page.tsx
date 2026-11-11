import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ProductView } from "@/components/ProductView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = db.productBySlug(slug);
  if (!product) return { title: "Design not found" };
  return {
    title: product.name,
    description: product.shortDescription || product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = db.productBySlug(slug);
  if (!product) notFound();

  const all = db.products();
  const sameCollection = all.filter((p) => p.collectionId === product.collectionId && p.id !== product.id);
  const related =
    sameCollection.length >= 4
      ? sameCollection.slice(0, 4)
      : sameCollection
          .concat(all.filter((p) => p.id !== product.id && p.collectionId !== product.collectionId))
          .slice(0, 4);

  return <ProductView product={product} related={related} />;
}
