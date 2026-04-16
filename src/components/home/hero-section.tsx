import Link from "next/link";
import { ShieldCheck, HeartPulse, Sparkles } from "lucide-react";
import Container from "@/components/shared/container";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(30,79,174,0.12),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(30,79,174,0.08),_transparent_30%)]" />

      <Container className="relative grid items-center gap-12 lg:grid-cols-2">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-blue-700 sm:text-sm">
            Premium health & wellness
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
            A modern wellness store built for trust, elegance, and seamless
            shopping
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
            Discover beautifully presented vitamins and health products with a
            cleaner, faster, and more responsive ecommerce experience designed
            for modern users.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="rounded-full bg-[var(--primary)] px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Shop Products
            </Link>

            <Link
              href="/about"
              className="rounded-full border border-[var(--border)] bg-white px-7 py-3.5 text-sm font-semibold text-[var(--foreground)] transition hover:bg-gray-50"
            >
              Learn More
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm">
              <ShieldCheck className="mb-3 h-5 w-5 text-[var(--primary)]" />
              <p className="text-sm font-semibold text-[var(--foreground)]">
                Trusted wellness positioning
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm">
              <HeartPulse className="mb-3 h-5 w-5 text-[var(--primary)]" />
              <p className="text-sm font-semibold text-[var(--foreground)]">
                Health-focused shopping flow
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm">
              <Sparkles className="mb-3 h-5 w-5 text-[var(--primary)]" />
              <p className="text-sm font-semibold text-[var(--foreground)]">
                Clean premium interface
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[2rem] border border-white/70 bg-white p-5 shadow-[0_30px_80px_rgba(16,24,40,0.08)]">
            <div className="rounded-[1.75rem] bg-gradient-to-br from-blue-50 via-white to-slate-100 p-6 sm:p-8">
              <div className="grid gap-4">
                <div className="rounded-3xl bg-white p-5 shadow-sm">
                  <p className="text-sm font-medium text-[var(--muted-foreground)]">
                    Featured Shopping Experience
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-[var(--foreground)]">
                    Better discovery, cleaner product presentation, stronger
                    trust
                  </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-[var(--muted-foreground)]">
                      Fast navigation
                    </p>
                    <h4 className="mt-2 text-lg font-bold text-[var(--foreground)]">
                      Smooth category browsing
                    </h4>
                  </div>

                  <div className="rounded-3xl bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-[var(--muted-foreground)]">
                      Conversion ready
                    </p>
                    <h4 className="mt-2 text-lg font-bold text-[var(--foreground)]">
                      Shop, cart, and checkout flow
                    </h4>
                  </div>
                </div>

                <div className="rounded-3xl bg-[var(--primary)] p-6 text-white">
                  <p className="text-sm font-medium text-white/80">
                    Design direction
                  </p>
                  <h4 className="mt-2 text-2xl font-bold">
                    Premium, trustworthy, responsive, and scalable
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
