import SiteShell from "@/components/layout/site-shell";
import Container from "@/components/shared/container";
import CheckoutForm from "@/components/shop/checkout-form";

export default function CheckoutPage() {
  return (
    <SiteShell>
      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[linear-gradient(180deg,#eef5ff_0%,#f8fbff_55%,#ffffff_100%)]" />
        <div className="pointer-events-none absolute left-1/2 top-10 h-56 w-56 -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl" />
        <Container>
          <div className="relative">
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-blue-700">
                Checkout
              </span>
              <div className="hidden h-px w-12 bg-blue-200 sm:block" />
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                <span className="rounded-full bg-white/80 px-3 py-1 shadow-sm ring-1 ring-blue-100">
                  Contact
                </span>
                <span className="rounded-full bg-white/80 px-3 py-1 shadow-sm ring-1 ring-blue-100">
                  Delivery
                </span>
                <span className="rounded-full bg-white/80 px-3 py-1 shadow-sm ring-1 ring-blue-100">
                  Payment
                </span>
              </div>
            </div>

            <div className="max-w-3xl">
              <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-5xl">
                Secure checkout with a cleaner, faster order flow
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted-foreground)] sm:text-lg">
                Confirm your contact details, delivery address, and payment in
                one responsive layout designed to feel simple on mobile and calm
                on desktop.
              </p>
            </div>
          </div>

          <CheckoutForm />
        </Container>
      </section>
    </SiteShell>
  );
}
