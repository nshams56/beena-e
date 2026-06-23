import { cn } from "@/lib/utils/cn";

type ContainerSize = "default" | "content" | "wide";

const sizeClasses: Record<ContainerSize, string> = {
  default: "max-w-7xl",
  content: "max-w-3xl",
  wide: "max-w-[90rem]",
};

export function Container({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: ContainerSize;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 md:px-6 lg:px-8",
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </div>
  );
}
