const steps = ["PENDING", "PAID", "PROCESSING", "SHIPPED", "DELIVERED"];

function getStepIndex(status: string) {
  const index = steps.indexOf(status);
  return index === -1 ? 0 : index;
}

function getStepLabel(step: string) {
  switch (step) {
    case "PENDING":
      return "Pending";
    case "PAID":
      return "Paid";
    case "PROCESSING":
      return "Processing";
    case "SHIPPED":
      return "Shipped";
    case "DELIVERED":
      return "Delivered";
    default:
      return step;
  }
}

export default function OrderStatusTimeline({ status }: { status: string }) {
  if (status === "CANCELLED") {
    return (
      <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-6">
        <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-rose-700">
          Order Status
        </p>
        <h3 className="mt-3 text-2xl font-extrabold text-rose-700">
          Cancelled
        </h3>
        <p className="mt-2 text-sm leading-7 text-rose-700/90">
          This order has been cancelled.
        </p>
      </div>
    );
  }

  const currentIndex = getStepIndex(status);

  return (
    <div className="rounded-[2rem] border border-[var(--border)] bg-white p-6 shadow-sm">
      <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
        Order Progress
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-5">
        {steps.map((step, index) => {
          const completed = index <= currentIndex;

          return (
            <div key={step} className="flex flex-col items-center text-center">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-extrabold ${
                  completed
                    ? "bg-[var(--primary)] text-white"
                    : "bg-slate-100 text-[var(--muted-foreground)]"
                }`}
              >
                {index + 1}
              </div>

              <p
                className={`mt-3 text-sm font-semibold ${
                  completed
                    ? "text-[var(--foreground)]"
                    : "text-[var(--muted-foreground)]"
                }`}
              >
                {getStepLabel(step)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
