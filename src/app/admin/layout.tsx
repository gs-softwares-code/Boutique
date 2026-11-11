import Link from "next/link";
import { getAdmin } from "@/lib/auth";
import { DatabaseIcon } from "@/components/admin/icons";

const NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/customers", label: "Customers" },
  { href: "/admin/appointments", label: "Appointments & Custom" },
  { href: "/admin/content", label: "Homepage Content" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await getAdmin();

  if (!admin) {
    return (
      <div className="max-w-md mx-auto px-6 py-28 text-center">
        <DatabaseIcon className="mx-auto w-10 h-10 text-espresso/50" />
        <h1 className="mt-5 font-serif-display text-3xl text-espresso">Admin access restricted</h1>
        <p className="mt-3 text-sm text-espresso/60">
          Please sign in with the boutique administrator account to manage the store.
        </p>
        <Link href="/login?next=/admin" className="btn-luxe mt-8">Sign in</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:flex">
      <aside className="lg:w-64 shrink-0 bg-espresso-deep text-ivory/85">
        <div className="px-6 py-6 border-b border-ivory/15">
          <p className="font-serif-display text-lg tracking-[0.14em] text-ivory">BOUTIQUE</p>
          <p className="text-[0.6rem] tracking-luxe uppercase text-gold-soft mt-1">Admin</p>
        </div>
        <nav className="px-3 py-4 space-y-1">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="block px-4 py-2.5 text-sm rounded-sm hover:bg-ivory/10 hover:text-ivory transition-colors"
            >
              {n.label}
            </Link>
          ))}
          <Link href="/" className="block px-4 py-2.5 text-sm text-ivory/50 hover:text-ivory mt-6">
            ← View storefront
          </Link>
        </nav>
      </aside>
      <div className="flex-1 min-w-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">{children}</div>
      </div>
    </div>
  );
}
