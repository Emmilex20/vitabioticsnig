type PortalSectionHeadingProps = {
  title: string;
  description?: string;
};

export default function PortalSectionHeading({
  title,
  description,
}: PortalSectionHeadingProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 max-w-2xl text-[var(--muted-foreground)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
