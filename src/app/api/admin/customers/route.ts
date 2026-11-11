import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdmin } from "@/lib/auth";

export async function GET() {
  if (!(await getAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const customers = db.users().map((u) => {
    const orders = db.ordersByCustomer(u.id);
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      createdAt: u.createdAt,
      orderCount: orders.length,
      totalSpent: orders
        .filter((o) => o.status !== "cancelled")
        .reduce((s, o) => s + o.total, 0),
      hasMeasurements: !!u.measurements && Object.keys(u.measurements).length > 0,
    };
  });
  return NextResponse.json(customers);
}
