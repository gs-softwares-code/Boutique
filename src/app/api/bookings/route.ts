import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const BOOKING_TYPES = ["styling", "bridal", "consultation", "fitted"] as const;

export async function POST(request: Request) {
  let body: {
    name?: string;
    email?: string;
    phone?: string;
    type?: string;
    date?: string;
    time?: string;
    occasion?: string;
    requirements?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";
  const phone = body.phone?.trim() ?? "";
  const type = body.type ?? "";
  const date = body.date?.trim() ?? "";
  const time = body.time?.trim() ?? "";

  if (name.length < 2) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (!/^[6-9][0-9]{9}$/.test(phone)) {
    return NextResponse.json({ error: "Please enter a valid mobile number." }, { status: 400 });
  }
  if (!BOOKING_TYPES.includes(type as (typeof BOOKING_TYPES)[number])) {
    return NextResponse.json({ error: "Please choose an appointment type." }, { status: 400 });
  }
  if (!date || !time) {
    return NextResponse.json({ error: "Please choose a date and time." }, { status: 400 });
  }

  const booking = db.createBooking({
    name,
    email,
    phone,
    type: type as (typeof BOOKING_TYPES)[number],
    date,
    time,
    occasion: body.occasion?.trim() || undefined,
    requirements: body.requirements?.trim() || undefined,
  });

  return NextResponse.json({ bookingId: booking.id }, { status: 201 });
}
