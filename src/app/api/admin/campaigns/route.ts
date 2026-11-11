import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdmin } from "@/lib/auth";
import type { Campaign } from "@/lib/types";

export async function GET() {
  if (!(await getAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(db.campaigns());
}

export async function PUT(request: Request) {
  if (!(await getAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: Campaign[];
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!Array.isArray(body)) {
    return NextResponse.json({ error: "Expected a list of campaigns." }, { status: 400 });
  }
  const campaigns = body.map((c, i) => ({
    id: c.id ?? `camp-${i}`,
    title: String(c.title ?? ""),
    subtitle: String(c.subtitle ?? ""),
    cta: String(c.cta ?? "Explore"),
    href: String(c.href ?? "/collections"),
    tone: Number(c.tone) || 0,
    active: !!c.active,
  }));
  db.saveCampaigns(campaigns);
  return NextResponse.json({ campaigns });
}
