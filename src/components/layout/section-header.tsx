import { cn } from "@/lib/utils/cn";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className,
  size = "default",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
  className?: string;
  size?: "default" | "large";
}) {
  const isLarge = size === "large";

  return (
    <div
      className={cn(
        align === "center" && "text-center",
        align === "left" && "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn("lux-eyebrow", !light && "text-gold")}>{eyebrow}</p>
      ) : null}
      <h2
        className={cn(
          "mt-5",
          isLarge
            ? "font-serif text-3xl leading-[1.12] tracking-[-0.02em] md:text-4xl lg:text-[2.85rem]"
            : "font-serif text-2xl leading-[1.15] tracking-[-0.02em] md:text-3xl lg:text-[2.35rem]",
          light ? "text-white" : "text-neutral-900",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-6 leading-[1.75] md:mt-7",
            isLarge ? "max-w-2xl text-base md:text-lg" : "lux-prose-narrow text-base md:text-lg",
            align === "center" && "mx-auto",
            light ? "text-white/78" : "text-muted",
          )}
        >
          {description}
        </p>
      ) : null}
      {align === "left" && light && (
        <div className="lux-divider mt-7" aria-hidden />
      )}
    </div>
  );
}
