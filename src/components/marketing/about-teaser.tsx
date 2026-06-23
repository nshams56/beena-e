import Image from "next/image";
import Link from "next/link";
import { Dna } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buttonVariants } from "@/components/ui/button";
import { aboutHomeCopy, HOME_IMAGES } from "@/lib/data/home-content";
import { cn } from "@/lib/utils/cn";

export function AboutTeaser() {
  return (
    <Section variant="light" id="about" className="py-20 md:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-6 lg:pr-4">
            <h2 className="font-serif text-3xl leading-tight text-neutral-900 md:text-4xl lg:text-5xl">
              Vision. Science. <span className="text-gold">Impact.</span>
            </h2>
            <p className="text-base leading-relaxed text-muted md:text-lg">
              {aboutHomeCopy.body}
            </p>
            <Link
              href="/about"
              className={cn(buttonVariants({ variant: "dark", size: "lg" }))}
            >
              Learn More About Us →
            </Link>
          </div>

          <div className="relative lg:pl-6">
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={HOME_IMAGES.aboutLab}
                alt="Scientist using a microscope in an ophthalmic research laboratory"
                width={720}
                height={540}
                className="aspect-[4/3] w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div
              className="absolute -bottom-5 -left-5 z-10 flex h-[7.5rem] w-[7.5rem] flex-col items-center justify-center rounded-full border-[5px] border-neutral-50 bg-forest p-3 text-center shadow-xl md:-bottom-8 md:-left-10 md:h-32 md:w-32"
              aria-label="Science-driven, patient-focused"
            >
              <Dna className="h-7 w-7 text-gold" aria-hidden />
              <p className="mt-1.5 text-[10px] font-bold uppercase leading-tight tracking-wide text-white md:text-xs">
                Science-Driven
                <br />
                Patient-Focused
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
