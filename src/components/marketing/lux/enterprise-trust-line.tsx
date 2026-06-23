import type { ReactNode } from "react";

export function EnterpriseTrustLine({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`mt-10 max-w-2xl text-xs leading-relaxed text-muted/90 ${className}`}
    >
      {children}
    </p>
  );
}
