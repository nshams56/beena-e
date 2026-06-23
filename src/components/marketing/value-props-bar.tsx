import {
  BarChart3,
  FlaskConical,
  Globe2,
  Target,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { valueProps } from "@/lib/data/home-content";

const iconMap: Record<string, LucideIcon> = {
  flask: FlaskConical,
  globe: Globe2,
  target: Target,
  chart: BarChart3,
};

export function ValuePropsBar() {
  return (
    <section className="border-y border-white/10 bg-forest-elevated/80 py-10 md:py-12">
      <Container>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {valueProps.map((item) => {
            const Icon = iconMap[item.icon] ?? Target;
            return (
              <li key={item.title} className="flex gap-4">
                <Icon
                  className="h-8 w-8 shrink-0 stroke-[1.25] text-gold"
                  aria-hidden
                />
                <div>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/75">
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
