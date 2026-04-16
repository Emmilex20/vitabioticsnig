import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/layout/site-shell";
import Container from "@/components/shared/container";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Sign Up",
  description:
    "Choose the right registration path for your customer or professional account.",
  path: "/sign-up",
  noIndex: true,
});

export default function SignUpPage() {
  return (
    <SiteShell>
      <section className="py-14 sm:py-16">
        <Container>
          <div className="mb-8">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-blue-700">
              Register
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
              Choose your registration path
            </h1>
            <p className="mt-3 text-base text-[var(--muted-foreground)]">
              Customers and healthcare professionals have different account
              experiences.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-sm">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Customer
              </p>
              <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
                Shopper registration
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                Save your delivery details and review your order history.
              </p>
              <Link
                href="/shop-auth/register"
                className="mt-6 inline-flex rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Register as Customer
              </Link>
            </div>

            <div className="rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-sm">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Professional
              </p>
              <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
                Doctor / Pharmacist registration
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                Apply for access to professional training, samples, and resources.
              </p>
              <Link
                href="/register"
                className="mt-6 inline-flex rounded-full border border-[var(--border)] bg-white px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-gray-50"
              >
                Register as Professional
              </Link>
            </div>
          </div>

          <p className="mt-8 text-sm text-[var(--muted-foreground)]">
            Already have an account?{" "}
            <Link href="/sign-in" className="font-semibold text-[var(--primary)]">
              Sign in here
            </Link>
          </p>
        </Container>
      </section>
    </SiteShell>
  );
}
