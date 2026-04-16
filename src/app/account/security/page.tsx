import AccountShell from "@/components/account/account-shell";
import AccountHeader from "@/components/account/account-header";
import PasswordForm from "@/components/account/password-form";
import { requireCustomer } from "@/lib/session";

export default async function AccountSecurityPage() {
  const user = await requireCustomer();

  return (
    <AccountShell>
      <AccountHeader
        title="Security"
        description="Manage your account password and security settings."
        firstName={user.firstName}
      />

      <PasswordForm />
    </AccountShell>
  );
}
