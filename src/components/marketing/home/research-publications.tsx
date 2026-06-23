import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, FileText } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { buttonVariants } from "@/components/ui/button";
import { publicationTypes } from "@/lib/data/about-content";
import { STOCK_IMAGES } from "@/lib/data/stock-images";
import { cn } from "@/lib/utils/cn";

const publicationImages = [
  STOCK_IMAGES.insightRegulatory,
  STOCK_IMAGES.insightBiomarkers,
  STOCK_IMAGES.insightEmerging,
  STOCK_IMAGES.portfolioLab,
  STOCK_IMAGES.heroEye,
] as const;

export function ResearchPublications() {
  return (
    <Section variant="light" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-ivory via-neutral-50 to-white"
        aria-hidden
      />
      <Container className="relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Research & publications"
            title="Ophthalmic industry perspectives"
            description="Executive-grade perspectives across whitepapers, regulatory intelligence, market outlooks, and clinical innovation."
            align="left"
          />
          <Link
            href="/insights"
            className={cn(
              buttonVariants({ variant: "dark", size: "md" }),
              "shrink-0 self-start",
            )}
          >
            Explore insights →
          </Link>
        </div>

        <StaggerChildren className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {publicationTypes.map((pub, i) => (
            <StaggerItem key={pub.title}>
              <Link
                href="/insights"
                className="group card-hover-lift lux-glass-light relative flex h-full flex-col overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-forest">
                  <Image
                    src={publicationImages[i] ?? STOCK_IMAGES.heroEye}
                    alt=""
                    fill
                    className="object-cover opacity-90 transition-transform duration-700 [@media(hover:hover)]:group-hover:scale-105 motion-reduce:transition-none"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div
                    className="absolute inset-0 bg-linear-to-t from-forest-dark/80 via-forest/30 to-transparent"
                    aria-hidden
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-forest">
                      <FileText className="h-3.5 w-3.5" aria-hidden />
                      {pub.category}
                    </span>
                    <ArrowUpRight
                      className="h-5 w-5 text-gold opacity-0 transition-opacity [@media(hover:hover)]:group-hover:opacity-100"
                      aria-hidden
                    />
                  </div>
                  <h3 className="mt-4 font-serif text-xl text-neutral-900 md:text-2xl">
                    {pub.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {pub.description}
                  </p>
                  <p className="mt-5 text-xs font-medium text-forest/80">
                    Read perspectives →
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </Section>
  );
}
