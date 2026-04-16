import PortalFeaturePage from "@/components/portal/portal-feature-page";
import { requireRole } from "@/lib/session";

export default async function Page() {
  await requireRole("DOCTOR");

  return (
    <PortalFeaturePage
      title="Clinical Studies Access"
      description="Access science-led clinical studies and professional evidence resources for doctor engagement."
      roleLabel="Doctors Portal"
      backHref="/portal/doctor"
    />
  );
}
