import PortalFeaturePage from "@/components/portal/portal-feature-page";
import { requireRole } from "@/lib/session";

export default async function Page() {
  await requireRole("PHARMACIST");

  return (
    <PortalFeaturePage
      title="Free Bone Density Checks"
      description="Organize wellness outreach and customer engagement activities."
      roleLabel="Pharmacists Portal"
      backHref="/portal/pharmacist"
    />
  );
}
