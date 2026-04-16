import Link from "next/link";
import AdminShell from "@/components/admin/admin-shell";
import AdminHeader from "@/components/admin/admin-header";
import RequestStatusEditor from "@/components/admin/request-status-editor";
import { requireRole } from "@/lib/session";
import { getPrisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminRequestDetailPage({ params }: PageProps) {
  const user = await requireRole("ADMIN");
  const { id } = await params;
  const prisma = getPrisma();

  const request = await prisma.portalRequest.findUnique({
    where: { id },
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

  if (!request) {
    notFound();
  }

  return (
    <AdminShell>
      <AdminHeader
        title="Request Details"
        description="Review the full request information and update workflow progress."
        firstName={user.firstName}
      />

      <Link
        href="/admin/requests"
        className="inline-flex text-sm font-semibold text-[var(--primary)]"
      >
        ← Back to requests
      </Link>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.15em] text-blue-700">
              {request.type}
            </span>
            <span className="rounded-full border border-[var(--border)] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.15em] text-[var(--foreground)]">
              {request.status}
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            {request.title}
          </h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Submitted By
              </p>
              <p className="mt-2 text-base font-semibold text-[var(--foreground)]">
                {request.user.firstName} {request.user.lastName}
              </p>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                {request.user.email}
              </p>
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Organization
              </p>
              <p className="mt-2 text-base font-semibold text-[var(--foreground)]">
                {request.organization}
              </p>
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Phone
              </p>
              <p className="mt-2 text-base font-semibold text-[var(--foreground)]">
                {request.phone || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Location
              </p>
              <p className="mt-2 text-base font-semibold text-[var(--foreground)]">
                {request.location || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Created
              </p>
              <p className="mt-2 text-base font-semibold text-[var(--foreground)]">
                {new Date(request.createdAt).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Last Updated
              </p>
              <p className="mt-2 text-base font-semibold text-[var(--foreground)]">
                {new Date(request.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
              Request Message
            </p>

            <div className="mt-3 rounded-[1.5rem] bg-slate-50 p-5 text-sm leading-8 text-[var(--foreground)]">
              {request.message}
            </div>
          </div>
        </div>

        <div>
          <RequestStatusEditor
            requestId={request.id}
            currentStatus={request.status}
          />
        </div>
      </div>
    </AdminShell>
  );
}
