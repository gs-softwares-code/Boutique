# Boutique — Luxury Fashion Studio

A complete, production-ready digital boutique: editorial storefront, bespoke & bridal services,
personal styling appointments, full e-commerce checkout, customer accounts, and a secure admin
dashboard.

Designed to run entirely on **Vercel** with **no third-party platform dependencies** (no external
database, no third-party auth, no external image host). GitHub is used only to store code.

---

## Tech stack

- **Next.js 16** (App Router, TypeScript, React 19)
- **Tailwind CSS v4** (CSS-based design system)
- **Vercel** — hosting for serverless API routes + frontend
- **In-house persistence** — a typed data layer (`src/lib/db.ts`) seeded from catalogue modules, the
  single source of truth for products, collections, orders, customers, bookings and campaigns
- **In-house auth** — scrypt password hashing + signed HTTP-only session cookies (no third-party
  auth provider)
- **Simulated checkout** — UPI/card/net-banking/COD flow with server-side order validation and
  inventory control (no real payment gateway keys required)

> Persistence note: on a *local* machine, the store writes through to `.data/db.json` (gitignored)
> so admin changes survive restarts. On Vercel's serverless filesystem it runs in-memory per cold
> start. Swap `src/lib/db.ts` for PostgreSQL/Neon if you need durable persistence in production —
> the rest of the app is database-agnostic.

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Build & production check:

```bash
npm run build
npm run start
```

### Default admin access

| Role  | Email                  | Password       |
| ----- | ---------------------- | -------------- |
| Admin | `admin@boutique.example` | `Atelier#2026` |

The admin account is seeded automatically on first load. Override via env vars
`ADMIN_EMAIL` / `ADMIN_PASSWORD`, and set `AUTH_SECRET` to a long random string in production.

> Change the default admin password before any real launch — the credentials above are for the demo.

---

## Deploying to Vercel

1. Push this repository to GitHub.
2. Import it in [vercel.com](https://vercel.com) (the repo is auto-detected as Next.js).
3. (Recommended) Add environment variables:
   - `AUTH_SECRET` — a long random string (required for secure sessions in production)
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` — optional admin overrides
4. Deploy. No build settings needed — defaults work.

---

## Feature map

### Storefront
- **Homepage** — announcement bar, full-screen editorial hero, new arrivals, exclusive collections,
  bestsellers, featured designer pieces, the seasonal campaign banner (editable in admin), brand
  story, craftsmanship, styling CTA, atelier gallery, newsletter.
- **Collections** — women's & men's collection index + per-collection editorial pages with filters
  (category, collection, price, size, colour, in-stock), sorting, and live search.
- **Product pages** — interactive gallery with hover-zoom, size/colour selection, stock status,
  quantity, add-to-bag, buy-now, wishlist, size guide, delivery estimator, fabric/care, related
  designs, bespoke CTA.

### E-commerce
- Cart drawer + full cart page, wishlist.
- Checkout with shipping validation, coupons (`WELCOME10`, `BESPOKE15`, `ATELIER`), shipping
  calculation (free above ₹25,000), and simulated UPI/card/net-banking/COD.
- Server-side order creation with catalogue re-validation and inventory decrement.
- Order confirmation + timeline tracking page.

### Services
- **Bespoke & Custom Design Studio** — full request form (occasion, garment, fabric, colour,
  budget, notes, measurements, reference image upload) with a four-step process explanation.
- **Bridal & Occasion** — editorial section, bridal collections, occasion edit, custom fitting and
  WhatsApp inquiry CTA.
- **Personal Styling** — appointment booking with type, date, time slots and special requirements.
- **About** — brand story, philosophy, craftsmanship and design process.

### Accounts & Admin
- Register/login with scrypt-hashed passwords, signed cookies.
- Customer dashboard: overview, orders, addresses, appointments, bespoke requests.
- **Admin dashboard** (role-gated): analytics/revenue stats, low-stock alerts, full product CRUD,
  order status management, customer list (measurement-aware), appointment & bespoke management, and
  homepage campaign content management.

---

## Project structure

```
src/
  app/
    page.tsx                 # homepage
    collections/, product/, cart/, wishlist/, checkout/, order/[id]/
    bespoke/, bridal/, styling/, about/
    login/, register/, account/
    admin/                   # guarded admin dashboard
    api/                     # serverless API routes
  components/                # design system + feature components
  data/                      # catalogue seeds (products, collections, site)
  lib/                       # db, auth, coupons, format, types, nav
```

---

## Quality notes

- Mobile-first responsive, accessible (skip-link, labels, focus states, semantic HTML).
- Search/sort/filter all client-rendered from the shared data layer.
- No fabricated testimonials or business claims; demo imagery is generated editorial SVG art with a
  zero-dependency image system (`EditorialCanvas`).
- Fully typed, passes `next build` TypeScript + production compilation.
