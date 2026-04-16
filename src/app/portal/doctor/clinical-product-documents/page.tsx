import PortalFeaturePage from "@/components/portal/portal-feature-page";
import PortalResourceCards from "@/components/portal/portal-resource-cards";
import { requireRole } from "@/lib/session";

export default async function Page() {
  await requireRole("DOCTOR");

  return (
    <PortalFeaturePage
      title="Clinical Product Documents"
      description="Access doctor-focused product literature and evidence-based support documents."
      roleLabel="Doctors Portal"
      backHref="/portal/doctor"
    >
      <PortalResourceCards />
    </PortalFeaturePage>
  );
}
