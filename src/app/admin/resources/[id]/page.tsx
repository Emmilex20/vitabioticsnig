import Link from "next/link";
import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/admin-shell";
import AdminHeader from "@/components/admin/admin-header";
import EditResourceForm from "@/components/admin/edit-resource-form";
import { requireRole } from "@/lib/session";
import { prisma } from "@/lib/prisma";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminResourceDetailPage({ params }: PageProps) {
  const user = await requireRole("ADMIN");
  const { id } = await params;

  const resource = await prisma.portalResource.findUnique({
    where: { id },
  });

  if (!resource) {
    notFound();
  }

  return (
    <AdminShell>
      <AdminHeader
        title="Edit Resource"
        description="Update published files, change audience targeting, or remove outdated materials."
        firstName={user.firstName}
      />

      <Link
        href="/admin/resources"
        className="inline-flex text-sm font-semibold text-[var(--primary)]"
      >
        &larr; Back to resources
      </Link>

      <EditResourceForm resource={resource} />
    </AdminShell>
  );
}
