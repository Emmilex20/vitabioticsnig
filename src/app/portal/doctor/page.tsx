import SiteShell from "@/components/layout/site-shell";
import Container from "@/components/shared/container";
import PortalCard from "@/components/portal/portal-card";
import PortalHeader from "@/components/portal/portal-header";
import PortalSectionHeading from "@/components/portal/portal-section-heading";
import PortalStatsGrid from "@/components/portal/portal-stats-grid";
import PortalWelcomeStrip from "@/components/portal/portal-welcome-strip";
import LogoutButton from "@/components/portal/logout-button";
import { requireRole } from "@/lib/session";
import { doctorPortalItems, doctorPortalStats } from "@/data/portal";

export default async function DoctorPortalPage() {
  const user = await requireRole("DOCTOR");

  return (
    <SiteShell>
      <section className="py-14 sm:py-16">
        <Container>
          <div className="mb-6 flex justify-end">
            <LogoutButton />
          </div>

          <PortalHeader
            title="Doctors Portal"
            description="Welcome to the dedicated doctors portal - a premium environment for clinical resources, patient education support, professional learning, and direct product engagement."
            professionalLabel={`Signed in as ${user.email}`}
          />

          <div className="mt-8">
            <PortalWelcomeStrip
              firstName={user.firstName}
              role="Doctor"
              message="Open clinical resources, request educational sessions, and access professional support tools through a cleaner executive dashboard."
            />
          </div>

          <div className="mt-8">
            <PortalStatsGrid items={doctorPortalStats} />
          </div>

          <div className="mt-12">
            <PortalSectionHeading
              title="Clinical & Professional Resources"
              description="Open doctor-focused tools for evidence-led learning, product updates, presentations, and direct support."
            />

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {doctorPortalItems.map((item) => (
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
