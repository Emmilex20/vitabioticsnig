type PortalWelcomeStripProps = {
  firstName: string;
  role: "Doctor" | "Pharmacist";
  message: string;
};

export default function PortalWelcomeStrip({
  firstName,
  role,
  message,
}: PortalWelcomeStripProps) {
  return (
    <div className="rounded-[2rem] border border-[var(--border)] bg-white p-6 shadow-sm sm:p-7">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-blue-700">
            Welcome back
          </span>

          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-3xl">
            Hello, {firstName}
          </h2>

          <p className="mt-2 max-w-2xl text-base leading-7 text-[var(--muted-foreground)]">
            {message}
          </p>
        </div>

        <div className="w-fit rounded-[1.5rem] bg-slate-50 px-5 py-4">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
            Professional Role
          </p>
          <p className="mt-2 text-lg font-bold text-[var(--foreground)]">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
}
