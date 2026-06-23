import { cn } from "@/lib/utils/cn";

export function FieldGuidance({
  children,
  count,
  min,
  max,
  ideal,
  className,
}: {
  children?: React.ReactNode;
  count?: number;
  min?: number;
  max?: number;
  ideal?: number;
  className?: string;
}) {
  const overMax = max !== undefined && count !== undefined && count > max;
  const underMin = min !== undefined && count !== undefined && count < min;

  return (
    <div className={cn("mt-1.5 flex flex-wrap items-center justify-between gap-2 text-xs", className)}>
      <span className="text-muted">{children}</span>
      {count !== undefined && max !== undefined ? (
        <span
          className={cn(
            "tabular-nums",
            overMax || underMin ? "font-medium text-amber-700" : "text-muted",
          )}
        >
          {count}
          {ideal ? ` / ~${ideal}` : ""} (max {max})
        </span>
      ) : null}
    </div>
  );
}
