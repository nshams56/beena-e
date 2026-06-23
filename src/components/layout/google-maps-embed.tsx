import { cn } from "@/lib/utils/cn";

export function GoogleMapsEmbed({
  embedUrl,
  className,
}: {
  embedUrl: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-neutral-200",
        className,
      )}
    >
      <iframe
        src={embedUrl}
        title="Office location map"
        className="aspect-[4/3] w-full min-h-[280px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
