import AdminShell from "@/components/admin/admin-shell";
import AdminHeader from "@/components/admin/admin-header";
import UsersTable from "@/components/admin/users-table";
import { requireRole } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function AdminUsersPage() {
  const user = await requireRole("ADMIN");

  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return (
    <AdminShell>
      <AdminHeader
        title="Portal Users"
        description="Review registered admin, doctor, and pharmacist accounts across the portal."
        firstName={user.firstName}
      />
      <UsersTable items={users} />
    </AdminShell>
  );
}
