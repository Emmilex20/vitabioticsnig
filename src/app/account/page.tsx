import AccountShell from "@/components/account/account-shell";
import AccountHeader from "@/components/account/account-header";
import { prisma } from "@/lib/prisma";
import { requireCustomer } from "@/lib/session";

export default async function AccountPage() {
  const user = await requireCustomer();

  const [ordersCount, addressesCount] = await Promise.all([
    prisma.order.count({
      where: {
        customerId: user.id,
      },
    }),
    prisma.address.count({
      where: {
        userId: user.id,
      },
    }),
  ]);

  return (
    <AccountShell>
      <AccountHeader
        title="My Account"
        description="Review your shopping activity, saved profile details, and delivery information."
        firstName={user.firstName}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-[1.75rem] border border-[var(--border)] bg-white p-6 shadow-sm">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
            Orders
          </p>
          <p className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            {ordersCount}
          </p>
        </div>

        <div className="rounded-[1.75rem] border border-[var(--border)] bg-white p-6 shadow-sm">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
            Saved Addresses
          </p>
          <p className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            {addressesCount}
          </p>
        </div>
      </div>
    </AccountShell>
  );
}
