import AccountShell from "@/components/account/account-shell";
import AccountHeader from "@/components/account/account-header";
import AccountOrdersTable from "@/components/account/account-orders-table";
import { prisma } from "@/lib/prisma";
import { requireCustomer } from "@/lib/session";

export default async function AccountOrdersPage() {
  const user = await requireCustomer();

  const orders = await prisma.order.findMany({
    where: {
      customerId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      status: true,
      total: true,
      createdAt: true,
    },
  });

  return (
    <AccountShell>
      <AccountHeader
        title="My Orders"
        description="Review your recent orders and track their delivery progress."
        firstName={user.firstName}
      />
      <AccountOrdersTable items={orders} />
    </AccountShell>
  );
}
