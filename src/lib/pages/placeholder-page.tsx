import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export function PlaceholderPage({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <Section variant="light">
        <Container size="content">
          <p className="text-muted">
            Content coming in Phase 4. See{" "}
            <code className="text-forest">docs/IMPLEMENTATION_BLUEPRINT.md</code>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
