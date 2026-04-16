import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import SiteShell from "@/components/layout/site-shell";
import Container from "@/components/shared/container";
import { prisma } from "@/lib/prisma";
import { mapDbProductToStorefront } from "@/lib/storefront-products";
import ProductGallery from "@/components/shop/product-gallery";
import ProductPurchasePanel from "@/components/shop/product-purchase-panel";
import ProductInfo from "@/components/shop/product-info";
import ProductDetailsSections from "@/components/shop/product-details-sections";
import RelatedProducts from "@/components/shop/related-products";
import RecentlyViewedTracker from "@/components/shop/recently-viewed-tracker";
import RecentlyViewedProducts from "@/components/shop/recently-viewed-products";
import ProductReviewsSection from "@/components/shop/product-reviews-section";
import { getProductRatingsMap } from "@/lib/product-ratings";
import { buildMetadata, serializeJsonLd, siteName, toAbsoluteUrl } from "@/lib/seo";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const getProductBySlug = cache(async (slug: string) =>
  prisma.product.findUnique({
    where: { slug },
  })
);

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const dbProduct = await getProductBySlug(slug);

  if (!dbProduct) {
    return buildMetadata({
      title: "Product Not Found",
      description: "The requested product could not be found.",
      path: `/products/${slug}`,
      noIndex: true,
    });
  }

  const product = mapDbProductToStorefront(dbProduct);

  return buildMetadata({
    title: product.name,
    description: product.shortDescription,
    path: `/products/${product.slug}`,
    image: product.imageUrl || "/opengraph-image",
    keywords: [
      product.name,
      `${product.category} vitamins`,
      `${product.category} supplements`,
      ...product.ingredients.slice(0, 4),
    ],
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const dbProduct = await getProductBySlug(slug);

  if (!dbProduct) {
    notFound();
  }

  const relatedDbProducts = await prisma.product.findMany({
    where: {
      category: dbProduct.category,
      NOT: {
        id: dbProduct.id,
      },
    },
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  });

  const ratingsMap = await getProductRatingsMap([
    dbProduct.id,
    ...relatedDbProducts.map((p) => p.id),
  ]);

  const productRating = ratingsMap[dbProduct.id];
  const product = {
    ...mapDbProductToStorefront(dbProduct),
    averageRating: productRating?.averageRating ?? 0,
    reviewCount: productRating?.reviewCount ?? 0,
  };
  const productUrl = toAbsoluteUrl(`/products/${product.slug}`);
  const productImage = toAbsoluteUrl(product.imageUrl || "/logo.png");
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    image: [productImage],
    brand: {
      "@type": "Brand",
      name: siteName,
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "NGN",
      price: product.price,
      availability: `https://schema.org/${product.inStock ? "InStock" : "OutOfStock"}`,
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating:
      product.reviewCount > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: Number(product.averageRating.toFixed(1)),
            reviewCount: product.reviewCount,
          }
        : undefined,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: toAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop",
        item: toAbsoluteUrl("/shop"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  const relatedProducts = relatedDbProducts.map((related) => {
    const rating = ratingsMap[related.id];

    return {
      ...mapDbProductToStorefront(related),
      averageRating: rating?.averageRating ?? 0,
      reviewCount: rating?.reviewCount ?? 0,
    };
  });

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([productJsonLd, breadcrumbJsonLd]),
        }}
      />
      <section className="relative overflow-hidden py-10 sm:py-14">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-115 bg-[linear-gradient(180deg,#eff5ff_0%,#f7fbff_42%,#ffffff_100%)]" />
        <div className="pointer-events-none absolute left-1/2 top-12 h-56 w-56 -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl" />

        <Container>
          <div className="relative">
            <div className="mb-8 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-(--muted-foreground)">
              <span>Home</span>
              <span>/</span>
              <span>Shop</span>
              <span>/</span>
              <span className="text-(--foreground)">{product.name}</span>
            </div>

            <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1.04fr)_minmax(360px,0.96fr)]">
              <div className="space-y-5 xl:sticky xl:top-28">
                <ProductGallery
                  productId={product.id}
                  productName={product.name}
                  imageUrl={product.imageUrl}
                />
                <ProductPurchasePanel
                  product={product}
                  relatedProducts={relatedProducts}
                />
              </div>
              <ProductInfo product={product} />
            </div>
          </div>

          <RecentlyViewedTracker product={product} />

          <ProductDetailsSections product={product} />

          <ProductReviewsSection productId={product.id} />

          <RelatedProducts
            currentProductId={product.id}
            currentCategory={product.category}
            products={relatedProducts}
          />

          <RecentlyViewedProducts currentProductId={product.id} />
        </Container>
      </section>
    </SiteShell>
  );
}
