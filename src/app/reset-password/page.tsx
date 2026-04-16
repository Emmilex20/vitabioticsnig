import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthShell from "@/components/auth/auth-shell";
import ResetPasswordForm from "@/components/auth/reset-password-form";
import { getAuthUser } from "@/lib/session";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Reset Password",
  description: "Create a new password to regain access to your account.",
  path: "/reset-password",
  noIndex: true,
});

export default async function ResetPasswordPage() {
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
      title="Reset your password"
      description="Enter a new password to restore access to your professional portal account."
    >
      <ResetPasswordForm />
    </AuthShell>
  );
}
