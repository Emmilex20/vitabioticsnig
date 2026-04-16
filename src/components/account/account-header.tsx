type AccountHeaderProps = {
  title: string;
  description: string;
  firstName: string;
};

export default function AccountHeader({
  title,
  description,
  firstName,
}: AccountHeaderProps) {
  return (
    <div className="rounded-[2rem] bg-[var(--primary)] px-8 py-10 text-white shadow-[0_24px_70px_rgba(30,79,174,0.25)]">
      <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-white">
        Customer account
      </span>

      <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
        {title}
      </h1>

      <p className="mt-4 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
        {description}
      </p>

      <div className="mt-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
        Welcome, {firstName}
      </div>
    </div>
  );
}
