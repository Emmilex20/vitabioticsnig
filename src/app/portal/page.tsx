import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/session";

export default async function PortalPage() {
  const user = await requireAuth();

  redirect(
    user.role === "ADMIN"
      ? "/admin"
      : user.role === "DOCTOR"
        ? "/portal/doctor"
        : "/portal/pharmacist"
  );
}
