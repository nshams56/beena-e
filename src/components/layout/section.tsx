import { cn } from "@/lib/utils/cn";

type SectionVariant = "forest" | "light" | "white";

const variantClasses: Record<SectionVariant, string> = {
  forest: "bg-forest text-white",
  light: "bg-neutral-50 text-neutral-900",
  white: "bg-white text-neutral-900",
};

export function Section({
  children,
  className,
  id,
  variant = "white",
  padding = "default",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: SectionVariant;
  padding?: "default" | "compact";
}) {
  return (
    <section
      id={id}
      className={cn(
        variantClasses[variant],
        padding === "default" ? "py-16 md:py-24" : "py-10 md:py-14",
        className,
      )}
    >
      {children}
    </section>
  );
}
