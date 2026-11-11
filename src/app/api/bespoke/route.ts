import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const BUDGETS = ["Under ₹25,000", "₹25,000 – ₹50,000", "₹50,000 – ₹1,00,000", "Above ₹1,00,000"];

export async function POST(request: Request) {
  let body: {
    name?: string;
    email?: string;
    phone?: string;
    occasion?: string;
    fabric?: string;
    color?: string;
    budgetRange?: string;
    designNotes?: string;
    measurements?: Record<string, string>;
    references?: { name: string; tone: number }[];
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";
  const phone = body.phone?.trim() ?? "";
  const occasion = body.occasion?.trim() ?? "";

  if (name.length < 2) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (!/^[6-9][0-9]{9}$/.test(phone)) {
    return NextResponse.json({ error: "Please enter a valid mobile number." }, { status: 400 });
  }
  if (!occasion) return NextResponse.json({ error: "Please tell us the occasion." }, { status: 400 });
  if (body.budgetRange && !BUDGETS.includes(body.budgetRange)) {
    return NextResponse.json({ error: "Please choose a valid budget range." }, { status: 400 });
  }

  const request_ = db.createBespokeRequest({
    name,
    email,
    phone,
    occasion,
    fabric: body.fabric?.trim() || "",
    color: body.color?.trim() || "",
    budgetRange: body.budgetRange ?? "",
    designNotes: body.designNotes?.trim() || "",
    measurements: body.measurements ?? {},
    references: body.references ?? [],
  });

  return NextResponse.json({ requestId: request_.id }, { status: 201 });
}
