import type { Metadata } from "next";
import SiteShell from "@/components/layout/site-shell";
import Container from "@/components/shared/container";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Returns Policy",
  description: "Review the Vitabiotics returns policy for orders and refunds.",
  path: "/returns-policy",
  noIndex: true,
});

export default function ReturnsPolicyPage() {
  return (
    <SiteShell>
      <section className="py-16">
        <Container>
          <h1 className="text-3xl font-extrabold text-(--foreground)">Returns Policy</h1>
        </Container>
      </section>
    </SiteShell>
  );
}
