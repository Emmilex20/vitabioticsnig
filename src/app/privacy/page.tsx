import type { Metadata } from "next";
import SiteShell from "@/components/layout/site-shell";
import Container from "@/components/shared/container";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Review the Vitabiotics privacy policy and data handling terms.",
  path: "/privacy",
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <SiteShell>
      <section className="py-16">
        <Container>
          <h1 className="text-3xl font-extrabold text-(--foreground)">Privacy Policy</h1>
        </Container>
      </section>
    </SiteShell>
  );
}
