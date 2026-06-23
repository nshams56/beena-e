import Link from "next/link";
import Image from "next/image";
import { signOut } from "@/app/actions/auth";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/posts", label: "Posts" },
  { href: "/admin/editorial", label: "Editorial" },
  { href: "/admin/subscribers", label: "Subscribers" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/submissions", label: "Form submissions" },
];

export function AdminShell({
  children,
  userEmail,
  role,
  activePath,
}: {
  children: React.ReactNode;
  userEmail: string;
  role: string;
  activePath: string;
}) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <Image
                src="/images/beena-e-logo.png"
                alt="BEEÑA-E Consulting"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span className="font-semibold text-forest">Admin</span>
            </Link>
            <p className="text-xs text-muted">
              {userEmail} · {role}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-sm text-forest hover:text-gold"
            >
              View site
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className={cn(buttonVariants({ variant: "dark", size: "sm" }))}
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 md:px-6">
        <aside className="hidden w-48 shrink-0 md:block">
          <nav className="space-y-1" aria-label="Admin navigation">
            {navItems.map((item) => {
              const active =
                activePath === item.href ||
                (item.href !== "/admin/dashboard" &&
                  activePath.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-forest text-white"
                      : "text-neutral-700 hover:bg-neutral-100",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="min-w-0 flex-1">{children}</div>
      </div>

      <nav
        className="fixed bottom-0 left-0 right-0 flex overflow-x-auto border-t border-neutral-200 bg-white md:hidden"
        aria-label="Admin mobile navigation"
      >
        {navItems.map((item) => {
          const active =
            activePath === item.href ||
            (item.href !== "/admin/dashboard" &&
              activePath.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "min-w-[5.5rem] shrink-0 px-2 py-3 text-center text-[10px] font-medium leading-tight",
                active ? "text-forest bg-neutral-50" : "text-muted",
              )}
              aria-current={active ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="h-14 md:hidden" aria-hidden />
    </div>
  );
}
