type AdminInsightsGridProps = {
  items: {
    title: string;
    value: number;
    total: number;
  }[];
};

export default function AdminInsightsGrid({ items }: AdminInsightsGridProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {items.map((item) => {
        const percentage =
          item.total > 0 ? Math.min((item.value / item.total) * 100, 100) : 0;

        return (
          <div
            key={item.title}
            className="rounded-[2rem] border border-[var(--border)] bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[var(--muted-foreground)]">
                  {item.title}
                </p>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
                  {item.value}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                  Share
                </p>
                <p className="mt-2 text-lg font-bold text-[var(--foreground)]">
                  {percentage.toFixed(0)}%
                </p>
              </div>
            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-[var(--primary)]"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
