import Link from "next/link";

type RecentRequestItem = {
  id: string;
  title: string;
  type: string;
  status: string;
  organization: string;
  createdAt: string | Date;
  user: {
    firstName: string;
    lastName: string;
  };
};

type RecentRequestsPreviewProps = {
  items: RecentRequestItem[];
};

export default function RecentRequestsPreview({
  items,
}: RecentRequestsPreviewProps) {
  return (
    <div className="rounded-[2rem] border border-[var(--border)] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
            Recent Requests
          </h2>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Latest doctor and pharmacist submissions.
          </p>
        </div>

        <Link
          href="/admin/requests"
          className="text-sm font-semibold text-[var(--primary)]"
        >
          View all
        </Link>
      </div>

      <div className="mt-6 space-y-4">
        {items.length === 0 ? (
          <div className="rounded-[1.5rem] bg-slate-50 p-5 text-sm text-[var(--muted-foreground)]">
            No requests yet.
          </div>
        ) : (
          items.map((item) => (
            <Link
              key={item.id}
              href={`/admin/requests/${item.id}`}
              className="block rounded-[1.5rem] border border-[var(--border)] bg-slate-50 p-5 transition hover:bg-white"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-bold text-[var(--foreground)]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                    {item.user.firstName} {item.user.lastName} •{" "}
                    {item.organization}
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                    {item.type}
                  </p>
                </div>

                <div className="flex flex-col items-start gap-2 sm:items-end">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.15em] text-blue-700">
                    {item.status}
                  </span>
                  <span className="text-xs text-[var(--muted-foreground)]">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
