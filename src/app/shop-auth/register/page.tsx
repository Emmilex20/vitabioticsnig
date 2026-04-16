import { redirect } from "next/navigation";
import AuthShell from "@/components/auth/auth-shell";
import CustomerRegisterForm from "@/components/shop-auth/customer-register-form";
import { getAuthUser } from "@/lib/session";

export default async function CustomerRegisterPage() {
  const user = await getAuthUser();

  if (user?.role === "CUSTOMER") {
    redirect("/account");
  }

  return (
    <AuthShell
      title="Create your shopper account"
      description="Save your details and view your order history in one place."
    >
      <CustomerRegisterForm />
    </AuthShell>
  );
}
