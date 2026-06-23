import {
  Globe2,
  Handshake,
  Package,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { homeStats } from "@/lib/data/home-content";

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  package: Package,
  globe: Globe2,
  handshake: Handshake,
};

export function StatsBar() {
  return (
    <section className="relative z-10 border-t border-neutral-200/80 bg-white py-16 md:py-20">
      <Container>
        <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {homeStats.map((stat) => {
            const Icon = iconMap[stat.icon] ?? Users;
            return (
              <li
                key={stat.label}
                className="flex flex-col items-center text-center lg:items-start lg:border-l lg:border-neutral-200 lg:px-8 lg:text-left first:lg:border-l-0 first:lg:pl-0"
              >
                <Icon
                  className="mb-4 h-9 w-9 text-forest stroke-[1.25]"
                  aria-hidden
                />
                <p
                  className="text-4xl font-bold tracking-tight text-forest md:text-5xl"
                  aria-label={`${stat.value} ${stat.label}`}
                >
                  <span aria-hidden="true">{stat.value}</span>
                </p>
                <p className="mt-2 max-w-[220px] text-sm leading-snug text-muted">
                  {stat.label}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
