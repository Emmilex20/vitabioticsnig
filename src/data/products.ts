export type ProductCategory = "Women" | "Men" | "Kids" | "Pregnancy";

export type Product = {
  id: number;
  name: string;
  slug: string;
  category: ProductCategory;
  price: number;
  oldPrice?: number;
  shortDescription: string;
  badge?: string;
  sku: string;
  inStock: boolean;
  description: string;
  benefits: string[];
  ingredients: string[];
  usage: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Wellwoman Original",
    slug: "wellwoman-original",
    category: "Women",
    price: 18500,
    oldPrice: 21000,
    shortDescription:
      "Daily nutritional support designed for women's energy, wellness, and vitality.",
    badge: "Best Seller",
    sku: "WW-001",
    inStock: true,
    description:
      "Wellwoman Original is designed to support the nutritional needs of women with a premium daily formula focused on energy release, immune support, and overall wellbeing.",
    benefits: [
      "Supports daily energy release",
      "Helps maintain immune health",
      "Designed for women's nutritional needs",
      "Supports all-round wellness and vitality",
    ],
    ingredients: ["Vitamin D", "Iron", "Magnesium", "Zinc", "Vitamin B12"],
    usage:
      "Take one capsule per day with your main meal and swallow with water. Do not chew.",
  },
  {
    id: 2,
    name: "Wellman Original",
    slug: "wellman-original",
    category: "Men",
    price: 18500,
    oldPrice: 21000,
    shortDescription:
      "Advanced daily support for men's health, performance, and immune system care.",
    badge: "Popular",
    sku: "WM-001",
    inStock: true,
    description:
      "Wellman Original delivers nutritional support tailored to men's health, combining essential vitamins and minerals for energy, wellness, and daily performance.",
    benefits: [
      "Supports men's overall vitality",
      "Helps reduce tiredness and fatigue",
      "Contributes to immune system support",
      "Designed for active everyday living",
    ],
    ingredients: ["Vitamin C", "Magnesium", "Ginseng", "Iron", "Vitamin B6"],
    usage:
      "Take one tablet daily with your main meal. Swallow with water or a cold drink.",
  },
  {
    id: 3,
    name: "Pregnacare Original",
    slug: "pregnacare-original",
    category: "Pregnancy",
    price: 21000,
    shortDescription:
      "Carefully balanced nutritional support for pregnancy and maternal wellness.",
    badge: "Trusted",
    sku: "PG-001",
    inStock: true,
    description:
      "Pregnacare Original provides carefully balanced nutritional support during pregnancy, developed to support maternal wellbeing with trusted daily care.",
    benefits: [
      "Supports maternal nutritional needs",
      "Includes carefully selected vitamins and minerals",
      "Helps support wellbeing during pregnancy",
      "Trusted daily pregnancy support formula",
    ],
    ingredients: ["Folic Acid", "Vitamin D", "Iron", "Zinc", "Vitamin B12"],
    usage:
      "Take one tablet per day with your main meal. Best taken on a full stomach.",
  },
  {
    id: 4,
    name: "Wellkid Multi-Vitamin",
    slug: "wellkid-multivitamin",
    category: "Kids",
    price: 15000,
    oldPrice: 17000,
    shortDescription:
      "Gentle and reliable vitamin support for children's healthy growth and development.",
    sku: "WK-001",
    inStock: true,
    description:
      "Wellkid Multi-Vitamin offers trusted daily nutritional support for children, helping support growth, development, and general wellbeing.",
    benefits: [
      "Supports healthy growth and development",
      "Designed for children's daily nutritional support",
      "Helps maintain general wellbeing",
      "Easy-to-understand, family-friendly wellness option",
    ],
    ingredients: ["Vitamin A", "Vitamin C", "Vitamin D", "Zinc", "Calcium"],
    usage:
      "Take as directed on the pack. Best taken with food for daily support.",
  },
  {
    id: 5,
    name: "Feroglobin Capsules",
    slug: "feroglobin-capsules",
    category: "Women",
    price: 16200,
    shortDescription:
      "Iron and blood-building support with a trusted premium wellness positioning.",
    sku: "FG-001",
    inStock: true,
    description:
      "Feroglobin Capsules provide iron support in a trusted formula designed to contribute to healthy blood formation and overall vitality.",
    benefits: [
      "Supports iron intake",
      "Contributes to healthy blood formation",
      "Helps reduce tiredness and fatigue",
      "Trusted daily support formula",
    ],
    ingredients: ["Iron", "Folic Acid", "Vitamin B12", "Zinc"],
    usage:
      "Take one capsule daily with your main meal and swallow with water.",
  },
  {
    id: 6,
    name: "Perfectil Original",
    slug: "perfectil-original",
    category: "Women",
    price: 19500,
    shortDescription:
      "Beauty support formula designed for skin, hair, and nail nourishment.",
    badge: "Glow Care",
    sku: "PF-001",
    inStock: true,
    description:
      "Perfectil Original is a premium beauty supplement formulated to support skin, hair, and nails through carefully selected nutrients.",
    benefits: [
      "Supports skin nourishment",
      "Helps maintain healthy hair",
      "Supports nail strength",
      "Beauty-from-within daily formula",
    ],
    ingredients: ["Biotin", "Zinc", "Selenium", "Vitamin C", "Vitamin E"],
    usage:
      "Take one tablet per day with your main meal. Swallow with water.",
  },
  {
    id: 7,
    name: "Jointace Original",
    slug: "jointace-original",
    category: "Men",
    price: 22800,
    shortDescription:
      "Daily support designed for cartilage, joints, mobility, and active lifestyles.",
    sku: "JT-001",
    inStock: true,
    description:
      "Jointace Original is designed to support active lifestyles with nutritional ingredients that help support joint health and mobility.",
    benefits: [
      "Supports joint health",
      "Helps maintain mobility",
      "Designed for active lifestyles",
      "Premium daily support formula",
    ],
    ingredients: ["Glucosamine", "Vitamin D", "Zinc", "Copper", "Manganese"],
    usage: "Take two tablets daily with a meal. Swallow with water.",
  },
  {
    id: 8,
    name: "Omega-H3",
    slug: "omega-h3",
    category: "Men",
    price: 24000,
    oldPrice: 26500,
    shortDescription:
      "Premium omega-based support for heart health and everyday wellbeing.",
    badge: "High Demand",
    sku: "OH-001",
    inStock: true,
    description:
      "Omega-H3 provides premium omega support with a clean, trustworthy product presentation focused on heart health and everyday wellness.",
    benefits: [
      "Supports heart health",
      "Supports everyday wellbeing",
      "Premium omega-based formula",
      "Designed for consistent daily use",
    ],
    ingredients: ["Omega-3", "EPA", "DHA", "Vitamin E"],
    usage:
      "Take one to two capsules daily with food as directed on the label.",
  },
];
