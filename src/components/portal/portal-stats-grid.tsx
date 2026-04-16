type PortalStatsGridProps = {
  items: {
    label: string;
    value: string;
  }[];
};

export default function PortalStatsGrid({ items }: PortalStatsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-[1.75rem] border border-[var(--border)] bg-white p-5 shadow-sm"
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
            {item.label}
          </p>
          <p className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
