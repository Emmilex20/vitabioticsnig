import type { Metadata, Viewport } from "next";
import "./globals.css";
import AppProvider from "@/components/providers/app-provider";
import {
  defaultKeywords,
  defaultMetaTitle,
  defaultSocialImage,
  getSiteUrl,
  siteDescription,
  siteName,
} from "@/lib/seo";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: defaultMetaTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: defaultKeywords,
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  category: "health",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      {
        url: "/apple-touch-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
  openGraph: {
    title: defaultMetaTitle,
    description: siteDescription,
    url: "/",
    siteName,
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: defaultSocialImage,
        alt: defaultMetaTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultMetaTitle,
    description: siteDescription,
    images: [defaultSocialImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
