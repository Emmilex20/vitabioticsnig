import OrderStatusTimeline from "./order-status-timeline";
import ReorderButton from "./reorder-button";

type OrderTrackingResultProps = {
  order: {
    id: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    country: string;
    state: string;
    city: string;
    addressLine1: string;
    addressLine2?: string | null;
    notes?: string | null;
    status: string;
    paymentReference?: string | null;
    subtotal: number;
    total: number;
    createdAt: string;
    items: {
      id: string;
      productId: string;
      productName: string;
      quantity: number;
      totalPrice: number;
    }[];
  };
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function OrderTrackingResult({
  order,
}: OrderTrackingResultProps) {
  return (
    <div className="space-y-8">
      <OrderStatusTimeline status={order.status} />

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[var(--border)] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.15em] text-[var(--foreground)]">
              {order.status}
            </span>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.15em] text-blue-700">
              {order.id}
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            Order Details
          </h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Customer
              </p>
              <p className="mt-2 text-base font-semibold text-[var(--foreground)]">
                {order.customerName}
              </p>
            </div>

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
                Order Date
              </p>
              <p className="mt-2 text-base font-semibold text-[var(--foreground)]">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
              Delivery Address
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
              Items
            </h3>

            <div className="mt-5 space-y-4">
              {order.items.map((item) => (
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
          </div>
        </div>

        <aside className="h-fit rounded-[2rem] border border-[var(--border)] bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-extrabold text-[var(--foreground)]">
            Summary
          </h3>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--muted-foreground)]">Subtotal</span>
              <span className="font-bold text-[var(--foreground)]">
                {formatPrice(order.subtotal)}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--muted-foreground)]">Total</span>
              <span className="font-bold text-[var(--foreground)]">
                {formatPrice(order.total)}
              </span>
            </div>

            {order.paymentReference ? (
              <div className="border-t border-[var(--border)] pt-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                  Payment Reference
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--foreground)] break-all">
                  {order.paymentReference}
                </p>
              </div>
            ) : null}

            <div className="mt-6">
              <ReorderButton
                items={order.items.map((item) => ({
                  id: item.productId,
                  productName: item.productName,
                  quantity: item.quantity,
                }))}
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
