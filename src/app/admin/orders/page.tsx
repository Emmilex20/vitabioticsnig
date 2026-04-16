import AdminShell from "@/components/admin/admin-shell";
import AdminHeader from "@/components/admin/admin-header";
import OrdersTable from "@/components/admin/orders-table";
import { requireRole } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function AdminOrdersPage() {
  const user = await requireRole("ADMIN");

  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <AdminShell>
      <AdminHeader
        title="Orders"
        description="Review submitted ecommerce orders and monitor order flow."
        firstName={user.firstName}
      />
      <OrdersTable items={orders} />
    </AdminShell>
  );
}
