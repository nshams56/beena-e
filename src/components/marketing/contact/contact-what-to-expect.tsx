const steps = [
  {
    step: "01",
    title: "Initial review",
    detail: "Advisory team assesses program context and strategic fit.",
  },
  {
    step: "02",
    title: "Follow-up coordination",
    detail: "Aligned inquiries receive structured next-step guidance.",
  },
  {
    step: "03",
    title: "Confidential scheduling",
    detail: "Senior consultation arranged with appropriate governance.",
  },
] as const;

export function ContactWhatToExpect() {
  return (
    <div className="border-b border-neutral-200/45 px-6 py-7 md:px-10 md:py-8 lg:px-12">
      <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted">
        What to expect
      </p>
      <ol className="mt-6 grid gap-6 sm:grid-cols-3 sm:gap-5">
        {steps.map(({ step, title, detail }) => (
          <li
            key={step}
            className="group border-t border-neutral-200/50 pt-5 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-5 first:sm:border-l-0 first:sm:pl-0"
          >
            <span className="font-serif text-lg tracking-[-0.02em] text-gold/90">
              {step}
            </span>
            <p className="mt-2 text-sm font-medium tracking-[-0.01em] text-neutral-900">
              {title}
            </p>
            <p className="mt-2 text-[0.8rem] leading-[1.75] text-muted">{detail}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
