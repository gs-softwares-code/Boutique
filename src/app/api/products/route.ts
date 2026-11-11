import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");
  const collectionSlug = url.searchParams.get("collection");

  let products = db.products();
  if (slug) {
    products = products.filter((p) => p.slug === slug);
  }
  if (collectionSlug) {
    const c = db.collectionBySlug(collectionSlug);
    if (c) products = products.filter((p) => p.collectionId === c.id);
  }

  return NextResponse.json(products);
}
