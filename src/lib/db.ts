import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { products as seedProducts } from "@/data/products";
import { collections as seedCollections } from "@/data/collections";
import { site } from "@/data/site";
import { hashPassword } from "@/lib/password";
import type {
  Product,
  Collection,
  Order,
  User,
  Booking,
  BespokeRequest,
  Campaign,
  Address,
} from "@/lib/types";

export const DEFAULT_ADMIN = {
  email: process.env.ADMIN_EMAIL ?? "admin@boutique.example",
  password: process.env.ADMIN_PASSWORD ?? "Atelier#2026",
  name: "Atelier Admin",
};

type Role = User["role"];

interface DbState {
  products: Product[];
  collections: Collection[];
  orders: Order[];
  users: User[];
  bookings: Booking[];
  bespokeRequests: BespokeRequest[];
  campaigns: Campaign[];
}

function defaultState(): DbState {
  return {
    products: seedProducts,
    collections: seedCollections,
    orders: [],
    users: [],
    bookings: [],
    bespokeRequests: [],
    campaigns: [],
  };
}

const PERSIST_DIR = path.join(process.cwd(), ".data");
const PERSIST_FILE = path.join(PERSIST_DIR, "db.json");

function canPersist() {
  // Vercel serverless filesystems are read-only except /tmp; we persist only locally.
  return process.env.NODE_ENV !== "production";
}

let state: DbState | null = null;
let loaded = false;

function load(): DbState {
  if (loaded && state) return state;
  state = defaultState();
  if (canPersist() && fs.existsSync(PERSIST_FILE)) {
    try {
      const raw = fs.readFileSync(PERSIST_FILE, "utf8");
      const saved = JSON.parse(raw) as Partial<DbState>;
      if (saved.products) state.products = saved.products;
      if (saved.collections) state.collections = saved.collections;
      if (saved.orders) state.orders = saved.orders;
      if (saved.users) state.users = saved.users;
      if (saved.bookings) state.bookings = saved.bookings;
      if (saved.bespokeRequests) state.bespokeRequests = saved.bespokeRequests;
      if (saved.campaigns) state.campaigns = saved.campaigns;
    } catch {
      // corrupt file — fall back to seed
    }
  }
  // Ensure the boutique admin exists.
  if (!state.users.some((u) => u.email === DEFAULT_ADMIN.email)) {
    const passwordHash = hashPassword(DEFAULT_ADMIN.password);
    state.users.push({
      id: uid(),
      name: DEFAULT_ADMIN.name,
      email: DEFAULT_ADMIN.email,
      passwordHash,
      role: "admin",
      addresses: [],
      createdAt: new Date().toISOString(),
    });
    persist();
  }

  loaded = true;
  return state;
}

function persist() {
  if (!canPersist() || !state) return;
  try {
    fs.mkdirSync(PERSIST_DIR, { recursive: true });
    fs.writeFileSync(PERSIST_FILE, JSON.stringify(state, null, 2), "utf8");
  } catch {
    // ignore — persistence is best-effort
  }
}

function uid() {
  return randomUUID();
}

