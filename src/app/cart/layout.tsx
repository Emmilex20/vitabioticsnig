import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Shopping Cart",
  description: "Review the products in your cart before you continue to checkout.",
  path: "/cart",
  noIndex: true,
});

export default function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
