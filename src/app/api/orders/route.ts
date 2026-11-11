import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { applyCoupon } from "@/lib/coupons";
import { site } from "@/data/site";
import type { Address, CartItem, OrderItem } from "@/lib/types";

const PAYMENT_METHODS = ["upi", "card", "netbanking", "cod"] as const;

interface OrderRequestBody {
  items?: CartItem[];
  shippingAddress?: Address;
  paymentMethod?: string;
  couponCode?: string;
}

export async function POST(request: Request) {
  let body: OrderRequestBody;
  try {
    body = (await request.json()) as OrderRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const items = body.items;
  const address = body.shippingAddress;
  const method = body.paymentMethod;
  const couponCode = body.couponCode;

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });
  }
  if (!address || !address.fullName || !address.line1 || !address.city || !address.state || !address.pincode || !address.phone) {
    return NextResponse.json({ error: "Please complete your shipping details." }, { status: 400 });
  }
  if (!method || !PAYMENT_METHODS.includes(method as (typeof PAYMENT_METHODS)[number])) {
    return NextResponse.json({ error: "Please choose a payment method." }, { status: 400 });
  }

  // Rebuild items from the catalogue to ensure server-side truth.
  const validatedItems: OrderItem[] = [];
  let subtotal = 0;
  for (const line of items) {
    const product = db.productById(line.productId);
    if (!product) {
      return NextResponse.json({ error: `A product in your bag is no longer available.` }, { status: 409 });
    }
    if (product.stock <= 0) {
      return NextResponse.json({ error: `${product.name} is temporarily unavailable.` }, { status: 409 });
    }
    if (!product.sizes.includes(line.size) || !product.colors.some((c) => c.name === line.color)) {
      return NextResponse.json({ error: `Invalid selection for ${product.name}.` }, { status: 400 });
    }
    const qty = Math.max(1, Math.min(Number(line.quantity) || 1, product.stock));
    const unitPrice = product.price;
    subtotal += unitPrice * qty;
    validatedItems.push({
      productId: product.id,
      name: product.name,
      size: line.size,
      color: line.color,
      quantity: qty,
      unitPrice,
      imageTone: product.images[0]?.tone ?? 0,
      imageSrc: product.images[0]?.src,
    });
  }

  let discount = 0;
  let couponCodeUsed: string | undefined;
  if (couponCode) {
    const result = applyCoupon(couponCode, subtotal);
    if (result.valid) {
      discount = result.discount;
      couponCodeUsed = couponCode.trim().toUpperCase();
    }
  }

  const shipping = subtotal - discount >= site.freeShippingAbove ? 0 : site.shippingBase;
  const total = subtotal - discount + shipping;

  const user = await getCurrentUser();
  const order = db.createOrder({
    customerId: user?.id ?? "guest",
    customerName: address.fullName,
    customerEmail: address.email ?? "",
    items: validatedItems,
    subtotal,
    discount,
    shipping,
    total,
    couponCode: couponCodeUsed,
    status: "placed",
    paymentMethod: method,
    paymentStatus: method === "cod" ? "cod" : "paid",
    shippingAddress: address,
  });

  // decrement inventory
  for (const line of validatedItems) {
    const product = db.productById(line.productId);
    if (product) {
      db.updateProduct(product.id, { stock: Math.max(0, product.stock - line.quantity) });
    }
  }

  return NextResponse.json({ orderId: order.id, total }, { status: 201 });
}
