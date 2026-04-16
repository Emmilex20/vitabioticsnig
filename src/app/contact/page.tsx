import type { Metadata } from "next";
import SiteShell from "@/components/layout/site-shell";
import Container from "@/components/shared/container";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Vitabiotics",
  description:
    "Get in touch with Vitabiotics for product questions, support, and wellness enquiries.",
  path: "/contact",
  noIndex: true,
});

export default function ContactPage() {
  return (
    <SiteShell>
      <section className="py-16">
        <Container>
          <h1 className="text-3xl font-extrabold text-(--foreground)">Contact</h1>
        </Container>
      </section>
    </SiteShell>
  );
}
