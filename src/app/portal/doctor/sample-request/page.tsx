import PortalFeaturePage from "@/components/portal/portal-feature-page";
import PortalRequestForm from "@/components/portal/portal-request-form";
import { requireRole } from "@/lib/session";

export default async function Page() {
  await requireRole("DOCTOR");

  return (
    <PortalFeaturePage
      title="Sample Request"
      description="Request samples and clinical support packs for professional use."
      roleLabel="Doctors Portal"
      backHref="/portal/doctor"
    >
      <PortalRequestForm
        type="DOCTOR_SAMPLE_REQUEST"
        titleLabel="Doctor Sample Request"
        description="Submit a request for starter packs, samples, or professional support materials."
        organizationLabel="Hospital / Clinic Name"
      />
    </PortalFeaturePage>
  );
}
