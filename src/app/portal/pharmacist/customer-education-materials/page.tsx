import PortalFeaturePage from "@/components/portal/portal-feature-page";
import PortalResourceCards from "@/components/portal/portal-resource-cards";
import { requireRole } from "@/lib/session";

export default async function Page() {
  await requireRole("PHARMACIST");

  return (
    <PortalFeaturePage
      title="Customer Education Materials"
      description="Access pharmacist-ready educational materials and counseling support resources."
      roleLabel="Pharmacists Portal"
      backHref="/portal/pharmacist"
    >
      <PortalResourceCards />
    </PortalFeaturePage>
  );
}
