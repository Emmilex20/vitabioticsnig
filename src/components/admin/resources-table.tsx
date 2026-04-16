import Link from "next/link";

type ResourceItem = {
  id: string;
  title: string;
  description: string;
  fileType: string;
  audience: string;
  fileUrl: string;
};

type ResourcesTableProps = {
  items: ResourceItem[];
};

export default function ResourcesTable({ items }: ResourcesTableProps) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white shadow-sm">
      <div className="border-b border-[var(--border)] px-6 py-5">
        <h2 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
          Portal Resources
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Title
              </th>
              <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Type
              </th>
              <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Audience
              </th>
              <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                File
              </th>
              <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-[var(--border)]">
                <td className="px-6 py-5 align-top">
                  <p className="font-bold text-[var(--foreground)]">{item.title}</p>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                    {item.description}
                  </p>
                </td>

                <td className="px-6 py-5 align-top">
                  <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.15em] text-blue-700">
                    {item.fileType}
                  </span>
                </td>

                <td className="px-6 py-5 align-top">
                  <span className="inline-flex rounded-full border border-[var(--border)] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.15em] text-[var(--foreground)]">
                    {item.audience}
                  </span>
                </td>

                <td className="px-6 py-5 align-top">
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-[var(--primary)]"
                  >
                    Open File
                  </a>
                </td>

                <td className="px-6 py-5 align-top">
                  <Link
                    href={`/admin/resources/${item.id}`}
                    className="text-sm font-semibold text-[var(--primary)]"
                  >
                    Edit resource
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
