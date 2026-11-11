"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { site } from "@/data/site";
import { collectionsNav, primaryNav } from "@/lib/nav";
import { useCart, useWishlist } from "@/components/CartProvider";
import {
  SearchIcon,
  BagIcon,
  HeartIcon,
  UserIcon,
  MenuIcon,
  CloseIcon,
  ChevronDown,
} from "@/components/icons";

export function SiteHeader() {
  const { count, setOpen } = useCart();
  const { wishlist } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<string | null>("Women");
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const collectionsRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown on route change
  useEffect(() => {
    setCollectionsOpen(false);
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Handle scroll effect
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (collectionsRef.current && !collectionsRef.current.contains(e.target as Node)) {
        setCollectionsOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Prevent background scroll when overlays open
  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, searchOpen]);

  function handleMouseEnter() {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setCollectionsOpen(true);
  }

  function handleMouseLeave() {
    closeTimeoutRef.current = setTimeout(() => {
      setCollectionsOpen(false);
    }, 180);
  }

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setSearchOpen(false);
    router.push(`/collections?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <>
      {/* announcement bar */}
      <div className="bg-espresso text-ivory text-center text-[0.66rem] tracking-[0.18em] uppercase py-2 px-4 transition-all border-b border-ivory/10">
        <span className="opacity-90">{site.announcement}</span>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-ivory/95 backdrop-blur-md shadow-sm border-b border-line-soft"
            : "bg-ivory/90 backdrop-blur-md border-b border-line-soft"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-20 lg:h-24">
            {/* left: mobile menu toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                aria-label="Open navigation menu"
                onClick={() => setMobileOpen(true)}
                className="p-2 -ml-2 text-espresso hover:opacity-70 transition-opacity"
              >
                <MenuIcon className="w-6 h-6" />
              </button>
            </div>

            {/* left nav links (Women, Men, Collections) */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1">
              {/* Mega-menu dropdown for Collections */}
              <div
                className="relative"
                ref={collectionsRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => setCollectionsOpen((v) => !v)}
                  aria-expanded={collectionsOpen}
                  aria-haspopup="true"
                  className={`flex items-center gap-1.5 text-[0.78rem] font-medium tracking-[0.18em] uppercase transition-colors py-2 whitespace-nowrap ${
                    collectionsOpen || pathname.startsWith("/collections")
                      ? "text-espresso font-semibold"
                      : "text-espresso/75 hover:text-espresso"
                  }`}
                >
                  Collections
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      collectionsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown mega panel */}
                {collectionsOpen && (
                  <div className="absolute left-0 top-full pt-2 w-[720px] transition-all duration-200 animate-in fade-in slide-in-from-top-1 z-50">
                    <div className="bg-ivory border border-line shadow-2xl shadow-espresso/10 p-7 grid grid-cols-3 gap-6 rounded-sm">
                      {collectionsNav.map((group) => (
                        <div key={group.title} className="space-y-3">
                          <Link
                            href={group.base}
                            onClick={() => setCollectionsOpen(false)}
                            className="font-serif-display text-xl text-espresso tracking-wide block hover:text-gold transition-colors border-b border-line pb-2"
                          >
                            {group.title}&apos;s Edit
                          </Link>
                          <ul className="space-y-2 pt-1">
                            {group.links.slice(0, 7).map((l) => (
                              <li key={l.href}>
                                <Link
                                  href={l.href}
                                  onClick={() => setCollectionsOpen(false)}
                                  className="text-[0.8rem] text-espresso/70 hover:text-espresso hover:translate-x-1 inline-block transition-all duration-150"
                                >
                                  {l.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <Link
                            href={group.base}
                            onClick={() => setCollectionsOpen(false)}
                            className="text-[0.68rem] tracking-luxe uppercase text-gold hover:text-espresso block pt-2"
                          >
                            View all {group.title} →
                          </Link>
                        </div>
                      ))}

                      {/* Featured image promo card in dropdown */}
                      <div className="bg-ivory-deep/50 p-4 border border-line-soft flex flex-col justify-between">
                        <div>
                          <div className="relative aspect-[4/5] overflow-hidden mb-3">
                            <Image
                              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80"
                              alt="Featured Bridal Edit"
                              fill
                              sizes="240px"
                              className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                            <span className="absolute bottom-2.5 left-2.5 text-[0.62rem] uppercase tracking-luxe text-white font-medium">
                              Bridal Atelier
                            </span>
                          </div>
                          <p className="font-serif-display text-base text-espresso">The 2026 Bridal Edit</p>
                          <p className="text-[0.72rem] text-espresso/65 leading-relaxed mt-1">
                            Bespoke lehengas and wedding wear crafted to order.
                          </p>
                        </div>
                        <Link
                          href="/bridal"
                          onClick={() => setCollectionsOpen(false)}
                          className="mt-3 text-[0.7rem] tracking-luxe uppercase font-medium text-espresso underline underline-offset-4 hover:text-gold transition-colors"
                        >
                          Explore Bridal
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/bespoke"
                className={`text-[0.78rem] font-medium tracking-[0.18em] uppercase transition-colors py-2 whitespace-nowrap ${
                  pathname === "/bespoke"
                    ? "text-espresso font-semibold border-b border-espresso"
                    : "text-espresso/75 hover:text-espresso"
                }`}
              >
                Bespoke Studio
              </Link>

              <Link
                href="/bridal"
                className={`text-[0.78rem] font-medium tracking-[0.18em] uppercase transition-colors py-2 whitespace-nowrap ${
                  pathname === "/bridal"
                    ? "text-espresso font-semibold border-b border-espresso"
                    : "text-espresso/75 hover:text-espresso"
                }`}
              >
                Bridal & Occasion
              </Link>
            </nav>

            {/* center brand logo - always perfectly centered */}
            <div className="flex-1 flex justify-center lg:flex-none">
              <Link
                href="/"
                className="flex flex-col items-center leading-none text-center px-4 py-1 group"
              >
                <span className="font-serif-display text-2xl lg:text-3xl tracking-[0.24em] text-espresso font-normal group-hover:opacity-80 transition-opacity">
                  BOUTIQUE
                </span>
                <span className="text-[0.52rem] tracking-[0.3em] uppercase text-gold mt-1.5">
                  Luxury Fashion Studio
                </span>
              </Link>
            </div>

            {/* right nav links (Styling, Our Story) + utility actions */}
            <div className="flex items-center justify-end gap-6 xl:gap-8 flex-1">
              <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                <Link
                  href="/styling"
                  className={`text-[0.78rem] font-medium tracking-[0.18em] uppercase transition-colors py-2 whitespace-nowrap ${
                    pathname === "/styling"
                      ? "text-espresso font-semibold border-b border-espresso"
                      : "text-espresso/75 hover:text-espresso"
                  }`}
                >
                  Personal Styling
                </Link>
                <Link
                  href="/about"
                  className={`text-[0.78rem] font-medium tracking-[0.18em] uppercase transition-colors py-2 whitespace-nowrap ${
                    pathname === "/about"
                      ? "text-espresso font-semibold border-b border-espresso"
                      : "text-espresso/75 hover:text-espresso"
                  }`}
                >
                  Our Story
                </Link>
              </nav>

              {/* right action icons */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  aria-label="Search"
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-espresso hover:text-gold transition-colors"
                >
                  <SearchIcon className="w-5 h-5" />
                </button>
                <Link
                  href="/account"
                  aria-label="Account"
                  className="p-2 text-espresso hover:text-gold transition-colors hidden sm:block"
                >
                  <UserIcon className="w-5 h-5" />
                </Link>
                <Link
                  href="/wishlist"
                  aria-label="Wishlist"
                  className="relative p-2 text-espresso hover:text-gold transition-colors"
                >
                  <HeartIcon className="w-5 h-5" />
                  {wishlist.size > 0 && (
                    <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-gold text-white text-[0.6rem] font-medium flex items-center justify-center animate-in zoom-in-50">
                      {wishlist.size}
                    </span>
                  )}
                </Link>
                <button
                  aria-label="Open shopping bag"
                  onClick={() => setOpen(true)}
                  className="relative p-2 text-espresso hover:text-gold transition-colors"
                >
                  <BagIcon className="w-5 h-5" />
                  {count > 0 && (
                    <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-espresso text-ivory text-[0.6rem] font-medium flex items-center justify-center animate-in zoom-in-50">
                      {count}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[70] animate-in fade-in duration-200">
          <button
            aria-label="Close search overlay"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          />
          <div className="relative bg-ivory shadow-2xl border-b border-line">
            <form onSubmit={submitSearch} className="max-w-3xl mx-auto px-6 py-12 flex items-center gap-4">
              <SearchIcon className="w-6 h-6 text-espresso/50 shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search designer suits, lehengas, silk sarees, kurtas…"
                className="flex-1 bg-transparent border-b border-espresso/30 pb-3 text-lg sm:text-2xl font-serif-display focus:outline-none focus:border-espresso text-espresso placeholder:text-espresso/35"
              />
              <button type="submit" className="btn-luxe shrink-0 py-3 px-6 text-[0.72rem]">
                Search
              </button>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setSearchOpen(false)}
                className="p-2 text-espresso/60 hover:text-espresso"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* mobile drawer menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden animate-in fade-in duration-200">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-[86%] max-w-sm bg-ivory shadow-2xl overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between px-6 py-5 border-b border-line">
                <div className="leading-none">
                  <span className="font-serif-display text-xl tracking-[0.18em] text-espresso">
                    BOUTIQUE
                  </span>
                  <p className="text-[0.48rem] tracking-luxe uppercase text-gold mt-1">
                    Luxury Fashion Studio
                  </p>
                </div>
                <button
                  aria-label="Close"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-espresso hover:opacity-70"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>

              <nav className="px-6 py-6 space-y-2">
                {/* Collections accordion */}
                <div className="border-b border-line-soft pb-2">
                  <div className="flex items-center justify-between py-2.5">
                    <Link
                      href="/collections"
                      onClick={() => setMobileOpen(false)}
                      className="text-[0.82rem] font-medium tracking-[0.16em] uppercase text-espresso"
                    >
                      Collections
                    </Link>
                  </div>
                  <div className="space-y-4 pt-1 pb-2">
                    {collectionsNav.map((group) => {
                      const isExpanded = mobileExpandedGroup === group.title;
                      return (
                        <div key={group.title} className="pl-3 border-l-2 border-line-soft">
                          <button
                            type="button"
                            onClick={() =>
                              setMobileExpandedGroup(isExpanded ? null : group.title)
                            }
                            className="w-full flex items-center justify-between text-xs tracking-luxe uppercase text-gold py-1"
                          >
                            <span>{group.title}</span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {isExpanded && (
                            <div className="mt-2 space-y-2 pl-1 animate-in fade-in duration-150">
                              {group.links.map((l) => (
                                <Link
                                  key={l.href}
                                  href={l.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="block py-1 text-sm text-espresso/75 hover:text-espresso"
                                >
                                  {l.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Primary navigation links */}
                {primaryNav
                  .filter((n) => !n.hasDropdown)
                  .map((n) => (
                    <Link
                      key={n.href}
                      href={n.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 text-[0.82rem] font-medium tracking-[0.16em] uppercase text-espresso border-b border-line-soft hover:text-gold transition-colors"
                    >
                      {n.label}
                    </Link>
                  ))}
              </nav>
            </div>

            {/* Mobile bottom footer actions */}
            <div className="p-6 border-t border-line bg-ivory-deep/30 space-y-3">
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 py-2 text-[0.8rem] tracking-[0.14em] uppercase text-espresso hover:text-gold"
              >
                <UserIcon className="w-5 h-5 text-espresso/70" /> My Account
              </Link>
              <Link
                href="/wishlist"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 py-2 text-[0.8rem] tracking-[0.14em] uppercase text-espresso hover:text-gold"
              >
                <HeartIcon className="w-5 h-5 text-espresso/70" /> Wishlist ({wishlist.size})
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
