import SiteShell from "@/components/layout/site-shell";
import Container from "@/components/shared/container";

const faqs = [
  {
    question: "How long does delivery take?",
    answer:
      "Most orders are processed quickly after payment confirmation. Delivery timing depends on your location and order volume.",
  },
  {
    question: "Can I track my order after checkout?",
    answer:
      "Yes. Use the track order page with your order ID and checkout email to review payment and delivery progress.",
  },
  {
    question: "How do I know which supplement is right for me?",
    answer:
      "Each product page includes key benefits, ingredients, and usage guidance to help you compare options more confidently.",
  },
  {
    question: "Can I save my delivery address for future orders?",
    answer:
      "Yes. Signed-in customers can save delivery addresses in their account for a faster checkout experience next time.",
  },
];

export default function FaqsPage() {
  return (
    <SiteShell>
      <section className="py-14 sm:py-16">
        <Container>
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-blue-700">
              FAQs
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
              Frequently asked questions
            </h1>
            <p className="mt-4 text-base leading-7 text-[var(--muted-foreground)]">
              Quick answers to the questions shoppers usually ask before
              ordering, tracking, or comparing products.
            </p>
          </div>

          <div className="mt-10 grid gap-5">
            {faqs.map((item) => (
              <article
                key={item.question}
                className="rounded-[2rem] border border-[var(--border)] bg-white p-6 shadow-sm sm:p-8"
              >
                <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                  {item.question}
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted-foreground)] sm:text-base">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
