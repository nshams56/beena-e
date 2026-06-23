"use client";

import Link from "next/link";
import { Calendar, Globe2, Mail, MapPin, Newspaper, Phone, Shield } from "lucide-react";
import { GoogleMapsEmbed } from "@/components/layout/google-maps-embed";
import { Reveal } from "@/components/motion/reveal";
import { footerContact } from "@/lib/data/home-content";
import { cn } from "@/lib/utils/cn";

const sponsorTypes = [
  "Clinical-stage biotech sponsors",
  "Global ophthalmic developers",
  "Strategic pharma alliances",
] as const;

const focusAreas = [
  "Development & clinical strategy",
  "Regulatory & market access",
  "Commercialization readiness",
] as const;

const channels = [
  {
    icon: Mail,
    label: "Email",
    href: `mailto:${footerContact.email}`,
    value: footerContact.email,
  },
  {
    icon: Phone,
    label: "Phone",
    href: `tel:${footerContact.phone.replace(/\D/g, "")}`,
    value: footerContact.phone,
  },
  {
    icon: MapPin,
    label: "Office",
    value: footerContact.address,
  },
] as const;

export function ContactConciergePanel({
  isRise,
  mapsEmbedUrl,
}: {
  isRise: boolean;
  mapsEmbedUrl?: string;
}) {
  return (
    <Reveal delay={0.05} className="lg:sticky lg:top-28 lg:self-start">
      <div className="lux-contact-concierge relative space-y-6">
        {isRise ? (
          <div className="relative overflow-hidden rounded-[1.5rem] border border-rise-green/20 bg-rise-green/6 px-6 py-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-rise-green">
              Program context
            </p>
            <p className="mt-3 text-sm leading-[1.85] text-neutral-800">
              Inquiry regarding{" "}
              <strong className="font-medium text-neutral-900">RISE Pakistan Health</strong>
              , coordinated through BEEÑA-E Consulting, USA.
            </p>
          </div>
        ) : null}

        <div className="relative overflow-hidden rounded-[1.75rem] border border-neutral-200/55 bg-white/85 p-7 shadow-[0_24px_72px_rgba(11,28,22,0.07)] backdrop-blur-md md:p-8 lg:p-9">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(11,44,36,0.08),transparent_70%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/45 to-transparent"
            aria-hidden
          />

          <div className="relative flex items-start gap-3">
            <Shield className="mt-0.5 h-5 w-5 shrink-0 text-gold/90" strokeWidth={1.5} aria-hidden />
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted">
                Executive concierge
              </p>
              <h2 className="mt-3 font-serif text-[1.65rem] leading-[1.12] tracking-[-0.03em] text-neutral-900 md:text-[1.85rem]">
                Consultation expectations
              </h2>
            </div>
          </div>

          <p className="relative mt-5 text-sm leading-[1.9] text-muted">
            Inquiries are reviewed with discretion by senior advisors. We coordinate
            across U.S., European, and emerging-market contexts with operational
            maturity appropriate to regulated ophthalmic programs.
          </p>

          <div className="relative mt-8 space-y-6 border-t border-neutral-200/50 pt-8">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-muted">
                Sponsor profiles
              </p>
              <ul className="mt-3 space-y-2.5">
                {sponsorTypes.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-snug text-neutral-800 before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-gold/80 before:content-['']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-muted">
                Strategic focus
              </p>
              <ul className="mt-3 space-y-2.5">
                {focusAreas.map((item) => (
                  <li
                    key={item}
                    className="text-sm leading-snug text-neutral-800/90"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative mt-8 flex gap-3 rounded-2xl border border-neutral-200/50 bg-ivory/60 px-4 py-4">
            <Globe2 className="mt-0.5 h-4 w-4 shrink-0 text-gold/85" aria-hidden />
            <p className="text-[0.8rem] leading-[1.75] text-muted">
              <span className="font-medium text-neutral-800">Global coordination.</span>{" "}
              Cross-border program alignment with response within one business day
              for qualified inquiries.
            </p>
          </div>

          <ul className="relative mt-8 space-y-4 border-t border-neutral-200/50 pt-8">
            {channels.map((channel) => {
              const Icon = channel.icon;
              const row = (
                <>
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold/80" aria-hidden />
                  <span className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-muted">
                      {channel.label}
                    </span>
                    <span className="mt-1 block text-sm text-neutral-800 transition-colors duration-500 group-hover:text-forest">
                      {channel.value}
                    </span>
                  </span>
                </>
              );
              return (
                <li key={channel.label}>
                  {"href" in channel ? (
                    <a href={channel.href} className="group flex gap-3">
                      {row}
                    </a>
                  ) : (
                    <div className="flex gap-3">{row}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <Link
            href="/book"
            className={cn(
              "relative mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-forest text-sm font-medium text-white transition-all duration-500 hover:bg-forest-elevated hover:shadow-[0_18px_52px_rgba(11,28,22,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
            )}
          >
            <Calendar className="h-4 w-4" aria-hidden />
            Schedule consultation
          </Link>
          <Link
            href="/newsletter"
            className="relative mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-full border border-neutral-200/75 text-sm font-medium text-forest transition-all duration-500 hover:border-forest/20 hover:bg-neutral-50/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2"
          >
            <Newspaper className="h-4 w-4" aria-hidden />
            Advisory updates
          </Link>
        </div>

        {mapsEmbedUrl ? (
          <div className="overflow-hidden rounded-[1.5rem] border border-neutral-200/55 bg-white/80 shadow-[0_16px_48px_rgba(11,28,22,0.05)]">
            <div className="border-b border-neutral-200/50 px-5 py-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted">
                Presence
              </p>
              <p className="mt-1 font-serif text-lg tracking-[-0.02em] text-neutral-900">
                United States
              </p>
            </div>
            <GoogleMapsEmbed embedUrl={mapsEmbedUrl} className="rounded-none border-0" />
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}
