import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthShell from "@/components/auth/auth-shell";
import LoginForm from "@/components/auth/login-form";
import { getAuthUser } from "@/lib/session";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Professional Portal Sign In",
  description:
    "Sign in to access doctor and pharmacist resources, requests, and portal tools.",
  path: "/login",
  noIndex: true,
});

export default async function LoginPage() {
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
      title="Professional portal sign in"
      description="Access doctor and pharmacist resources, requests, and professional portal tools."
    >
      <LoginForm />
    </AuthShell>
  );
}
