"use client";

import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { Container } from "@/components/layout/container";
import { DesktopNav } from "@/components/layout/desktop-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { footerContact } from "@/lib/data/home-content";
import { cn } from "@/lib/utils/cn";

export function SiteHeader({
  transparentOnTop = true,
  activePath = "/",
}: {
  transparentOnTop?: boolean;
  activePath?: string;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !transparentOnTop;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
        solid
          ? "border-b border-white/10 bg-forest/95 shadow-sm backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <Container className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4 lg:h-20">
        <BrandLogo size="md" priority showWordmark />

        <DesktopNav activePath={activePath} />

        <div className="flex items-center justify-end gap-2">
          <a
            href={`tel:${footerContact.phone.replace(/\D/g, "")}`}
            className="hidden h-11 items-center gap-2 rounded-full bg-gold px-4 text-sm font-semibold text-forest-dark transition-colors hover:bg-gold-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-forest sm:inline-flex"
          >
            <Phone className="h-4 w-4" aria-hidden />
            <span className="hidden md:inline">Call Us Today</span>
            <span className="md:hidden">Call</span>
          </a>
          <MobileNav activePath={activePath} />
        </div>
      </Container>
    </header>
  );
}
