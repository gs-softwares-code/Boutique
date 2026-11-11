import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser, safeUser } from "@/lib/auth";
import type { Address } from "@/lib/types";

export async function PATCH(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let body: { name?: string; address?: Address };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const patch: { name?: string; addresses?: Address[] } = {};
  if (typeof body.name === "string" && body.name.trim().length >= 2) {
    patch.name = body.name.trim();
  }
  if (body.address) {
    const a = body.address;
    if (a.fullName && a.line1 && a.city && a.state && a.pincode && a.phone) {
      const updated = [...user.addresses];
      const idx = updated.findIndex((x) => x.id === a.id);
      const next: Address = { ...a, id: a.id ?? crypto.randomUUID() };
      if (idx >= 0) updated[idx] = next;
      else updated.push(next);
      patch.addresses = updated;
    }
  }

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
  }

  const updated = db.updateUser(user.id, patch);
  if (!updated) {
    return NextResponse.json({ error: "Account not found." }, { status: 404 });
  }
  return NextResponse.json({ user: safeUser(updated) });
}

export async function DELETE(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const body = (await request.json().catch(() => ({}))) as { addressId?: string };
  if (!body.addressId) {
    return NextResponse.json({ error: "Missing address id." }, { status: 400 });
  }
  const updated = db.updateUser(user.id, {
    addresses: user.addresses.filter((a) => a.id !== body.addressId),
  });
  if (!updated) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ user: safeUser(updated) });
}
