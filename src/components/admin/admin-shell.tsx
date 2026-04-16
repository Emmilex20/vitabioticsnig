import SiteShell from "@/components/layout/site-shell";
import Container from "@/components/shared/container";
import AdminSidebar from "./admin-sidebar";

type AdminShellProps = {
  children: React.ReactNode;
};

export default function AdminShell({ children }: AdminShellProps) {
  return (
    <SiteShell>
      <section className="py-14 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <AdminSidebar />
            </div>

            <div className="space-y-8">{children}</div>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
