import type { Metadata } from "next";
import SiteShell from "@/components/layout/site-shell";
import Container from "@/components/shared/container";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Wellness Blog",
  description:
    "Read wellness stories, vitamin guides, and nutritional insights from Vitabiotics.",
  path: "/blog",
  noIndex: true,
});

export default function BlogPage() {
  return (
    <SiteShell>
      <section className="py-16">
        <Container>
          <h1 className="text-3xl font-extrabold text-(--foreground)">Blog</h1>
        </Container>
      </section>
    </SiteShell>
  );
}
