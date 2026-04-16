import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { absoluteUrl, toAbsoluteUrl } from "@/lib/seo";

export const revalidate = 3600;

type SitemapProduct = {
  slug: string;
  updatedAt: Date;
  imageUrl: string | null;
};

const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: absoluteUrl("/"),
    changeFrequency: "daily",
    priority: 1,
  },
  {
    url: absoluteUrl("/shop"),
    changeFrequency: "daily",
    priority: 0.95,
  },
  {
    url: absoluteUrl("/shop/women"),
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: absoluteUrl("/shop/men"),
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: absoluteUrl("/shop/kids"),
    changeFrequency: "weekly",
    priority: 0.85,
  },
  {
    url: absoluteUrl("/shop/pregnancy"),
    changeFrequency: "weekly",
    priority: 0.9,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products: SitemapProduct[] = await prisma.product.findMany({
    select: {
      slug: true,
      updatedAt: true,
      imageUrl: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const productRoutes: MetadataRoute.Sitemap = products.map(
    (product: SitemapProduct) => ({
      url: absoluteUrl(`/products/${product.slug}`),
      lastModified: product.updatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
      images: product.imageUrl ? [toAbsoluteUrl(product.imageUrl)] : undefined,
    })
  );

  return [...staticRoutes, ...productRoutes];
}
