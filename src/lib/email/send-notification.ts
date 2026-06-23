type SendEmailParams = {
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendNotificationEmail({
  subject,
  html,
  replyTo,
}: SendEmailParams): Promise<{ sent: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFICATION_EMAIL_TO;
  // Runtime lookup — avoids hardcoded sender strings in repo / build scans
  const from = process.env["NOTIFICATION_EMAIL_FROM"];

  if (!apiKey || !to || !from) {
    return { sent: false, error: "Email not configured" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
        reply_to: replyTo,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      return { sent: false, error: body };
    }

    return { sent: true };
  } catch (err) {
    return {
      sent: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

export function formatFieldsHtml(
  fields: Record<string, string | undefined>,
): string {
  return Object.entries(fields)
    .filter(([, v]) => v)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;color:#0B1C16;">${key}</td><td style="padding:8px 12px;">${escapeHtml(value!)}</td></tr>`,
    )
    .join("");
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function notificationEmailWrapper(
  title: string,
  rows: string,
): string {
  return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;">
      <h2 style="color:#0B1C16;margin-bottom:16px;">${escapeHtml(title)}</h2>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;">
        ${rows}
      </table>
      <p style="margin-top:24px;font-size:12px;color:#6b7280;">
        Sent from BEEÑA-E Consulting website · View in Supabase admin.
      </p>
    </div>
  `;
}
