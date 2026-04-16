import type { Metadata } from "next";
import SiteShell from "@/components/layout/site-shell";
import ShopHero from "@/components/shop/shop-hero";
import ShopExperience from "@/components/shop/shop-experience";
import { prisma } from "@/lib/prisma";
import { mapDbProductToStorefront } from "@/lib/storefront-products";
import { getProductRatingsMap } from "@/lib/product-ratings";
import { buildMetadata } from "@/lib/seo";

type ShopDbProduct = Parameters<typeof mapDbProductToStorefront>[0];

export const metadata: Metadata = buildMetadata({
  title: "Shop Vitamins, Supplements & Wellness Products",
  description:
    "Browse premium vitamins, multivitamins, and wellness supplements for women, men, kids, and pregnancy support in one streamlined shopping experience.",
  path: "/shop",
  keywords: [
    "shop vitamins online",
    "wellness supplements",
    "multivitamins for women",
    "multivitamins for men",
    "kids vitamins online",
    "pregnancy supplements online",
  ],
});

export default async function ShopPage() {
  const dbProducts: ShopDbProduct[] = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const ratingsMap = await getProductRatingsMap(
    dbProducts.map((p: ShopDbProduct) => p.id)
  );

  const products = dbProducts.map((product: ShopDbProduct) => {
    const mapped = mapDbProductToStorefront(product);
    const rating = ratingsMap[product.id];

    return {
      ...mapped,
      averageRating: rating?.averageRating ?? 0,
      reviewCount: rating?.reviewCount ?? 0,
    };
  });

  return (
    <SiteShell>
      <ShopHero />
      <ShopExperience products={products} />
    </SiteShell>
  );
}
