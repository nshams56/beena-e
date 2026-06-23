import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { requireAdmin } from "@/lib/auth/require-admin";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils/cn";

export const metadata = buildPageMetadata({
  title: "Manage Posts",
  description: "Admin post management",
  path: "/admin/posts",
});

const statusStyles: Record<string, string> = {
  draft: "bg-neutral-100 text-neutral-700",
  published: "bg-forest/10 text-forest",
  archived: "bg-amber-50 text-amber-800",
};

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ deleted?: string }>;
}) {
  const { deleted } = await searchParams;
  const { supabase } = await requireAdmin();

  const { data: posts, error } = await supabase
    .from("posts")
    .select("id, title, slug, status, published_at, updated_at")
    .order("updated_at", { ascending: false });

  return (
    <>
      <AdminPageHeader
        title="Posts"
        description="Create and publish insights articles."
        action={{ href: "/admin/posts/new", label: "New post" }}
      />

      {deleted ? (
        <p className="mb-4 rounded-lg bg-forest/10 px-4 py-3 text-sm text-forest">
          Post deleted successfully.
        </p>
      ) : null}

      {error ? (
        <p className="text-red-600">
          Could not load posts. Run migration 000004 in Supabase.
        </p>
      ) : null}

      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50">
            <tr>
              <th className="px-4 py-3 font-semibold">Title</th>
              <th className="hidden px-4 py-3 font-semibold md:table-cell">
                Status
              </th>
              <th className="hidden px-4 py-3 font-semibold lg:table-cell">
                Updated
              </th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(posts ?? []).length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted">
                  No posts yet.{" "}
                  <Link href="/admin/posts/new" className="text-forest hover:text-gold">
                    Create your first post
                  </Link>
                </td>
              </tr>
            ) : (
              (posts ?? []).map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-neutral-100 last:border-0"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-neutral-900">{post.title}</p>
                    <p className="text-xs text-muted">/insights/{post.slug}</p>
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize",
                        statusStyles[post.status] ?? statusStyles.draft,
                      )}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 text-muted lg:table-cell">
                    {post.updated_at
                      ? new Date(post.updated_at).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="font-medium text-forest hover:text-gold"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
