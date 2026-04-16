import AdminShell from "@/components/admin/admin-shell";
import AdminHeader from "@/components/admin/admin-header";
import RequestFilters from "@/components/admin/request-filters";
import { requireRole } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function AdminRequestsPage() {
  const user = await requireRole("ADMIN");

  const requests = await prisma.portalRequest.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  });

  const requestItems = requests.map((request) => ({
    ...request,
    createdAt: request.createdAt.toISOString(),
  }));

  return (
    <AdminShell>
      <AdminHeader
        title="Portal Requests"
        description="Review submitted requests from doctors and pharmacists, then filter and search them quickly."
        firstName={user.firstName}
      />
      <RequestFilters items={requestItems} />
    </AdminShell>
  );
}
