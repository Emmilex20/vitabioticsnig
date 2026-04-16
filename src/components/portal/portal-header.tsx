type PortalHeaderProps = {
  title: string;
  description: string;
  professionalLabel: string;
};

export default function PortalHeader({
  title,
  description,
  professionalLabel,
}: PortalHeaderProps) {
  return (
    <div className="overflow-hidden rounded-[2rem] bg-[var(--primary)] px-8 py-10 text-white shadow-[0_24px_70px_rgba(30,79,174,0.25)] sm:px-10 sm:py-12">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-end">
        <div>
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-white">
            Professional access
          </span>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {title}
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
            {description}
          </p>

          <div className="mt-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
            {professionalLabel}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/70">
            Portal access
          </p>
          <p className="mt-3 text-2xl font-extrabold tracking-tight text-white">
            Active
          </p>
          <p className="mt-2 text-sm leading-7 text-white/80">
            Your professional dashboard is ready for resources, requests, and
            support tools.
          </p>
        </div>
      </div>
    </div>
  );
}
