import type { Product } from "@/lib/types";

const curatedCategoryImages: Record<string, string[]> = {
  "Designer Suits": [
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
  ],
  "Ethnic Wear": [
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
  ],
  "Party Wear": [
    "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
  ],
  "Bridal Wear": [
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
  ],
  "Festive Collections": [
    "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1000&q=80",
  ],
  "Sarees": [
    "https://images.unsplash.com/photo-1610030469668-9655ec1f3a23?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1617059063772-34532796cdb5?auto=format&fit=crop&w=1000&q=80",
  ],
  "Kurtis": [
    "https://images.unsplash.com/photo-1617059063772-34532796cdb5?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1000&q=80",
  ],
  "Lehengas": [
    "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
  ],
  "Western Wear": [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=1000&q=80",
  ],
  "Co-ord Sets": [
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80",
  ],
  "Custom Outfits": [
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1000&q=80",
  ],
  "Designer Kurtas": [
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1000&q=80",
  ],
  "Wedding Wear": [
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
  ],
  "Formal Wear": [
    "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1000&q=80",
  ],
  "Indo-Western": [
    "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80",
  ],
  "Custom Tailored Outfits": [
    "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=1000&q=80",
  ],
};

const defaultCuratedList = [
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
];

type ProductSeed = Pick<Product, "slug" | "name" | "price" | "collectionId" | "category"> &
  Partial<Omit<Product, "slug" | "name" | "price" | "collectionId" | "category">> & {
    tones?: number[];
  };

let seq = 0;
function p(seed: ProductSeed): Product {
  seq += 1;
  const { tones = [seq % 12, (seq + 3) % 12, (seq + 7) % 12], ...rest } = seed;
  const pool = curatedCategoryImages[seed.category] ?? defaultCuratedList;
  const product: Product = {
    id: seq.toString(),
    currency: "INR",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Ivory", hex: "#f4ecdd" },
      { name: "Espresso", hex: "#3b2f28" },
      { name: "Blush", hex: "#e4cfc6" },
    ],
    images: tones.map((tone, i) => ({
      tone,
      src: pool[i % pool.length],
      alt: `${seed.name} — view ${i + 1}`,
    })),
    stock: 8,
    customizable: false,
    tags: [],
    shortDescription: "",
    description: "",
    fabric: "Silk & cotton blend",
    embroidery: "Hand-finished details",
    care: ["Dry clean only", "Store in a garment bag", "Steam, do not iron directly"],
    ...rest,
  };
  return product;
}

