import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { reasons } from "@/data/home";

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Why choose us"
          title="A stronger wellness ecommerce experience from every angle"
          description="This section builds confidence through premium messaging, structured presentation, and polished visual hierarchy."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <div
                key={reason.title}
                className="rounded-[2rem] border border-[var(--border)] bg-white p-6 shadow-sm"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[var(--primary)]">
                  <Icon size={24} />
                </div>

                <h3 className="mt-5 text-xl font-bold tracking-tight text-[var(--foreground)]">
                  {reason.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)] sm:text-base">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
