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
  title: "Kids Vitamins & Children's Wellness Support",
  description:
    "Discover children's vitamins and kids wellness supplements created to support healthy growth, development, and daily nutritional balance.",
  path: "/shop/kids",
  keywords: [
    "kids vitamins",
    "children's vitamins",
    "kids wellness supplements",
    "growth support vitamins",
    "family nutrition products",
  ],
});

export default async function KidsPage() {
  const dbProducts: ShopDbProduct[] = await prisma.product.findMany({
    where: { category: "KIDS" },
    orderBy: { createdAt: "desc" },
  });

  const ratingsMap = await getProductRatingsMap(
    dbProducts.map((p: ShopDbProduct) => p.id)
  );

  const kidsProducts = dbProducts.map((product: ShopDbProduct) => {
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
              Kids&apos; health
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
              Trusted wellness support for growing children
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--muted-foreground)]">
              Discover premium children&apos;s vitamins presented with a clean and
              modern shopping flow.
            </p>
          </div>

          <div className="mt-10">
            {kidsProducts.length > 0 ? (
              <ProductGrid items={kidsProducts} />
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
