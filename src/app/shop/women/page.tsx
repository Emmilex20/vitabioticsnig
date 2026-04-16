import type { Metadata } from "next";
import SiteShell from "@/components/layout/site-shell";
import Container from "@/components/shared/container";
import ProductGrid from "@/components/shop/product-grid";
import { prisma } from "@/lib/prisma";
import { mapDbProductToStorefront } from "@/lib/storefront-products";
import { getProductRatingsMap } from "@/lib/product-ratings";
import { buildMetadata } from "@/lib/seo";

type ShopDbProduct = Parameters<typeof mapDbProductToStorefront>[0];

export const metadata: Metadata = buildMetadata({
  title: "Women's Vitamins & Wellness Supplements",
  description:
    "Explore women's vitamins, beauty supplements, iron support, and daily wellness formulas designed for energy, vitality, and nutritional balance.",
  path: "/shop/women",
  keywords: [
    "women's vitamins",
    "women's supplements",
    "beauty supplements",
    "iron support for women",
    "daily wellness for women",
  ],
});

export default async function WomenPage() {
  const dbProducts: ShopDbProduct[] = await prisma.product.findMany({
    where: { category: "WOMEN" },
    orderBy: { createdAt: "desc" },
  });

  const ratingsMap = await getProductRatingsMap(
    dbProducts.map((p: ShopDbProduct) => p.id)
  );

  const womenProducts = dbProducts.map((product: ShopDbProduct) => {
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
      <section className="py-14">
        <Container>
          <div className="rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-sm">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-blue-700">
              Women&apos;s health
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
              Products for women&apos;s wellness and vitality
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--muted-foreground)]">
              Explore curated women&apos;s health products in a cleaner and more premium
              store experience.
            </p>
          </div>

          <div className="mt-10">
            {womenProducts.length > 0 ? (
              <ProductGrid items={womenProducts} />
            ) : (
              <div className="rounded-[2rem] border border-[var(--border)] bg-white p-10 text-center shadow-sm">
                <h2 className="text-2xl font-bold text-[var(--foreground)]">
                  No products in this category yet
                </h2>
                <p className="mt-3 text-[var(--muted-foreground)]">
                  Products added from the admin panel will appear here.
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