export const db = {
  get site() {
    return site;
  },

  // ---------- products ----------
  products(): Product[] {
    return load().products;
  },
  productBySlug(slug: string) {
    return load().products.find((p) => p.slug === slug);
  },
  productById(id: string) {
    return load().products.find((p) => p.id === id);
  },
  productsByCollection(collectionId: string) {
    return load().products.filter((p) => p.collectionId === collectionId);
  },
  createProduct(data: Omit<Product, "id">): Product {
    const s = load();
    const product: Product = { ...data, id: uid() };
    s.products.unshift(product);
    persist();
    return product;
  },
  updateProduct(id: string, patch: Partial<Product>): Product | undefined {
    const s = load();
    const idx = s.products.findIndex((p) => p.id === id);
    if (idx === -1) return undefined;
    s.products[idx] = { ...s.products[idx], ...patch, id };
    persist();
    return s.products[idx];
  },
  deleteProduct(id: string): boolean {
    const s = load();
    const before = s.products.length;
    s.products = s.products.filter((p) => p.id !== id);
    const removed = s.products.length !== before;
    if (removed) persist();
    return removed;
  },

  // ---------- collections ----------
  collections(): Collection[] {
    return load().collections;
  },
  collectionBySlug(slug: string) {
    return load().collections.find((c) => c.slug === slug);
  },
  createCollection(data: Omit<Collection, "id">): Collection {
    const s = load();
    const collection: Collection = { ...data, id: uid() };
    s.collections.push(collection);
    persist();
    return collection;
  },
  updateCollection(id: string, patch: Partial<Collection>): Collection | undefined {
    const s = load();
    const idx = s.collections.findIndex((c) => c.id === id);
    if (idx === -1) return undefined;
    s.collections[idx] = { ...s.collections[idx], ...patch, id };
    persist();
    return s.collections[idx];
  },
  deleteCollection(id: string): boolean {
    const s = load();
    const before = s.collections.length;
    s.collections = s.collections.filter((c) => c.id !== id);
    const removed = s.collections.length !== before;
    if (removed) persist();
    return removed;
  },

  // ---------- orders ----------
  orders(): Order[] {
    return load().orders;
  },
  orderById(id: string) {
    return load().orders.find((o) => o.id === id);
  },
  ordersByCustomer(customerId: string) {
    return load().orders.filter((o) => o.customerId === customerId);
  },
  createOrder(order: Omit<Order, "id" | "createdAt" | "timeline">): Order {
    const s = load();
    const now = new Date().toISOString();
    const o: Order = { ...order, id: uid(), createdAt: now, timeline: [{ status: order.status, at: now }] };
    s.orders.unshift(o);
    persist();
    return o;
  },
  updateOrderStatus(id: string, status: Order["status"]): Order | undefined {
    const s = load();
    const o = s.orders.find((x) => x.id === id);
    if (!o) return undefined;
    o.status = status;
    o.timeline.push({ status, at: new Date().toISOString() });
    persist();
    return o;
  },
  updateOrder(id: string, patch: Partial<Order>): Order | undefined {
    const s = load();
    const idx = s.orders.findIndex((x) => x.id === id);
    if (idx === -1) return undefined;
    s.orders[idx] = { ...s.orders[idx], ...patch, id };
    persist();
    return s.orders[idx];
  },

  // ---------- users ----------
  users(): User[] {
    return load().users;
  },
  userById(id: string) {
    return load().users.find((u) => u.id === id);
  },
  userByEmail(email: string) {
    const norm = email.trim().toLowerCase();
    return load().users.find((u) => u.email === norm);
  },
  createUser(
    data: Omit<User, "id" | "createdAt" | "role" | "addresses"> & {
      role?: Role;
      addresses?: Address[];
    },
  ): User {
    const s = load();
    const user: User = {
      ...data,
      id: uid(),
      role: data.role ?? "customer",
      addresses: data.addresses ?? [],
      createdAt: new Date().toISOString(),
    };
    s.users.push(user);
    persist();
    return user;
  },
  updateUser(id: string, patch: Partial<User>): User | undefined {
    const s = load();
    const idx = s.users.findIndex((u) => u.id === id);
    if (idx === -1) return undefined;
    s.users[idx] = { ...s.users[idx], ...patch, id };
    persist();
    return s.users[idx];
  },

  // ---------- bookings ----------
  bookings(): Booking[] {
    return load().bookings;
  },
  createBooking(data: Omit<Booking, "id" | "createdAt" | "status">): Booking {
    const s = load();
    const b: Booking = {
      ...data,
      id: uid(),
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    s.bookings.push(b);
    persist();
    return b;
  },
  updateBookingStatus(id: string, status: Booking["status"]): Booking | undefined {
    const s = load();
    const b = s.bookings.find((x) => x.id === id);
    if (!b) return undefined;
    b.status = status;
    persist();
    return b;
  },

  // ---------- bespoke requests ----------
  bespokeRequests(): BespokeRequest[] {
    return load().bespokeRequests;
  },
  createBespokeRequest(data: Omit<BespokeRequest, "id" | "createdAt" | "status">): BespokeRequest {
    const s = load();
    const r: BespokeRequest = {
      ...data,
      id: uid(),
      status: "new",
      createdAt: new Date().toISOString(),
    };
    s.bespokeRequests.unshift(r);
    persist();
    return r;
  },
  updateBespokeStatus(id: string, status: BespokeRequest["status"]): BespokeRequest | undefined {
    const s = load();
    const r = s.bespokeRequests.find((x) => x.id === id);
    if (!r) return undefined;
    r.status = status;
    persist();
    return r;
  },

  // ---------- campaigns ----------
  campaigns(): Campaign[] {
    return load().campaigns;
  },
  saveCampaigns(campaigns: Campaign[]) {
    load().campaigns = campaigns;
    persist();
  },

  // ---------- analytics ----------
  analytics() {
    const s = load();
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 86400000).toISOString();
    const orders = s.orders;
    const placed = orders.filter((o) => o.status !== "cancelled");
    const revenue = placed.reduce((sum, o) => sum + o.total, 0);
    const recentOrders = orders.filter((o) => o.createdAt >= thirtyDaysAgo);
    const recentRevenue = recentOrders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + o.total, 0);
    const lowStock = s.products.filter((p) => p.stock <= 3);
    return {
      totalOrders: orders.length,
      revenue,
      recentOrders: recentOrders.length,
      recentRevenue,
      lowStock,
      uniqueCustomers: new Set(
        placed.filter((o) => o.customerId).map((o) => o.customerId),
      ).size,
      pendingBookings: s.bookings.filter((b) => b.status === "pending").length,
      pendingBespoke: s.bespokeRequests.filter((r) => r.status === "new" || r.status === "in_review").length,
    };
  },
};
