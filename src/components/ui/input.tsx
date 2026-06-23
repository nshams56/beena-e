import { cn } from "@/lib/utils/cn";

export function Input({
  className,
  variant = "dark",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: "light" | "dark";
}) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-xl border px-4 text-sm transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
        variant === "dark" &&
          "border-white/25 bg-white/5 text-white placeholder:text-white/50 focus:border-gold focus:ring-gold/30",
        variant === "light" &&
          "border-neutral-200/60 bg-white/90 text-neutral-900 placeholder:text-muted/80 shadow-[inset_0_1px_2px_rgba(11,28,22,0.04)] focus:border-forest/40 focus:ring-forest/15",
        className,
      )}
      {...props}
    />
  );
}
