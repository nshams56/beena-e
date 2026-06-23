import Link from "next/link";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-ivory px-4 py-24 text-center">
      <Container size="content">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
          404
        </p>
        <h1 className="mt-4 font-serif text-3xl tracking-[-0.02em] text-neutral-900 md:text-4xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
          The page you requested is unavailable. Return to the homepage or
          contact our team for assistance.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
          <Link href="/" className={cn(buttonVariants({ variant: "dark", size: "lg" }))}>
            Back to home
          </Link>
          <Link
            href="/contact"
            className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "text-forest")}
          >
            Contact us
          </Link>
        </div>
      </Container>
    </main>
  );
}
