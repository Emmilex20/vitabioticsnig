import type { Metadata } from "next";

export const siteName = "Vitabiotics";
export const siteDescription =
  "Shop premium vitamins, supplements, and wellness products with a modern ecommerce experience built for trust, discovery, and confident everyday health support.";
export const defaultMetaTitle =
  "Vitabiotics | Premium Vitamins, Supplements & Wellness Products";
export const defaultSocialImage = "/opengraph-image";

export const defaultKeywords = [
  "vitamins",
  "supplements",
  "wellness products",
  "health supplements",
  "multivitamins",
  "daily vitamins",
  "immune support",
  "women's vitamins",
  "men's vitamins",
  "kids vitamins",
  "pregnancy supplements",
  "beauty supplements",
  "iron supplements",
  "omega supplements",
  "premium wellness store",
  "buy vitamins online",
  "nutritional support",
  "wellness ecommerce",
];

type BuildMetadataInput = {
  title?: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
};

export function getSiteUrl() {
  const envUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXTAUTH_URL ||
    "http://localhost:3000";

  try {
    return new URL(envUrl).origin;
  } catch {
    return "http://localhost:3000";
  }
}

export function absoluteUrl(path = "/") {
  return new URL(path, getSiteUrl()).toString();
}

export function toAbsoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  return absoluteUrl(pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`);
}

function mergeKeywords(extraKeywords: string[] = []) {
  return [...new Set([...defaultKeywords, ...extraKeywords])];
}

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  image = defaultSocialImage,
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const fullTitle = title ? `${title} | ${siteName}` : defaultMetaTitle;

  return {
    title,
    description,
    keywords: mergeKeywords(keywords),
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName,
      locale: "en_NG",
      type: "website",
      images: [
        {
          url: image,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  };
}

export function serializeJsonLd(data: object | object[]) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
