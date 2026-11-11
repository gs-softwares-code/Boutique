import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdmin } from "@/lib/auth";
import { slugify } from "@/lib/format";
import type { Product, ColorVariant } from "@/lib/types";

export async function GET() {
  if (!(await getAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(db.products());
}

export async function POST(request: Request) {
  if (!(await getAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Partial<Product> & { tones?: number[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const price = Number(body.price);
  const collectionId = body.collectionId ?? "";
  const category = body.category?.trim() ?? "";

  if (name.length < 2) return NextResponse.json({ error: "Please enter a product name." }, { status: 400 });
  if (!Number.isFinite(price) || price <= 0) {
    return NextResponse.json({ error: "Please enter a valid price." }, { status: 400 });
  }
  if (!collectionId || !db.collections().some((c) => c.id === collectionId)) {
    return NextResponse.json({ error: "Please pick a collection." }, { status: 400 });
  }
  if (!category) return NextResponse.json({ error: "Please enter a category." }, { status: 400 });

  const tones = Array.isArray(body.tones) && body.tones.length ? body.tones : [0, 3, 6];
  const colors: ColorVariant[] =
    Array.isArray(body.colors) && body.colors.length
      ? (body.colors as ColorVariant[])
      : [{ name: "Ivory", hex: "#f4ecdd" }];

  const product = db.createProduct({
    slug: body.slug ? slugify(body.slug) : slugify(name) + "-" + Date.now().toString(36),
    name,
    price,
    currency: "INR",
    collectionId,
    category,
    shortDescription: body.shortDescription ?? "",
    description: body.description ?? "",
    fabric: body.fabric ?? "",
    embroidery: body.embroidery ?? "",
    care: Array.isArray(body.care) ? body.care : ["Dry clean only"],
    sizes: Array.isArray(body.sizes) && body.sizes.length ? body.sizes : ["S", "M", "L"],
    colors,
    images: tones.map((tone, i) => ({ tone, alt: `${name} — view ${i + 1}` })),
    stock: Math.max(0, Number(body.stock) || 0),
    customizable: !!body.customizable,
    newArrival: !!body.newArrival,
    bestselling: !!body.bestselling,
    featured: !!body.featured,
    seasonal: !!body.seasonal,
    editorial: !!body.editorial,
    designerPiece: !!body.designerPiece,
    tags: Array.isArray(body.tags) ? body.tags : [],
  });

  return NextResponse.json({ product }, { status: 201 });
}
