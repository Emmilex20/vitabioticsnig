import type { Metadata } from "next";
import SiteShell from "@/components/layout/site-shell";
import Container from "@/components/shared/container";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms and Conditions",
  description: "Read the Vitabiotics terms and conditions for using this store.",
  path: "/terms",
  noIndex: true,
});

export default function TermsPage() {
  return (
    <SiteShell>
      <section className="py-16">
        <Container>
          <h1 className="text-3xl font-extrabold text-(--foreground)">Terms & Conditions</h1>
        </Container>
      </section>
    </SiteShell>
  );
}
