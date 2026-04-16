import AccountShell from "@/components/account/account-shell";
import AccountHeader from "@/components/account/account-header";
import AddressesManager from "@/components/account/addresses-manager";
import { requireCustomer } from "@/lib/session";

export default async function AccountAddressesPage() {
  const user = await requireCustomer();

  return (
    <AccountShell>
      <AccountHeader
        title="Addresses"
        description="Save delivery addresses and reuse them for faster checkout."
        firstName={user.firstName}
      />

      <AddressesManager />
    </AccountShell>
  );
}
