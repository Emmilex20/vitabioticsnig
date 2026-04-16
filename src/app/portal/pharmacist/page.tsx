import SiteShell from "@/components/layout/site-shell";
import Container from "@/components/shared/container";
import PortalCard from "@/components/portal/portal-card";
import PortalHeader from "@/components/portal/portal-header";
import PortalSectionHeading from "@/components/portal/portal-section-heading";
import PortalStatsGrid from "@/components/portal/portal-stats-grid";
import PortalWelcomeStrip from "@/components/portal/portal-welcome-strip";
import LogoutButton from "@/components/portal/logout-button";
import { requireRole } from "@/lib/session";
import { pharmacistPortalItems, pharmacistPortalStats } from "@/data/portal";

export default async function PharmacistPortalPage() {
  const user = await requireRole("PHARMACIST");

  return (
    <SiteShell>
      <section className="py-14 sm:py-16">
        <Container>
          <div className="mb-6 flex justify-end">
            <LogoutButton />
          </div>

          <PortalHeader
            title="Pharmacists Portal"
            description="Welcome to the dedicated pharmacists portal - your premium workspace for education tools, staff training, wellness activations, and direct professional support."
            professionalLabel={`Signed in as ${user.email}`}
          />

          <div className="mt-8">
            <PortalWelcomeStrip
              firstName={user.firstName}
              role="Pharmacist"
              message="Access customer education resources, request in-pharmacy support, and manage professional engagement tools from one clean workspace."
            />
          </div>

          <div className="mt-8">
            <PortalStatsGrid items={pharmacistPortalStats} />
          </div>

          <div className="mt-12">
            <PortalSectionHeading
              title="Professional Tools"
              description="Explore pharmacist-focused features designed for better customer education, staff development, and product support."
            />

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {pharmacistPortalItems.map((item) => (
                <PortalCard
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  href={item.href}
                  imageLabel={item.imageLabel}
                  imageSrc={item.imageSrc}
                  cta={item.cta}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
