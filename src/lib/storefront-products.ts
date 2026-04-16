import { ProductCategory } from "@prisma/client";

export type StorefrontProductElement = {
  title: string;
  description: string;
};

export type StorefrontProduct = {
  id: string;
  name: string;
  slug: string;
  category: "Women" | "Men" | "Kids" | "Pregnancy";
  price: number;
  oldPrice?: number;
  shortDescription: string;
  badge?: string;
  inStock: boolean;
  description: string;
  usage: string;
  imageUrl?: string;
  benefits: string[];
  ingredients: string[];
  elementItems: StorefrontProductElement[];
  spotlightTitle?: string;
  bestFor?: string;
  averageRating?: number;
  reviewCount?: number;
};

export function mapCategory(
  category: ProductCategory
): StorefrontProduct["category"] {
  switch (category) {
    case "WOMEN":
      return "Women";
    case "MEN":
      return "Men";
    case "KIDS":
      return "Kids";
    case "PREGNANCY":
      return "Pregnancy";
    default:
      return "Women";
  }
}

function parseElementItems(value: unknown): StorefrontProductElement[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const title = "title" in item ? item.title : "";
      const description = "description" in item ? item.description : "";

      if (typeof title !== "string" || typeof description !== "string") {
        return null;
      }

      const cleanTitle = title.trim();
      const cleanDescription = description.trim();

      if (!cleanTitle || !cleanDescription) {
        return null;
      }

      return {
        title: cleanTitle,
        description: cleanDescription,
      };
    })
    .filter((item): item is StorefrontProductElement => Boolean(item));
}

export function mapDbProductToStorefront(product: {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  price: number;
  oldPrice: number | null;
  shortDescription: string;
  badge: string | null;
  inStock: boolean;
  description: string;
  usage: string;
  imageUrl: string | null;
  benefits: string[];
  ingredients: string[];
  elementItems?: unknown;
  spotlightTitle?: string | null;
  bestFor?: string | null;
}): StorefrontProduct {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    category: mapCategory(product.category),
    price: product.price,
    oldPrice: product.oldPrice ?? undefined,
    shortDescription: product.shortDescription,
    badge: product.badge ?? undefined,
    inStock: product.inStock,
    description: product.description,
    usage: product.usage,
    imageUrl: product.imageUrl ?? undefined,
    benefits: product.benefits ?? [],
    ingredients: product.ingredients ?? [],
    elementItems: parseElementItems(product.elementItems),
    spotlightTitle: product.spotlightTitle ?? undefined,
    bestFor: product.bestFor ?? undefined,
    averageRating: 0,
    reviewCount: 0,
  };
}
