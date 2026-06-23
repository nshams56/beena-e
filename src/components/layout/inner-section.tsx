import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils/cn";

type Variant = "ivory" | "light" | "white" | "forest";

const variants: Record<Variant, string> = {
  ivory: "bg-ivory text-neutral-900",
  light: "bg-neutral-50 text-neutral-900",
  white: "bg-white text-neutral-900",
  forest: "bg-forest text-white",
};

export function InnerSection({
  children,
  variant = "ivory",
  className,
  containerClassName,
  size = "default",
  id,
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  containerClassName?: string;
  size?: "default" | "content" | "wide";
  id?: string;
}) {
  return (
    <section id={id} className={cn("relative overflow-hidden", variants[variant], className)}>
      {variant === "ivory" && (
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-white via-ivory to-neutral-50/50"
          aria-hidden
        />
      )}
      <Container size={size} className={cn("relative", containerClassName)}>
        {children}
      </Container>
    </section>
  );
}
