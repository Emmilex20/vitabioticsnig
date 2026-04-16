import type { Metadata } from "next";
import SiteShell from "@/components/layout/site-shell";
import Container from "@/components/shared/container";
import TrackOrderForm from "@/components/shop/track-order-form";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Track Your Order",
  description: "Check your order payment and delivery progress.",
  path: "/track-order",
  noIndex: true,
});

export default function TrackOrderPage() {
  return (
    <SiteShell>
      <section className="py-14 sm:py-16">
        <Container>
          <div className="mb-8">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-blue-700">
              Order tracking
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
              Track Your Order
            </h1>
            <p className="mt-3 text-base text-[var(--muted-foreground)]">
              Check your payment and delivery progress using your order ID and
              email address.
            </p>
          </div>

          <TrackOrderForm />
        </Container>
      </section>
    </SiteShell>
  );
}