export const products: Product[] = [
  // Designer Suits
  p({
    slug: "sartorial-silk-salwar-suit",
    name: "The Sartorial Silk Salwar Suit",
    collectionId: "c-designer-suits",
    category: "Designer Suits",
    price: 18900,
    shortDescription: "A structured silk salwar suit with a relaxed churidar and dupatta.",
    description:
      "Cut from a fluid silk-cotton blend, this suit pairs a softly tailored kurta with a flowing salwar and a contrast dupatta. Quietly structured, endlessly wearable.",
    fabric: "Silk-cotton blend, 21 denier silk dupatta",
    embroidery: "Self-tone tonal piping along the neckline",
    tones: [2, 5, 8],
    newArrival: true,
    featured: true,
    tags: ["silk", "suit", "new"],
  }),
  p({
    slug: "champagne-georgette-suit",
    name: "Champagne Georgette Suit",
    collectionId: "c-designer-suits",
    category: "Designer Suits",
    price: 16500,
    shortDescription: "A champagne georgette ensemble with scalloped hem details.",
    description:
      "A champagne-toned georgette suit with a delicate scalloped hem, gathered sleeves and a matching printed dupatta.",
    fabric: "Premium georgette",
    embroidery: "Zardozi-assisted scalloped hem",
    tones: [1, 4, 7],
    seasonal: true,
    tags: ["georgette", "champagne"],
  }),
  p({
    slug: "espresso-linen-suit",
    name: "Espresso Linen Salwar Suit",
    collectionId: "c-designer-suits",
    category: "Designer Suits",
    price: 14800,
    shortDescription: "A grounded espresso linen suit for refined daytime dressing.",
    description:
      "A breathable, garment-dyed espresso linen suit with minimalist buttons and a clean, tailored line.",
    fabric: "European linen",
    embroidery: "Hand-stitched button loops",
    tones: [9, 0, 3],
    bestselling: true,
    tags: ["linen", "daywear"],
  }),

  // Ethnic Wear
  p({
    slug: "ivory-silk-anarkali",
    name: "Ivory Silk Anarkali",
    collectionId: "c-ethnic-wear",
    category: "Ethnic Wear",
    price: 22900,
    shortDescription: "A floor-sweeping ivory silk anarkali with a gathered, flared skirt.",
    description:
      "A twenty-panel anarkali in ivory silk, cut to cascade from the shoulder to the floor with a slender full sleeve.",
    fabric: "Banarasi silk",
    embroidery: "Gota-patti accent at the yoke",
    tones: [3, 6, 9],
    editorial: true,
    featured: true,
    tags: ["anarkali", "silk"],
  }),
  p({
    slug: "wine-sharara-set",
    name: "Wine Sharara Set",
    collectionId: "c-ethnic-wear",
    category: "Ethnic Wear",
    price: 19900,
    shortDescription: "A wine sharara set with a cropped, embroidered kurta.",
    description:
      "A festive sharara set pairing a cropped kurta with wide-legged sharara pants, finished with a sheer dupatta.",
    fabric: "Silk organza",
    embroidery: "Thread-embroidered motifs",
    tones: [11, 2, 5],
    seasonal: true,
    tags: ["sharara", "festive"],
  }),
  p({
    slug: "churidar-cotton-set",
    name: "Handloom Churidar Set",
    collectionId: "c-ethnic-wear",
    category: "Ethnic Wear",
    price: 12900,
    shortDescription: "A breathable handloom churidar set in soft mulmul.",
    description:
      "A comfortable mulmul churidar set with a relaxed kameez silhouette and a lightweight dupatta.",
    fabric: "Handloom mulmul",
    embroidery: "Kantha-style stitch details",
    tones: [0, 1, 4],
    newArrival: true,
    tags: ["handloom", "everyday"],
  }),

  // Party Wear
  p({
    slug: "noir-sequin-dress",
    name: "Noir Sequin Cocktail Dress",
    collectionId: "c-party-wear",
    category: "Party Wear",
    price: 24500,
    shortDescription: "A slim noir cocktail dress scattered with tonal sequins.",
    description:
      "A fluid, column-cut cocktail dress in black, hand-set with tonal sequins that catch the light with every step.",
    fabric: "Crepe with hand-set sequins",
    embroidery: "Tonal sequin scatter",
    tones: [5, 8, 11],
    sizes: ["XS", "S", "M", "L"],
    bestselling: true,
    featured: true,
    tags: ["cocktail", "evening"],
  }),
  p({
    slug: "rose-velvet-dress",
    name: "Rose Velvet Dress",
    collectionId: "c-party-wear",
    category: "Party Wear",
    price: 23800,
    shortDescription: "A rich rose velvet dress with a softly squared neckline.",
    description:
      "A body-skimming velvet dress in deep rose, with an architectural squared neckline and elegant side slit.",
    fabric: "Cotton-backed silk velvet",
    embroidery: "Ribbed velvet texture",
    tones: [6, 9, 0],
    seasonal: true,
    tags: ["velvet", "winter"],
  }),
  p({
    slug: "champagne-drape-gown",
    name: "Champagne Drape Gown",
    collectionId: "c-party-wear",
    category: "Party Wear",
    price: 27900,
    shortDescription: "A bias-cut champagne gown with an asymmetric drape.",
    description:
      "A bias-cut gown in liquid champagne crepe, engineered to drape and move as a single, effortless line.",
    fabric: "Liquid crepe",
    embroidery: "Asymmetric self-drape",
    tones: [4, 7, 10],
    editorial: true,
    tags: ["gown", "formal"],
  }),

  // Bridal Wear
  p({
    slug: "regal-bridal-lehenga",
    name: "Regal Bridal Lehenga",
    collectionId: "c-bridal-wear",
    category: "Bridal Wear",
    price: 98500,
    shortDescription: "A hand-embroidered bridal lehenga with a trailing dupatta.",
    description:
      "A full-skirt bridal lehenga in raw silk, hand-embroidered over three months and paired with a trailing dupatta.",
    fabric: "Raw silk with zardozi embroidery",
    embroidery: "Zardozi, dabka & resham handwork",
    tones: [7, 10, 1],
    customizable: true,
    editorial: true,
    featured: true,
    tags: ["bridal", "lehenga", "bespoke"],
  }),
  p({
    slug: "ivory-trousseau-set",
    name: "Ivory Trousseau Set",
    collectionId: "c-bridal-wear",
    category: "Bridal Wear",
    price: 48900,
    shortDescription: "An ivory trousseau ensemble for the pre-wedding days.",
    description:
      "An ivory ensemble of a short kurti and lehenga skirt, softly worked with pearl-toned embroidery.",
    fabric: "Silk organza",
    embroidery: "Pearl & seed-bead work",
    tones: [8, 11, 2],
    customizable: true,
    newArrival: true,
    tags: ["bridal", "trousseau"],
  }),
  p({
    slug: "blush-engagement-lehenga",
    name: "Blush Engagement Lehenga",
    collectionId: "c-bridal-wear",
    category: "Bridal Wear",
    price: 64900,
    shortDescription: "A blush engagement lehenga with subtle metallic glimmer.",
    description:
      "A blush lehenga with a modern flared silhouette and subtle metallic threadwork that glimmers softly.",
    fabric: "Silk georgette",
    embroidery: "Fine metallic threadwork",
    tones: [2, 5, 8],
    customizable: true,
    editorial: true,
    tags: ["bridal", "engagement"],
  }),

  // Festive Collections
  p({
    slug: "diwali-gold-kurti",
    name: "Diwali Gold Kurti Set",
    collectionId: "c-festive-collections",
    category: "Festive Collections",
    price: 15400,
    shortDescription: "A gold-toned kurti set for festive evenings.",
    description:
      "A celebratory kurti set in antique gold, paired with matching palazzo trousers and a tonal dupatta.",
    fabric: "Art silk with metallic accents",
    embroidery: "Resham & zardozi motifs",
    tones: [9, 0, 3],
    seasonal: true,
    tags: ["diwali", "festive"],
  }),
  p({
    slug: "eid-seafoam-anarkali",
    name: "Eid Seafoam Anarkali",
    collectionId: "c-festive-collections",
    category: "Festive Collections",
    price: 18400,
    shortDescription: "A seafoam anarkali in soft organza.",
    description:
      "A pastel seafoam anarkali with a delicate organza finish and fine floral embroidery spreading from the waist.",
    fabric: "Silk organza",
    embroidery: "Floral resham work",
    tones: [10, 1, 4],
    seasonal: true,
    tags: ["eid", "festive"],
  }),
  p({
    slug: "festive-silk-suti",
    name: "Festive Silk Suti",
    collectionId: "c-festive-collections",
    category: "Festive Collections",
    price: 16900,
    shortDescription: "A festive silk suti set in rich maroon.",
    description:
      "A rich maroon silk suti set with a generous skirt and a sheer contrast dupatta.",
    fabric: "Silk suti",
    embroidery: "Matching embroidery on the hem",
    tones: [0, 3, 6],
    tags: ["festive", "suti"],
  }),

  // Sarees
  p({
    slug: "kanjeevaram-silk-saree",
    name: "Kanjeevaram Silk Saree",
    collectionId: "c-sarees",
    category: "Sarees",
    price: 42500,
    shortDescription: "A handwoven Kanjeevaram silk saree with contrast borders.",
    description:
      "A handwoven Kanjeevaram silk saree with a glossy body and contrasting zari borders, priced by the weave.",
    fabric: "Pure Kanjeevaram silk, zari borders",
    embroidery: "Handwoven zari",
    tones: [1, 4, 7],
    editorial: true,
    featured: true,
    tags: ["silk", "saree", "handwoven"],
  }),
  p({
    slug: "banarasi-organza-saree",
    name: "Banarasi Organza Saree",
    collectionId: "c-sarees",
    category: "Sarees",
    price: 36500,
    shortDescription: "A translucent Banarasi organza saree with brocade weave.",
    description:
      "A featherweight Banarasi organza saree with a fine brocade weave and a luminous, airy drape.",
    fabric: "Silk organza",
    embroidery: "Brocade weave",
    tones: [3, 6, 9],
    newArrival: true,
    tags: ["organza", "saree"],
  }),
  p({
    slug: "daily-drape-cotton-saree",
    name: "Daily Drape Cotton Saree",
    collectionId: "c-sarees",
    category: "Sarees",
    price: 9800,
    shortDescription: "A breathable cotton saree in a soft handloom weave.",
    description:
      "A cool, breathable handloom cotton saree with a gentle texture and a comfortable, everyday drape.",
    fabric: "Handloom cotton",
    embroidery: "Self-tone thread border",
    tones: [5, 8, 11],
    tags: ["cotton", "everyday"],
  }),

  // Kurtis
  p({
    slug: "linen-mulmul-kurti",
    name: "Linen-Mulmul Kurti",
    collectionId: "c-kurtis",
    category: "Kurtis",
    price: 6900,
    shortDescription: "A relaxed kurti in a linen-mulmul blend.",
    description:
      "A relaxed, hip-length kurti in a linen-mulmul blend with a rounded neck and side slits.",
    fabric: "Linen-mulmul blend",
    embroidery: "Contrast hand stitching",
    tones: [6, 9, 0],
    newArrival: true,
    tags: ["linen", "everyday"],
  }),
  p({
    slug: "andhra-cotton-kurti",
    name: "Andhra Cotton Kurti",
    collectionId: "c-kurtis",
    category: "Kurtis",
    price: 6200,
    shortDescription: "An Andhra cotton kurti with yoke detailing.",
    description:
      "A soft Andhra cotton kurti with a gently gathered yoke and a flared, comfortable silhouette.",
    fabric: "Andhra cotton",
    embroidery: "Tonal yoke stitch",
    tones: [8, 11, 2],
    tags: ["cotton", "everyday"],
  }),

  // Lehengas
  p({
    slug: "mirror-work-lehenga",
    name: "Mirror Work Lehenga",
    collectionId: "c-lehengas",
    category: "Lehengas",
    price: 37900,
    shortDescription: "A folk-heart lehenga with intricate mirror work.",
    description:
      "A folk-inspired lehenga in deep indigo, embroidered with mirror, thread and bead work across the skirt.",
    fabric: "Silk-cotton with mirror work",
    embroidery: "Mirror & thread embroidery",
    tones: [4, 7, 10],
    editorial: true,
    tags: ["lehenga", "folk"],
  }),
  p({
    slug: "festive-velvet-lehenga",
    name: "Festive Velvet Lehenga",
    collectionId: "c-lehengas",
    category: "Lehengas",
    price: 45900,
    shortDescription: "A deep-berry velvet lehenga for winter weddings.",
    description:
      "A deep-berry velvet lehenga with a structured flared skirt and antique gold embroidery.",
    fabric: "Silk velvet",
    embroidery: "Antique gold zardozi",
    tones: [7, 10, 1],
    seasonal: true,
    tags: ["velvet", "lehenga"],
  }),

  // Western Wear
  p({
    slug: "tailored-ivory-blazer",
    name: "Tailored Ivory Blazer",
    collectionId: "c-western-wear",
    category: "Western Wear",
    price: 16900,
    shortDescription: "A sharp, single-breasted ivory blazer.",
    description:
      "A single-breasted blazer with a nipped waist and a clean lapel, cut from a structured cotton-silk cloth.",
    fabric: "Cotton-silk suiting",
    embroidery: "Fully lined, hand-finished",
    tones: [9, 0, 3],
    sizes: ["XS", "S", "M", "L"],
    bestselling: true,
    tags: ["blazer", "tailored"],
  }),
  p({
    slug: "black-slip-dress",
    name: "Consider Silk Slip Dress",
    collectionId: "c-western-wear",
    category: "Western Wear",
    price: 13800,
    shortDescription: "A bias-cut silk slip dress in black.",
    description:
      "A bias-cut silk slip dress with delicate straps and a polished, architectural line.",
    fabric: "Silk satin",
    embroidery: "Bias-cut construction",
    tones: [11, 2, 5],
    sizes: ["XS", "S", "M", "L"],
    tags: ["silk", "dress"],
  }),
  p({
    slug: "espresso-wide-trouser",
    name: "Espresso Wide-Leg Trouser",
    collectionId: "c-western-wear",
    category: "Western Wear",
    price: 10900,
    shortDescription: "A high-rise wide-leg trouser in espresso.",
    description:
      "High-rise, wide-leg trousers with a pressed crease and a fluid, lengthening fit.",
    fabric: "Stretch crepe suiting",
    embroidery: "Fully lined trousers",
    tones: [2, 5, 8],
    tags: ["trouser", "tailored"],
  }),

  // Co-ord Sets
  p({
    slug: "beige-co-ord-set",
    name: "Beige Linen Co-ord Set",
    collectionId: "c-co-ord-sets",
    category: "Co-ord Sets",
    price: 15900,
    shortDescription: "A two-piece linen co-ord in warm beige.",
    description:
      "A relaxed two-piece set in warm beige linen — a boxy shirt and wide trousers designed to be worn together or apart.",
    fabric: "Washed linen",
    embroidery: "Horn buttons",
    tones: [10, 1, 4],
    newArrival: true,
    featured: true,
    tags: ["linen", "co-ord"],
  }),
  p({
    slug: "blush-silk-co-ord",
    name: "Blush Silk Co-ord Set",
    collectionId: "c-co-ord-sets",
    category: "Co-ord Sets",
    price: 20500,
    shortDescription: "A blush silk co-ord with a camisole and midi skirt.",
    description:
      "A blush silk co-ord pairing a bias-cut camisole with a matching midi skirt, cut to move as one.",
    fabric: "Silk satin",
    embroidery: "Bias-cut, self-fabric binding",
    tones: [6, 9, 0],
    editorial: true,
    tags: ["silk", "co-ord"],
  }),

  // Custom Outfits (women)
  p({
    slug: "bespoke-women-custom",
    name: "Bespoke Custom Outfit",
    collectionId: "c-custom-outfits",
    category: "Custom Outfits",
    price: 39000,
    shortDescription: "A fully personalised women's outfit, designed from scratch.",
    description:
      "Begin with a consultation. We draft a unique silhouette, select cloth, embroidery and finish — entirely around you.",
    fabric: "Selected at the atelier",
    embroidery: "To your design",
    tones: [0, 3, 6],
    customizable: true,
    editorial: true,
    featured: true,
    tags: ["bespoke", "custom"],
  }),

  // Men — Designer Kurtas
  p({
    slug: "chanderi-kurta",
    name: "Chanderi Kurta",
    collectionId: "c-designer-kurtas",
    category: "Designer Kurtas",
    price: 8900,
    shortDescription: "A handwoven Chanderi kurta with a relaxed collar.",
    description:
      "A handwoven Chanderi kurta with a soft hand-feel, a mandarin collar and a clean, straight cut.",
    fabric: "Chanderi silk-cotton",
    embroidery: "Tonal button placket",
    tones: [1, 4, 7],
    sizes: ["S", "M", "L", "XL", "XXL"],
    newArrival: true,
    tags: ["kurta", "chanderi"],
  }),
  p({
    slug: "linen-mens-kurta",
    name: "Linen Kurta",
    collectionId: "c-designer-kurtas",
    category: "Designer Kurtas",
    price: 7600,
    shortDescription: "A breathable linen kurta for warm days.",
    description:
      "A breathable linen kurta with an unstructured silhouette and a subtle texture.",
    fabric: "European linen",
    embroidery: "Self-tone stitching",
    tones: [3, 6, 9],
    sizes: ["S", "M", "L", "XL", "XXL"],
    bestselling: true,
    tags: ["linen", "kurta"],
  }),

  // Men — Wedding Wear
  p({
    slug: "regal-ivory-sherwani",
    name: "Regal Ivory Sherwani",
    collectionId: "c-wedding-wear",
    category: "Wedding Wear",
    price: 48500,
    shortDescription: "A hand-embroidered ivory sherwani.",
    description:
      "A structured ivory sherwani with hand embroidery at the placket, worn over a matching kurta and churidar.",
    fabric: "Silk-cotton with zardozi",
    embroidery: "Zardozi at the placket",
    tones: [5, 8, 11],
    sizes: ["S", "M", "L", "XL", "XXL"],
    customizable: true,
    editorial: true,
    featured: true,
    tags: ["sherwani", "wedding"],
  }),
  p({
    slug: "midnight-sherwani",
    name: "Midnight Blue Sherwani",
    collectionId: "c-wedding-wear",
    category: "Wedding Wear",
    price: 54900,
    shortDescription: "A midnight-blue sherwani with subtle embroidery.",
    description:
      "A midnight-blue sherwani with a slim silhouette and understated tonal embroidery.",
    fabric: "Silk with tonal embroidery",
    embroidery: "Tonal silver-thread work",
    tones: [7, 10, 1],
    sizes: ["S", "M", "L", "XL", "XXL"],
    customizable: true,
    tags: ["sherwani", "wedding"],
  }),

  // Men — Formal Wear
  p({
    slug: "charcoal-tailored-suit",
    name: "Charcoal Tailored Suit",
    collectionId: "c-formal-wear",
    category: "Formal Wear",
    price: 32900,
    shortDescription: "A two-piece tailored suit in charcoal worsted.",
    description:
      "A two-piece suit in charcoal worsted with a notch lapel, fully canvassed construction, with a super-slim trouser.",
    fabric: "Worsted wool blend",
    embroidery: "Fully canvassed, horn buttons",
    tones: [9, 0, 3],
    sizes: ["S", "M", "L", "XL", "XXL"],
    editorial: true,
    tags: ["suit", "formal"],
  }),
  p({
    slug: "navy-formal-blazer",
    name: "Navy Formal Blazer",
    collectionId: "c-formal-wear",
    category: "Formal Wear",
    price: 21900,
    shortDescription: "A versatile navy blazer with a soft shoulder.",
    description:
      "A navy blazer with a soft, unstructured shoulder and a versatile classic line, in a tropical weave.",
    fabric: "Tropical wool blend",
    embroidery: "Fully lined",
    tones: [11, 2, 5],
    sizes: ["S", "M", "L", "XL", "XXL"],
    bestselling: true,
    tags: ["blazer", "formal"],
  }),

  // Men — Indo-Western
  p({
    slug: "black-bandhgala",
    name: "Black Bandhgala",
    collectionId: "c-indo-western",
    category: "Indo-Western",
    price: 19800,
    shortDescription: "A black bandhgala jacket with a stand collar.",
    description:
      "A black bandhgala with a high stand collar and a clean front, equally at home at a wedding or a gala.",
    fabric: "Silk blend jacquard",
    embroidery: "Tonal jacquard texture",
    tones: [4, 7, 10],
    sizes: ["S", "M", "L", "XL", "XXL"],
    tags: ["bandhgala", "indo-western"],
  }),
  p({
    slug: "espresso-nehru-jacket",
    name: "Espresso Nehru Jacket",
    collectionId: "c-indo-western",
    category: "Indo-Western",
    price: 17400,
    shortDescription: "An espresso Nehru jacket with a shawl collar.",
    description:
      "An espresso Nehru jacket with a shawl collar and a tailored modern silhouette, in a rich cotton-silk blend.",
    fabric: "Cotton-silk blend",
    embroidery: "Shawl collar lapel",
    tones: [8, 11, 2],
    sizes: ["S", "M", "L", "XL", "XXL"],
    newArrival: true,
    tags: ["Nehru", "indo-western"],
  }),

  // Men — Custom Tailored
  p({
    slug: "bespoke-men-custom",
    name: "Made-to-Measure Ensemble",
    collectionId: "c-custom-tailored-outfits",
    category: "Custom Tailored Outfits",
    price: 34000,
    shortDescription: "A made-to-measure men's ensemble, cut to your measure.",
    description:
      "A made-to-measure experience: cloth, cut, lining and detailing chosen with a master tailor and cut to your exact measurements.",
    fabric: "Selected at the atelier",
    embroidery: "To your specification",
    tones: [2, 5, 8],
    customizable: true,
    editorial: true,
    featured: true,
    tags: ["bespoke", "made-to-measure"],
  }),
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((x) => x.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((x) => x.id === id);
}

export function getProductsByCollection(collectionId: string): Product[] {
  return products.filter((x) => x.collectionId === collectionId);
}
