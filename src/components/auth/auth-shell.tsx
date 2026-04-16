import SiteShell from "@/components/layout/site-shell";
import Container from "@/components/shared/container";

type AuthShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function AuthShell({
  title,
  description,
  children,
}: AuthShellProps) {
  return (
    <SiteShell>
      <section className="relative overflow-hidden py-14 sm:py-16 lg:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(30,79,174,0.10),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(30,79,174,0.08),_transparent_30%)]" />

        <Container className="relative">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_520px] lg:items-center">
            <div className="hidden lg:block">
              <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-blue-700">
                Premium account experience
              </span>

              <h1 className="mt-5 max-w-xl text-5xl font-extrabold tracking-tight text-[var(--foreground)]">
                Secure, modern, and easy account access
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--muted-foreground)]">
                A cleaner authentication experience with stronger usability,
                better mobile responsiveness, and smoother customer trust
                signals.
              </p>

              <div className="mt-8 grid max-w-xl gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-[var(--border)] bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-bold text-[var(--foreground)]">
                    Better usability
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted-foreground)]">
                    Password visibility toggle and improved form structure.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-[var(--border)] bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-bold text-[var(--foreground)]">
                    Recovery ready
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted-foreground)]">
                    Forgot password support for a more trustworthy login flow.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[var(--border)] bg-white p-6 shadow-[0_20px_60px_rgba(16,24,40,0.06)] sm:p-8 lg:p-10">
              <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-blue-700">
                Account access
              </span>

              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl">
                {title}
              </h2>

              <p className="mt-3 text-base leading-7 text-[var(--muted-foreground)]">
                {description}
              </p>

              <div className="mt-8">{children}</div>
            </div>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
