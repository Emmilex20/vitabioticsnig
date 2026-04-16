import PortalFeaturePage from "@/components/portal/portal-feature-page";
import { requireRole } from "@/lib/session";

export default async function Page() {
  await requireRole("DOCTOR");

  return (
    <PortalFeaturePage
      title="Request Clinical Presentations"
      description="Request clinical presentations, scientific sessions, and expert-led product discussions."
      roleLabel="Doctors Portal"
      backHref="/portal/doctor"
    />
  );
}
