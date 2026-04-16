import { redirect } from "next/navigation";
import AuthShell from "@/components/auth/auth-shell";
import CustomerLoginForm from "@/components/shop-auth/customer-login-form";
import { getAuthUser } from "@/lib/session";

export default async function CustomerLoginPage() {
  const user = await getAuthUser();

  if (user?.role === "CUSTOMER") {
    redirect("/account");
  }

  return (
    <AuthShell
      title="Customer sign in"
      description="Access your account, saved details, and order history."
    >
      <CustomerLoginForm />
    </AuthShell>
  );
}
