"use client";

import Link from "next/link";
import {
  assessPostContent,
  hasBlockingIssues,
  countWords,
  countSectionHeadings,
  type PostDraftFields,
} from "@/lib/content-governance";

export function PostQualityPanel({ fields }: { fields: PostDraftFields }) {
  const issues = assessPostContent(fields);
  const blocking = hasBlockingIssues(issues);
  const words = countWords(fields.content);
  const headings = countSectionHeadings(fields.content);
  const errors = issues.filter((i) => i.severity === "error");
  const warnings = issues.filter((i) => i.severity === "warning");

  return (
    <aside className="rounded-xl border border-neutral-200 bg-neutral-50/80 p-5 text-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold text-neutral-900">Publish readiness</h2>
          <p className="mt-1 text-xs text-muted">
            ~{words} words · {headings} section headings
          </p>
        </div>
        <span
          className={
            blocking
              ? "rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800"
              : warnings.length
                ? "rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-900"
                : "rounded-full bg-forest/10 px-2.5 py-0.5 text-xs font-medium text-forest"
          }
        >
          {blocking ? "Blocked" : warnings.length ? "Review" : "Ready"}
        </span>
      </div>

      {issues.length === 0 ? (
        <p className="mt-4 text-xs text-muted">No issues detected for current draft.</p>
      ) : (
        <ul className="mt-4 max-h-64 space-y-2 overflow-y-auto text-xs">
          {issues.map((issue, i) => (
            <li
              key={`${issue.field}-${i}`}
              className={
                issue.severity === "error"
                  ? "text-red-800"
                  : issue.severity === "warning"
                    ? "text-amber-900"
                    : "text-muted"
              }
            >
              {issue.severity === "error" ? "● " : issue.severity === "warning" ? "◦ " : "○ "}
              {issue.message}
            </li>
          ))}
        </ul>
      )}

      <p className="mt-4 border-t border-neutral-200/80 pt-4 text-xs text-muted">
        <Link href="/admin/editorial" className="font-medium text-forest hover:text-gold">
          Editorial standards
        </Link>
        {" · "}
        See <code className="text-[10px]">docs/content-operations/</code> for full governance.
      </p>
    </aside>
  );
}
