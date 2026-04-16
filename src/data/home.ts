import {
  HeartPulse,
  ShieldCheck,
  Baby,
  UserRound,
  Sparkles,
  Truck,
  BadgeCheck,
  Stethoscope,
} from "lucide-react";

export const featuredCategories = [
  {
    title: "Women's Health",
    description:
      "Daily support for wellness, beauty, hormonal balance, and vitality.",
    href: "/shop/women",
    icon: HeartPulse,
  },
  {
    title: "Men's Health",
    description:
      "Performance, strength, immunity, and all-round nutritional support.",
    href: "/shop/men",
    icon: UserRound,
  },
  {
    title: "Kids' Health",
    description:
      "Gentle, trusted nutritional solutions designed for growing children.",
    href: "/shop/kids",
    icon: Baby,
  },
];

export const bestSellers = [
  {
    id: 1,
    name: "Wellwoman Original",
    category: "Women",
    price: "₦18,500",
    href: "/products/wellwoman-original",
  },
  {
    id: 2,
    name: "Wellman Original",
    category: "Men",
    price: "₦18,500",
    href: "/products/wellman-original",
  },
  {
    id: 3,
    name: "Pregnacare Original",
    category: "Pregnancy",
    price: "₦21,000",
    href: "/products/pregnacare-original",
  },
  {
    id: 4,
    name: "Wellkid Multi-Vitamin",
    category: "Kids",
    price: "₦15,000",
    href: "/products/wellkid-multivitamin",
  },
];

export const reasons = [
  {
    title: "Science-backed formulas",
    description:
      "Built around trust, clarity, and premium health positioning for modern wellness shoppers.",
    icon: Stethoscope,
  },
  {
    title: "Trusted product experience",
    description:
      "A store structure designed to make discovery, comparison, and purchase seamless on every screen.",
    icon: ShieldCheck,
  },
  {
    title: "Fast delivery readiness",
    description:
      "Clear product flow, conversion-first layout, and scalable ecommerce foundations for growth.",
    icon: Truck,
  },
  {
    title: "Premium brand presentation",
    description:
      "Modern visual system with polished cards, spacing, and trust indicators that feel high quality.",
    icon: Sparkles,
  },
];

export const trustPoints = [
  {
    title: "Premium wellness experience",
    icon: BadgeCheck,
  },
  {
    title: "Mobile-first shopping flow",
    icon: ShieldCheck,
  },
  {
    title: "Modern health-focused design",
    icon: HeartPulse,
  },
];
