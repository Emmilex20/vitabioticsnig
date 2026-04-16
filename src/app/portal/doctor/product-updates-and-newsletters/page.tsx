import PortalFeaturePage from "@/components/portal/portal-feature-page";
import { requireRole } from "@/lib/session";

export default async function Page() {
  await requireRole("DOCTOR");

  return (
    <PortalFeaturePage
      title="Product Updates and Newsletters"
      description="Follow product news, launch communications, and professional newsletters for the doctor community."
      roleLabel="Doctors Portal"
      backHref="/portal/doctor"
    />
  );
}
