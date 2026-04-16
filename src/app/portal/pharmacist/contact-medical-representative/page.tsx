import PortalFeaturePage from "@/components/portal/portal-feature-page";
import { requireRole } from "@/lib/session";

export default async function Page() {
  await requireRole("PHARMACIST");

  return (
    <PortalFeaturePage
      title="Contact Medical Representative"
      description="Connect with the medical team for product support and professional follow-up."
      roleLabel="Pharmacists Portal"
      backHref="/portal/pharmacist"
    />
  );
}
