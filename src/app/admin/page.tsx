import AdminShell from "@/components/admin/admin-shell";
import AdminHeader from "@/components/admin/admin-header";
import AdminMetricsGrid from "@/components/admin/admin-metrics-grid";
import AdminInsightsGrid from "@/components/admin/admin-insights-grid";
import RecentRequestsPreview from "@/components/admin/recent-requests-preview";
import { requireRole } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const user = await requireRole("ADMIN");

  const [
    totalRequests,
    pendingRequests,
    totalResources,
    totalDoctors,
    totalPharmacists,
    totalProducts,
    recentRequests,
  ] = await Promise.all([
    prisma.portalRequest.count(),
    prisma.portalRequest.count({
      where: { status: "PENDING" },
    }),
    prisma.portalResource.count(),
    prisma.user.count({
      where: { role: "DOCTOR" },
    }),
    prisma.user.count({
      where: { role: "PHARMACIST" },
    }),
    prisma.product.count(),
    prisma.portalRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    }),
  ]);

  const totalUsers = totalDoctors + totalPharmacists;

  const metrics = [
    {
      label: "Total Requests",
      value: totalRequests,
      helper: "All portal submissions",
    },
    {
      label: "Pending Requests",
      value: pendingRequests,
      helper: "Needs admin review",
    },
    {
      label: "Resources",
      value: totalResources,
      helper: "Published documents",
    },
    {
      label: "Products",
      value: totalProducts,
      helper: "Catalog items",
    },
  ];

  const insights = [
    {
      title: "Doctor Accounts",
      value: totalDoctors,
      total: totalUsers || 1,
    },
    {
      title: "Pharmacist Accounts",
      value: totalPharmacists,
      total: totalUsers || 1,
    },
  ];

  return (
    <AdminShell>
      <AdminHeader
        title="Admin Dashboard"
        description="Manage doctor and pharmacist portal operations, publish resources, and begin controlling the real product catalog."
        firstName={user.firstName}
      />

      <AdminMetricsGrid items={metrics} />
      <AdminInsightsGrid items={insights} />
      <RecentRequestsPreview items={recentRequests} />
    </AdminShell>
  );
}
