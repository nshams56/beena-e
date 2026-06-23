import { cn } from "@/lib/utils/cn";

export function Textarea({
  className,
  variant = "light",
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  variant?: "light" | "dark";
}) {
  return (
    <textarea
      className={cn(
        "min-h-[120px] w-full rounded-xl border px-4 py-3 text-sm transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
        variant === "light" &&
          "border-neutral-200 bg-white text-neutral-900 placeholder:text-muted focus:border-forest focus:ring-forest/20",
        variant === "dark" &&
          "border-white/25 bg-white/5 text-white placeholder:text-white/50 focus:border-gold focus:ring-gold/30",
        className,
      )}
      {...props}
    />
  );
}
