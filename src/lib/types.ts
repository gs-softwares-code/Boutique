export type Currency = "INR";

export interface ColorVariant {
  name: string;
  hex: string;
}

export interface EditorialImageSpec {
  /** tone index used by the EditorialCanvas to render unique art */
  tone: number;
  /** optional real image URL; when provided it overrides the generated art */
  src?: string;
  alt?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  collectionId: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  currency: Currency;
  shortDescription: string;
  description: string;
  fabric: string;
  embroidery: string;
  care: string[];
  sizes: string[];
  colors: ColorVariant[];
  images: EditorialImageSpec[];
  stock: number;
  customizable: boolean;
  newArrival?: boolean;
  bestselling?: boolean;
  featured?: boolean;
  seasonal?: boolean;
  designerPiece?: boolean;
  editorial?: boolean;
  tags: string[];
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "women" | "men";
  description: string;
  coverTone: number;
  heroTone: number;
  coverImage?: string;
  heroImage?: string;
  editorial?: boolean;
  order: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: { salt: string; hash: string };
  role: "customer" | "admin";
  addresses: Address[];
  measurements?: { [key: string]: string };
  createdAt: string;
}

export interface Address {
  id: string;
  label: string;
  fullName: string;
  email?: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

export type OrderStatus =
  | "placed"
  | "confirmed"
  | "in_progress"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
  imageTone: number;
  imageSrc?: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  couponCode?: string;
  status: OrderStatus;
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "cod";
  shippingAddress: Address;
  createdAt: string;
  timeline: { status: OrderStatus; at: string }[];
}

export interface Booking {
  id: string;
  type: "styling" | "bridal" | "consultation" | "fitted";
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  occasion?: string;
  requirements?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export interface BespokeRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  occasion: string;
  fabric: string;
  color: string;
  budgetRange: string;
  designNotes: string;
  measurements: { [key: string]: string };
  references: { name: string; tone: number }[];
  status: "new" | "in_review" | "in_progress" | "delivered";
  createdAt: string;
}

export interface Campaign {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  tone: number;
  active: boolean;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
  imageTone: number;
  imageSrc?: string;
}
