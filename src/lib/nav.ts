import { womenCollections, menCollections } from "@/data/collections";

export const collectionsNav = [
  { title: "Women", base: "/collections?category=women", links: womenCollections.map((c) => ({ label: c.title, href: `/collections/${c.slug}` })) },
  { title: "Men", base: "/collections?category=men", links: menCollections.map((c) => ({ label: c.title, href: `/collections/${c.slug}` })) },
];

export const primaryNav = [
  { label: "Collections", href: "/collections", hasDropdown: true },
  { label: "Bespoke Studio", href: "/bespoke" },
  { label: "Bridal & Occasion", href: "/bridal" },
  { label: "Personal Styling", href: "/styling" },
  { label: "Our Story", href: "/about" },
];
