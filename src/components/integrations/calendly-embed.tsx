"use client";

import Script from "next/script";

/**
 * Calendly inline widget — uses official data-url + calendly-inline-widget class
 * with explicit height so the calendar is not clipped.
 */
export function CalendlyEmbed({ url }: { url: string }) {
  return (
    <>
      <div
        className="calendly-inline-widget w-full bg-white"
        data-url={url}
        style={{ minWidth: 320, height: 700, minHeight: 700 }}
        aria-label="Schedule a meeting with Calendly"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}
