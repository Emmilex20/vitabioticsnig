import Link from "next/link";

type AccountOrder = {
  id: string;
  status: string;
  total: number;
  createdAt: string | Date;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function AccountOrdersTable({ items }: { items: AccountOrder[] }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white shadow-sm">
      <div className="border-b border-[var(--border)] px-6 py-5">
        <h2 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
          My Orders
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Order ID
              </th>
              <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Total
              </th>
              <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Date
              </th>
              <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {items.map((order) => (
              <tr key={order.id} className="border-t border-[var(--border)]">
                <td className="px-6 py-5 font-bold text-[var(--foreground)]">
                  {order.id}
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex rounded-full border border-[var(--border)] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.15em] text-[var(--foreground)]">
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm font-semibold text-[var(--foreground)]">
                  {formatPrice(order.total)}
                </td>
                <td className="px-6 py-5 text-sm text-[var(--muted-foreground)]">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-5">
                  <Link
                    href={`/account/orders/${order.id}`}
                    className="text-sm font-semibold text-[var(--primary)]"
                  >
                    View details
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
