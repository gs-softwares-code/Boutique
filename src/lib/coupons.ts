export interface Coupon {
  type: "percent" | "flat";
  value: number;
  min: number;
}

export const coupons: Record<string, Coupon> = {
  WELCOME10: { type: "percent", value: 10, min: 0 },
  BESPOKE15: { type: "percent", value: 15, min: 20000 },
  ATELIER: { type: "flat", value: 1500, min: 15000 },
};

export function applyCoupon(code: string, subtotal: number): { valid: boolean; discount: number; message: string } {
  const coupon = coupons[code.trim().toUpperCase()];
  if (!coupon) return { valid: false, discount: 0, message: "This code isn't recognised." };
  if (subtotal < coupon.min) {
    return {
      valid: false,
      discount: 0,
      message: `Add ${formatMin(coupon.min)} more to use this code.`,
    };
  }
  const discount = coupon.type === "percent" ? (subtotal * coupon.value) / 100 : coupon.value;
  return { valid: true, discount: Math.min(discount, subtotal), message: "Coupon applied." };
}

function formatMin(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}
