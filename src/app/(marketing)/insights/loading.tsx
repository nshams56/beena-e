import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200/80 bg-white shadow-sm">
      <div className="aspect-[16/10] animate-pulse bg-neutral-200" />
      <div className="space-y-3 p-6">
        <div className="h-3 w-24 animate-pulse rounded bg-neutral-200" />
        <div className="h-5 w-full animate-pulse rounded bg-neutral-200" />
        <div className="h-4 w-full animate-pulse rounded bg-neutral-100" />
        <div className="h-3 w-32 animate-pulse rounded bg-neutral-100" />
      </div>
    </div>
  );
}

export default function InsightsLoading() {
  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Latest Perspectives"
        description="Thought leadership on ophthalmic biotech development, regulation, and commercialization."
      />
      <Section variant="light">
        <Container>
          <div className="mb-8 h-12 max-w-md animate-pulse rounded-xl bg-neutral-200" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
