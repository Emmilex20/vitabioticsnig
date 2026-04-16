import Container from "@/components/shared/container";
import { trustPoints } from "@/data/home";

export default function TrustStrip() {
  return (
    <section className="py-6">
      <Container>
        <div className="grid gap-4 rounded-[2rem] border border-[var(--border)] bg-white p-5 shadow-sm sm:grid-cols-3 sm:p-6">
          {trustPoints.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex items-center gap-3 rounded-2xl p-2"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[var(--primary)]">
                  <Icon size={20} />
                </div>
                <p className="text-sm font-bold text-[var(--foreground)] sm:text-base">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
