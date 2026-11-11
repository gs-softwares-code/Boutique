import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdmin } from "@/lib/auth";

export async function GET() {
  if (!(await getAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(db.bespokeRequests());
}

export async function PATCH(request: Request) {
  if (!(await getAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: { id?: string; status?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!body.id || !["new", "in_review", "in_progress", "delivered"].includes(body.status ?? "")) {
    return NextResponse.json({ error: "Invalid request or status." }, { status: 400 });
  }
  const r = db.updateBespokeStatus(body.id, body.status as "new" | "in_review" | "in_progress" | "delivered");
  if (!r) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ request: r });
}
