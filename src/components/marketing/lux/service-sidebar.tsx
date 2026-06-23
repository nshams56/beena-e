import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export function ServiceSidebar({
  serviceTitle,
}: {
  serviceTitle: string;
}) {
  return (
    <aside className="lux-sidebar-panel">
      <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted">
        Briefing
      </p>
      <h2 className="mt-4 font-serif text-xl tracking-[-0.02em] text-neutral-900">
        Request a conversation
      </h2>
      <p className="mt-4 text-sm leading-[1.8] text-muted">
        Confidential discussion on how {serviceTitle.toLowerCase()} aligns with your
        program stage and governance needs.
      </p>
      <Link
        href="/book"
        className={cn(
          "mt-8 flex h-12 w-full items-center justify-center rounded-full bg-forest text-sm font-medium text-white transition-all duration-500 hover:bg-forest-elevated hover:shadow-[0_16px_48px_rgba(11,28,22,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
        )}
      >
        Schedule a Consultation
      </Link>
      <Link
        href="/contact"
        className="mt-3 flex h-11 w-full items-center justify-center rounded-full border border-neutral-200/80 text-sm font-medium text-forest transition-colors duration-500 hover:border-forest/30 hover:bg-neutral-50/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2"
      >
        Contact us
      </Link>
    </aside>
  );
}
