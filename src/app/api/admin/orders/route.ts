import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdmin } from "@/lib/auth";
import type { OrderStatus } from "@/lib/types";

const STATUSES: OrderStatus[] = ["placed", "confirmed", "in_progress", "shipped", "delivered", "cancelled"];

export async function GET() {
  if (!(await getAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(db.orders());
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
  if (!body.id || !STATUSES.includes(body.status as OrderStatus)) {
    return NextResponse.json({ error: "Invalid order or status." }, { status: 400 });
  }
  const order = db.updateOrderStatus(body.id, body.status as OrderStatus);
  if (!order) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ order });
}
