import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthShell from "@/components/auth/auth-shell";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";
import { getAuthUser } from "@/lib/session";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Forgot Password",
  description: "Request a password reset link for your account.",
  path: "/forgot-password",
  noIndex: true,
});

export default async function ForgotPasswordPage() {
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
      title="Forgot your password?"
      description="Enter your email address and we'll send you a reset link to help you regain access to your account."
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
