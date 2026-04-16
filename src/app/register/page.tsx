import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthShell from "@/components/auth/auth-shell";
import RegisterForm from "@/components/auth/register-form";
import { getAuthUser } from "@/lib/session";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Professional Portal Registration",
  description:
    "Apply for doctor or pharmacist access to the professional portal.",
  path: "/register",
  noIndex: true,
});

export default async function RegisterPage() {
  const user = await getAuthUser();

  if (user) {
    redirect(
      user.role === "ADMIN"
        ? "/admin"
        : user.role === "DOCTOR"
          ? "/portal/doctor"
          : "/portal/pharmacist"
    );
  }

  return (
    <AuthShell
      title="Professional portal registration"
      description="Apply for doctor or pharmacist access to the professional portal."
    >
      <RegisterForm />
    </AuthShell>
  );
}
