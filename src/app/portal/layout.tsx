import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Professional Portal",
  description: "Professional portal pages for doctors and pharmacists.",
  path: "/portal",
  noIndex: true,
});

export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
