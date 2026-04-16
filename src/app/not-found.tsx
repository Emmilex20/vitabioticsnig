import Link from "next/link";
import SiteShell from "@/components/layout/site-shell";
import Container from "@/components/shared/container";

export default function NotFoundPage() {
  return (
    <SiteShell>
      <section className="py-20">
        <Container className="max-w-2xl text-center">
          <div className="rounded-[2rem] border border-[var(--border)] bg-white p-10 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--primary)]">
              404 Error
            </p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
              Page not found
            </h1>
            <p className="mt-4 text-[var(--muted-foreground)]">
              The page you&apos;re trying to open does not exist or has been
              moved.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Go Home
            </Link>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
