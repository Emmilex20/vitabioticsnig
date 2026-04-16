import PortalFeaturePage from "@/components/portal/portal-feature-page";
import { requireRole } from "@/lib/session";

export default async function Page() {
  await requireRole("DOCTOR");

  return (
    <PortalFeaturePage
      title="Patient Education Resources"
      description="Explore resources designed to support patient counseling and education."
      roleLabel="Doctors Portal"
      backHref="/portal/doctor"
    />
  );
}
