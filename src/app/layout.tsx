import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { CartProvider, WishlistProvider } from "@/components/CartProvider";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CartDrawer } from "@/components/CartDrawer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://boutique.example"),
  title: {
    default: "Boutique — Luxury Fashion Studio",
    template: "%s · Boutique",
  },
  description:
    "Bespoke clothing, bridal couture and considered ready-to-wear, crafted by hand in our Mumbai atelier. Elegance, tailored to you.",
  keywords: ["luxury fashion", "bespoke clothing", "bridal", "Indian couture", "personal styling"],
  openGraph: {
    title: "Boutique — Luxury Fashion Studio",
    description: "Elegance, tailored to you. Bespoke clothing and couture by hand.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-ivory text-ink antialiased">
        <CartProvider>
          <WishlistProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:z-[90] focus:top-3 focus:left-3 focus:bg-espresso focus:text-ivory focus:px-4 focus:py-2 focus:text-sm"
            >
              Skip to content
            </a>
            <SiteHeader />
            <CartDrawer />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
