import Link from "next/link";
import SiteShell from "@/components/layout/site-shell";
import Container from "@/components/shared/container";

type PortalFeaturePageProps = {
  title: string;
  description: string;
  roleLabel: string;
  backHref: string;
  children?: React.ReactNode;
};

export default function PortalFeaturePage({
  title,
  description,
  roleLabel,
  backHref,
  children,
}: PortalFeaturePageProps) {
  return (
    <SiteShell>
      <section className="py-14 sm:py-16">
        <Container className="max-w-5xl">
          <Link
            href={backHref}
            className="mb-6 inline-flex text-sm font-semibold text-[var(--primary)]"
          >
            ← Go back
          </Link>

          <div className="rounded-[2rem] bg-[var(--primary)] px-8 py-10 text-white shadow-[0_24px_70px_rgba(30,79,174,0.25)]">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-white">
              {roleLabel}
            </span>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
              {title}
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
              {description}
            </p>
          </div>

          <div className="mt-8">{children}</div>
        </Container>
      </section>
    </SiteShell>
  );
}
