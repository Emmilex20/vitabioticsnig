import AdminShell from "@/components/admin/admin-shell";
import AdminHeader from "@/components/admin/admin-header";
import RequestFilters from "@/components/admin/request-filters";
import { requireRole } from "@/lib/session";
import { prisma } from "@/lib/prisma";

type PortalRequestListItem = {
  id: string;
  title: string;
  type: string;
  organization: string;
  status: string;
  createdAt: Date;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
};

export default async function AdminRequestsPage() {
  const user = await requireRole("ADMIN");

  const requests: PortalRequestListItem[] = await prisma.portalRequest.findMany({
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

  const requestItems = requests.map((request: PortalRequestListItem) => ({
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
