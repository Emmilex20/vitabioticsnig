import AdminShell from "@/components/admin/admin-shell";
import AdminHeader from "@/components/admin/admin-header";
import ResourcesTable from "@/components/admin/resources-table";
import CreateResourceForm from "@/components/admin/create-resource-form";
import { requireRole } from "@/lib/session";
import { getPrisma } from "@/lib/prisma";

export default async function AdminResourcesPage() {
  const user = await requireRole("ADMIN");
  const prisma = getPrisma();

  const resources = await prisma.portalResource.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <AdminShell>
      <AdminHeader
        title="Portal Resources"
        description="Publish and manage files available to doctors and pharmacists."
        firstName={user.firstName}
      />
      <CreateResourceForm />
      <ResourcesTable items={resources} />
    </AdminShell>
  );
}
