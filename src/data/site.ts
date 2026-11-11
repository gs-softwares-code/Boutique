export const site = {
  name: "Boutique",
  legalName: "Boutique Luxury Fashion Studio",
  tagline: "Elegance, Tailored to You.",
  announcement:
    "Complimentary bespoke styling consultation with every order · Free shipping across India on orders over ₹25,000",
  email: "atelier@boutique.example",
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  address: {
    line1: "14, Rosewood Avenue, Khar West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400052",
  },
  socials: {
    instagram: "https://instagram.com",
    pinterest: "https://pinterest.com",
    facebook: "https://facebook.com",
  },
  currency: "INR",
  freeShippingAbove: 25000,
  shippingBase: 299,
} as const;
