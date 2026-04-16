import Link from "next/link";
import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/admin-shell";
import AdminHeader from "@/components/admin/admin-header";
import OrderStatusEditor from "@/components/admin/order-status-editor";
import { requireRole } from "@/lib/session";
import { prisma } from "@/lib/prisma";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);
}

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

type AdminOrderItem = {
  id: string;
  productName: string;
  sku: string;
  quantity: number;
  totalPrice: number;
};

export default async function AdminOrderDetailPage({ params }: PageProps) {
  const user = await requireRole("ADMIN");
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: true,
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <AdminShell>
      <AdminHeader
        title="Order Details"
        description="Review order information, payment reference, items, and fulfillment status."
        firstName={user.firstName}
      />

      <Link
        href="/admin/orders"
        className="inline-flex text-sm font-semibold text-[var(--primary)]"
      >
        &larr; Back to orders
      </Link>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[var(--border)] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.15em] text-[var(--foreground)]">
              {order.status}
            </span>
            {order.paymentReference ? (
              <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.15em] text-blue-700">
                {order.paymentReference}
              </span>
            ) : null}
          </div>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            {order.customerName}
          </h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Email
              </p>
              <p className="mt-2 text-base font-semibold text-[var(--foreground)]">
                {order.customerEmail}
              </p>
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Phone
              </p>
              <p className="mt-2 text-base font-semibold text-[var(--foreground)]">
                {order.customerPhone}
              </p>
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Country
              </p>
              <p className="mt-2 text-base font-semibold text-[var(--foreground)]">
                {order.country}
              </p>
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                State
              </p>
              <p className="mt-2 text-base font-semibold text-[var(--foreground)]">
                {order.state}
              </p>
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                City
              </p>
              <p className="mt-2 text-base font-semibold text-[var(--foreground)]">
                {order.city}
              </p>
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Created
              </p>
              <p className="mt-2 text-base font-semibold text-[var(--foreground)]">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
              Address
            </p>
            <div className="mt-3 rounded-[1.5rem] bg-slate-50 p-5 text-sm leading-8 text-[var(--foreground)]">
              <p>{order.addressLine1}</p>
              {order.addressLine2 ? <p>{order.addressLine2}</p> : null}
              <p>
                {order.city}, {order.state}, {order.country}
              </p>
            </div>
          </div>

          {order.notes ? (
            <div className="mt-8">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Notes
              </p>
              <div className="mt-3 rounded-[1.5rem] bg-slate-50 p-5 text-sm leading-8 text-[var(--foreground)]">
                {order.notes}
              </div>
            </div>
          ) : null}

          <div className="mt-8">
            <h3 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
              Ordered Items
            </h3>

            <div className="mt-5 space-y-4">
              {order.items.map((item: AdminOrderItem) => (
                <div
                  key={item.id}
                  className="rounded-[1.5rem] border border-[var(--border)] bg-slate-50 p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-bold text-[var(--foreground)]">
                        {item.productName}
                      </p>
                      <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                        SKU: {item.sku}
                      </p>
                      <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      {formatPrice(item.totalPrice)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-[var(--border)] pt-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-[var(--foreground)]">
                  Order Total
                </span>
                <span className="text-2xl font-extrabold text-[var(--foreground)]">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <OrderStatusEditor orderId={order.id} currentStatus={order.status} />
        </div>
      </div>
    </AdminShell>
  );
}
