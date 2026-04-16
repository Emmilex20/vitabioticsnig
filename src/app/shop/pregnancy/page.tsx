import type { Metadata } from "next";
import SiteShell from "@/components/layout/site-shell";
import Container from "@/components/shared/container";
import ProductGrid from "@/components/shop/product-grid";
import { prisma } from "@/lib/prisma";
import { mapDbProductToStorefront } from "@/lib/storefront-products";
import { getProductRatingsMap } from "@/lib/product-ratings";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Pregnancy Vitamins & Maternal Wellness Support",
  description:
    "Shop pregnancy vitamins and maternal wellness supplements with carefully balanced nutritional support for pregnancy and everyday maternal wellbeing.",
  path: "/shop/pregnancy",
  keywords: [
    "pregnancy vitamins",
    "pregnancy supplements",
    "maternal wellness",
    "prenatal nutritional support",
    "pregnancy health products",
  ],
});

export default async function PregnancyPage() {
  const dbProducts = await prisma.product.findMany({
    where: { category: "PREGNANCY" },
    orderBy: { createdAt: "desc" },
  });

  const ratingsMap = await getProductRatingsMap(dbProducts.map((p) => p.id));

  const pregnancyProducts = dbProducts.map((product) => {
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
              Pregnancy support
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
              Nutritional support for pregnancy and maternal wellness
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--muted-foreground)]">
              Explore premium pregnancy wellness products with a more polished and
              trustworthy presentation.
            </p>
          </div>

          <div className="mt-10">
            {pregnancyProducts.length > 0 ? (
              <ProductGrid items={pregnancyProducts} />
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
