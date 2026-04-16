import PortalFeaturePage from "@/components/portal/portal-feature-page";
import PortalRequestForm from "@/components/portal/portal-request-form";
import { requireRole } from "@/lib/session";

export default async function Page() {
  await requireRole("DOCTOR");

  return (
    <PortalFeaturePage
      title="Book CME / CPD Session"
      description="Request professional education sessions and learning support."
      roleLabel="Doctors Portal"
      backHref="/portal/doctor"
    >
      <PortalRequestForm
        type="DOCTOR_CME_CPD"
        titleLabel="CME / CPD Session Request"
        description="Submit a request for professional education sessions and clinical engagement support."
        organizationLabel="Hospital / Clinic Name"
      />
    </PortalFeaturePage>
  );
}
