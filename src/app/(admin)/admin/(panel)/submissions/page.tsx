import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { requireAdmin } from "@/lib/auth/require-admin";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { extractPayloadEmail } from "@/lib/utils/extract-payload-email";

export const metadata = buildPageMetadata({
  title: "Form Submissions",
  description: "Contact and other form submissions",
  path: "/admin/submissions",
});

function flattenPayload(payload: Record<string, unknown>): Record<string, string> {
  const out: Record<string, string> = {};
  const parsed = payload.parsedFields;
  if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
    for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof v === "string" && v) out[k] = v;
    }
  }
  for (const [key, value] of Object.entries(payload)) {
    if (key === "parsedFields" || key === "data" || key === "fields") continue;
    if (typeof value === "string" && value && !(key in out)) {
      out[key] = value;
    }
  }
  return out;
}

export default async function SubmissionsPage() {
  const { supabase } = await requireAdmin();

  const { data: rows, error } = await supabase
    .from("form_submissions")
    .select("id, form_type, payload, status, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <>
      <AdminPageHeader
        title="Form submissions"
        description="Contact forms, Tally surveys, and other inbound leads. Reply via email using the submitter's address when available."
      />

      {error ? <p className="text-red-600">Could not load submissions.</p> : null}

      <div className="space-y-4">
        {(rows ?? []).length === 0 ? (
          <p className="rounded-xl border border-neutral-200 bg-white p-8 text-center text-muted">
            No submissions yet.
          </p>
        ) : (
          (rows ?? []).map((row) => {
            const payload = (row.payload ?? {}) as Record<string, unknown>;
            const fields = flattenPayload(payload);
            const replyEmail = extractPayloadEmail({ ...fields, ...payload });

            return (
              <article
                key={row.id}
                className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-semibold capitalize text-neutral-900">
                      {row.form_type}
                    </span>
                    <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium capitalize text-muted">
                      {row.status}
                    </span>
                  </div>
                  <span className="text-xs text-muted">
                    {new Date(row.created_at).toLocaleString()}
                  </span>
                </div>

                {replyEmail ? (
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href={`mailto:${replyEmail}?subject=Re: ${encodeURIComponent(row.form_type)}`}
                      className="inline-flex rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white hover:bg-forest-elevated"
                    >
                      Reply via email
                    </a>
                  </div>
                ) : null}

                <dl className="mt-4 grid gap-2 text-sm">
                  {Object.entries(fields).map(([key, value]) => (
                    <div key={key} className="grid sm:grid-cols-[140px_1fr]">
                      <dt className="capitalize text-muted">{key}</dt>
                      <dd className="text-neutral-900">{value}</dd>
                    </div>
                  ))}
                  {Object.keys(fields).length === 0 ? (
                    <dd className="text-sm text-muted">
                      <Link
                        href={`/admin/submissions`}
                        className="text-forest underline"
                      >
                        Raw payload
                      </Link>
                      :{" "}
                      <pre className="mt-2 max-h-40 overflow-auto rounded bg-neutral-50 p-3 text-xs">
                        {JSON.stringify(payload, null, 2)}
                      </pre>
                    </dd>
                  ) : null}
                </dl>
              </article>
            );
          })
        )}
      </div>
    </>
  );
}
