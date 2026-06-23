import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

export function StickyMobileCta({
  href = "/book",
  label = "Schedule a consultation",
}: {
  href?: string;
  label?: string;
}) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
      role="region"
      aria-label="Quick action"
    >
      <Link
        href={href}
        className={cn(
          buttonVariants({ variant: "dark", size: "lg" }),
          "w-full justify-center",
        )}
      >
        {label}
      </Link>
    </div>
  );
}
