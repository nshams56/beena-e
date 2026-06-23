import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { requireAdmin } from "@/lib/auth/require-admin";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Bookings",
  description: "Consultation booking requests",
  path: "/admin/bookings",
});

export default async function BookingsPage() {
  const { supabase } = await requireAdmin();

  const { data: rows, error } = await supabase
    .from("booking_requests")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <>
      <AdminPageHeader
        title="Booking requests"
        description="Consultation requests from /book."
      />

      {error ? <p className="text-red-600">Could not load bookings.</p> : null}

      <div className="space-y-4">
        {(rows ?? []).length === 0 ? (
          <p className="rounded-xl border border-neutral-200 bg-white p-8 text-center text-muted">
            No booking requests yet.
          </p>
        ) : (
          (rows ?? []).map((row) => (
            <article
              key={row.id}
              className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-neutral-900">{row.full_name}</p>
                  <p className="text-sm text-muted">{row.email}</p>
                </div>
                <span className="rounded-full bg-forest/10 px-3 py-1 text-xs font-semibold capitalize text-forest">
                  {row.status}
                </span>
              </div>
              <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                {row.company ? (
                  <>
                    <dt className="text-muted">Company</dt>
                    <dd>{row.company}</dd>
                  </>
                ) : null}
                {row.meeting_type ? (
                  <>
                    <dt className="text-muted">Meeting type</dt>
                    <dd>{row.meeting_type}</dd>
                  </>
                ) : null}
                {row.preferred_dates ? (
                  <>
                    <dt className="text-muted">Preferred dates</dt>
                    <dd>{row.preferred_dates}</dd>
                  </>
                ) : null}
                {row.message ? (
                  <>
                    <dt className="text-muted sm:col-span-2">Message</dt>
                    <dd className="sm:col-span-2">{row.message}</dd>
                  </>
                ) : null}
              </dl>
              <p className="mt-3 text-xs text-muted">
                {new Date(row.created_at).toLocaleString()}
              </p>
            </article>
          ))
        )}
      </div>
    </>
  );
}
