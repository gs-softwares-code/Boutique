import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser, safeUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const orders = db.ordersByCustomer(user.id).map((o) => ({
    id: o.id,
    total: o.total,
    status: o.status,
    paymentMethod: o.paymentMethod,
    createdAt: o.createdAt,
    items: o.items,
  }));

  const bookings = db
    .bookings()
    .filter((b) => b.email.toLowerCase() === user.email.toLowerCase())
    .map((b) => ({ id: b.id, type: b.type, date: b.date, time: b.time, status: b.status }));

  const bespokeRequests = db
    .bespokeRequests()
    .filter((r) => r.email.toLowerCase() === user.email.toLowerCase())
    .map((r) => ({ id: r.id, occasion: r.occasion, status: r.status, createdAt: r.createdAt }));

  return NextResponse.json({
    user: safeUser(user),
    orders,
    bookings,
    bespokeRequests,
  });
}
