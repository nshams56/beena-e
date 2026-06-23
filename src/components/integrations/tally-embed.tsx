import { cn } from "@/lib/utils/cn";

type TallyEmbedProps = {
  formId: string;
  title?: string;
  variant?: "default" | "premium" | "institutional";
};

function buildTallySrc(formId: string) {
  const params = new URLSearchParams({
    alignLeft: "1",
    hideTitle: "1",
    transparentBackground: "0",
    dynamicHeight: "1",
  });
  return `https://tally.so/embed/${formId}?${params.toString()}`;
}

export function TallyEmbed({
  formId,
  title = "Contact form",
  variant = "default",
}: TallyEmbedProps) {
  const src = buildTallySrc(formId);
  const isInstitutional = variant === "institutional";
  const isPremium = variant === "premium" || isInstitutional;

  if (isInstitutional) {
    return (
      <div className="lux-contact-intake-viewport relative w-full">
        <div
          className="pointer-events-none absolute -inset-3 rounded-[1.65rem] bg-[radial-gradient(ellipse_80%_70%_at_50%_30%,rgba(11,44,36,0.07),transparent_65%)]"
          aria-hidden
        />
        <div className="relative rounded-[1.5rem] bg-linear-to-b from-neutral-100/80 via-white to-neutral-50/50 p-2 ring-1 ring-neutral-200/60 shadow-[inset_0_2px_24px_rgba(11,28,22,0.04),0_8px_40px_rgba(11,28,22,0.05)] md:p-3">
          <div className="overflow-hidden rounded-[1.2rem] bg-white shadow-[inset_0_1px_0_rgba(255,255,255,1)] ring-1 ring-neutral-200/40">
            <iframe
              src={src}
              title={title}
              className="lux-tally-embed-iframe block min-h-[520px] w-full border-0 bg-white sm:min-h-[580px] md:min-h-[620px]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "lux-tally-embed w-full",
        isPremium &&
          "rounded-[1.25rem] bg-linear-to-b from-neutral-50/80 to-white p-3 ring-1 ring-neutral-200/50 md:p-4",
      )}
    >
      <iframe
        src={src}
        title={title}
        className={cn(
          "w-full border-0 bg-white",
          isPremium
            ? "min-h-[560px] rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
            : "min-h-[500px] rounded-xl border border-neutral-200",
        )}
        loading="lazy"
      />
    </div>
  );
}
