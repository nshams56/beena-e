"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Input } from "@/components/ui/input";

export function InsightsSearch({ defaultValue = "" }: { defaultValue?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="relative mb-10 max-w-lg"
      onSubmit={(e) => {
        e.preventDefault();
        const q = new FormData(e.currentTarget).get("q") as string;
        startTransition(() => {
          const params = new URLSearchParams(searchParams.toString());
          if (q.trim()) params.set("q", q.trim());
          else params.delete("q");
          router.push(`/insights?${params.toString()}`);
        });
      }}
    >
      <label htmlFor="insights-search" className="sr-only">
        Search insights
      </label>
      <Search
        className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted/70"
        aria-hidden
      />
      <Input
        id="insights-search"
        name="q"
        variant="light"
        placeholder="Search perspectives…"
        defaultValue={defaultValue}
        disabled={pending}
        className="h-14 rounded-2xl border-neutral-200/50 pl-12 text-base shadow-[0_12px_40px_rgba(11,28,22,0.04)]"
        aria-busy={pending}
      />
    </form>
  );
}
