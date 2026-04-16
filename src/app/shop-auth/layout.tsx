import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Customer Account",
  description:
    "Customer account pages for signing in, registering, and managing access.",
  path: "/shop-auth",
  noIndex: true,
});

export default function ShopAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
