import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { requireAdmin } from "@/lib/auth/require-admin";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Subscribers",
  description: "Newsletter subscribers",
  path: "/admin/subscribers",
});

export default async function SubscribersPage() {
  const { supabase } = await requireAdmin();

  const { data: rows, error } = await supabase
    .from("newsletter_subscribers")
    .select("id, email, status, source, created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <>
      <AdminPageHeader
        title="Newsletter subscribers"
        description="Emails collected from the website."
      />

      {error ? (
        <p className="text-red-600">Could not load subscribers.</p>
      ) : null}

      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50">
            <tr>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Source</th>
              <th className="hidden px-4 py-3 font-semibold md:table-cell">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {(rows ?? []).length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted">
                  No subscribers yet.
                </td>
              </tr>
            ) : (
              (rows ?? []).map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-neutral-100 last:border-0"
                >
                  <td className="px-4 py-3 font-medium">{row.email}</td>
                  <td className="px-4 py-3 capitalize">{row.status}</td>
                  <td className="px-4 py-3 text-muted">{row.source ?? "—"}</td>
                  <td className="hidden px-4 py-3 text-muted md:table-cell">
                    {new Date(row.created_at).toLocaleString()}
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
