import PortalFeaturePage from "@/components/portal/portal-feature-page";
import { requireRole } from "@/lib/session";

export default async function Page() {
  await requireRole("DOCTOR");

  return (
    <PortalFeaturePage
      title="Contact Medical Reps"
      description="Connect with the medical representative team for follow-up, product support, and professional coordination."
      roleLabel="Doctors Portal"
      backHref="/portal/doctor"
    />
  );
}
