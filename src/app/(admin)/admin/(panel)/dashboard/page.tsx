import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { requireAdmin } from "@/lib/auth/require-admin";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Admin Dashboard",
  description: "BEEÑA-E Consulting admin dashboard.",
  path: "/admin/dashboard",
});

export default async function AdminDashboardPage() {
  const { supabase, user } = await requireAdmin();

  const [subscribers, bookings, submissions, posts] = await Promise.all([
    supabase
      .from("newsletter_subscribers")
      .select("id", { count: "exact", head: true }),
    supabase
      .from("booking_requests")
      .select("id", { count: "exact", head: true }),
    supabase
      .from("form_submissions")
      .select("id", { count: "exact", head: true }),
    supabase.from("posts").select("id", { count: "exact", head: true }),
  ]);

  const stats = [
    {
      label: "Newsletter subscribers",
      count: subscribers.count ?? 0,
      href: "/admin/subscribers",
    },
    {
      label: "Booking requests",
      count: bookings.count ?? 0,
      href: "/admin/bookings",
    },
    {
      label: "Form submissions",
      count: submissions.count ?? 0,
      href: "/admin/submissions",
    },
    { label: "Blog posts", count: posts.count ?? 0, href: "/admin/posts" },
  ];

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description={`Welcome back. Signed in as ${user.email}`}
        action={{ href: "/admin/posts/new", label: "New post" }}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="text-3xl font-bold text-forest">{stat.count}</p>
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-neutral-200 bg-white p-6">
        <h2 className="font-semibold text-neutral-900">Quick actions</h2>
        <ul className="mt-4 space-y-2 text-sm">
          <li>
            <Link href="/admin/posts/new" className="text-forest hover:text-gold">
              Create a new insight →
            </Link>
          </li>
          <li>
            <Link href="/admin/posts" className="text-forest hover:text-gold">
              Manage all posts →
            </Link>
          </li>
          <li>
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-forest hover:text-gold"
            >
              Supabase dashboard →
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
