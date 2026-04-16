import Link from "next/link";
import SiteShell from "@/components/layout/site-shell";
import Container from "@/components/shared/container";

type PageProps = {
  searchParams: Promise<{
    orderId?: string;
  }>;
};

export default async function CheckoutSuccessPage({ searchParams }: PageProps) {
  const { orderId } = await searchParams;

  return (
    <SiteShell>
      <section className="py-20">
        <Container className="max-w-3xl">
          <div className="rounded-[2rem] border border-[var(--border)] bg-white p-10 text-center shadow-sm">
            <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">
              Order successful
            </span>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
              Thank you for your order
            </h1>

            <p className="mt-4 text-base leading-8 text-[var(--muted-foreground)]">
              Your order has been received successfully and is now awaiting
              processing.
            </p>

            {orderId ? (
              <div className="mt-6 rounded-[1.5rem] bg-slate-50 px-5 py-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                  Order ID
                </p>
                <p className="mt-2 text-lg font-bold text-[var(--foreground)]">
                  {orderId}
                </p>
              </div>
            ) : null}

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/shop"
                className="rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Continue Shopping
              </Link>

              <Link
                href="/track-order"
                className="rounded-full border border-[var(--border)] bg-white px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-gray-50"
              >
                Track Order
              </Link>

              <Link
                href="/"
                className="rounded-full border border-[var(--border)] bg-white px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-gray-50"
              >
                Back Home
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
