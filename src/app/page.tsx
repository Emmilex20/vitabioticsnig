import type { Metadata } from "next";
import SiteShell from "@/components/layout/site-shell";
import HeroSection from "@/components/home/hero-section";
import TrustStrip from "@/components/home/trust-strip";
import FeaturedCategories from "@/components/home/featured-categories";
import BestSellersPreview from "@/components/home/best-sellers-preview";
import WhyChooseUs from "@/components/home/why-choose-us";
import NewsletterCta from "@/components/home/newsletter-cta";
import {
  absoluteUrl,
  buildMetadata,
  serializeJsonLd,
  siteDescription,
  siteName,
} from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  description:
    "Discover premium vitamins, supplements, and wellness products with a faster, cleaner shopping experience for everyday health, immune support, beauty, energy, and family nutrition.",
  path: "/",
  keywords: [
    "premium vitamins",
    "health and wellness store",
    "multivitamin supplements",
    "family wellness products",
    "immune support supplements",
    "beauty vitamins",
    "daily health support",
  ],
});

export default function HomePage() {
  const jsonLd = serializeJsonLd([
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteName,
      url: absoluteUrl("/"),
      logo: absoluteUrl("/logo.png"),
      image: absoluteUrl("/logo.png"),
      description: siteDescription,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      url: absoluteUrl("/"),
      description: siteDescription,
      inLanguage: "en-NG",
    },
  ]);

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <HeroSection />
      <TrustStrip />
      <FeaturedCategories />
      <BestSellersPreview />
      <WhyChooseUs />
      <NewsletterCta />
    </SiteShell>
  );
}
