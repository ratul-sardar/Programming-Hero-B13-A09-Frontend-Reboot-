import { ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "What do I need to rent a car?",
    answer:
      "A valid driving license and a government-issued photo ID are required. Some vehicles may have additional age or eligibility requirements.",
  },
  {
    question: "Can I cancel or change my booking?",
    answer:
      "You can contact our support team to change or cancel a booking. Any applicable terms will be shown when you confirm your reservation.",
  },
  {
    question: "Are the cars available for one-day rentals?",
    answer:
      "Yes. Rental prices are listed per day, and you can choose the dates that work for your trip when booking.",
  },
  {
    question: "Where do I pick up the car?",
    answer:
      "Each listing shows its pickup location. Check the car details before booking to find the most convenient option.",
  },
];

export default function FaqSection() {
  return (
    <section className="cssContainer">
      <div className="mb-10 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-orange-700">
          Good to know
        </p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Frequently asked questions
        </h2>
        <p className="mt-3 text-muted">
          Quick answers to help you hit the road with confidence.
        </p>
      </div>
      <div className="divide-y divide-border border-y border-border">
        {faqs.map((faq, index) => (
          <details key={faq.question} className="group py-5" open={index === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold [&::-webkit-details-marker]:hidden">
              {faq.question}
              <span className="text-orange-700 transition group-open:rotate-90">
                <ArrowRight size={18} />
              </span>
            </summary>
            <p className="max-w-3xl pt-4 pr-8 leading-7 text-muted">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
