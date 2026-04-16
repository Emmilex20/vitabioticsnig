import PortalFeaturePage from "@/components/portal/portal-feature-page";
import PortalRequestForm from "@/components/portal/portal-request-form";
import { requireRole } from "@/lib/session";

export default async function Page() {
  await requireRole("PHARMACIST");

  return (
    <PortalFeaturePage
      title="Sample Days Request"
      description="Request support for product activation days and customer sampling events."
      roleLabel="Pharmacists Portal"
      backHref="/portal/pharmacist"
    >
      <PortalRequestForm
        type="SAMPLE_DAY"
        titleLabel="Sample Day Request"
        description="Submit a request for in-pharmacy sampling activities and product activation support."
        organizationLabel="Pharmacy Name"
      />
    </PortalFeaturePage>
  );
}
