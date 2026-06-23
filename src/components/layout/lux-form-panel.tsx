import { cn } from "@/lib/utils/cn";

export function LuxFormPanel({
  children,
  className,
  title,
  description,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
}) {
  return (
    <div className={cn("lux-glass-light p-8 md:p-10 lg:p-12", className)}>
      {title ? (
        <h2 className="font-serif text-2xl tracking-[-0.02em] text-neutral-900 md:text-3xl">
          {title}
        </h2>
      ) : null}
      {description ? (
        <p className="mt-3 max-w-lg text-sm leading-[1.8] text-muted md:text-base">
          {description}
        </p>
      ) : null}
      <div className={title || description ? "mt-8" : undefined}>{children}</div>
    </div>
  );
}
