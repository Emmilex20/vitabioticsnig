import PortalFeaturePage from "@/components/portal/portal-feature-page";
import PortalRequestForm from "@/components/portal/portal-request-form";
import { requireRole } from "@/lib/session";

export default async function Page() {
  await requireRole("PHARMACIST");

  return (
    <PortalFeaturePage
      title="Request In-Pharmacy Training"
      description="Request on-site or guided training support for your pharmacy team."
      roleLabel="Pharmacists Portal"
      backHref="/portal/pharmacist"
    >
      <PortalRequestForm
        type="PHARMACY_TRAINING"
        titleLabel="In-Pharmacy Training Request"
        description="Submit a training request for your pharmacy staff and customer education support."
        organizationLabel="Pharmacy Name"
      />
    </PortalFeaturePage>
  );
}
