import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import {
  formatFieldsHtml,
  notificationEmailWrapper,
  sendNotificationEmail,
} from "@/lib/email/send-notification";

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(request: NextRequest) {
  const secret = process.env.TALLY_WEBHOOK_SECRET;
  if (secret) {
    const headerSecret = request.headers.get("x-tally-signature");
    if (headerSecret !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const payload =
    typeof body === "object" && body !== null
      ? (body as Record<string, unknown>)
      : { raw: body };

  const formName =
    typeof payload.formName === "string"
      ? payload.formName
      : typeof payload.eventType === "string"
        ? payload.eventType
        : "tally";

  const fields: Record<string, string> = {};
  const data = payload.data as { fields?: { label?: string; value?: unknown }[] } | undefined;
  if (Array.isArray(data?.fields)) {
    for (const field of data.fields) {
      if (field.label) fields[field.label] = String(field.value ?? "");
    }
  }

  const supabase = getServiceClient();
  if (supabase) {
    await supabase.from("form_submissions").insert({
      form_type: `tally:${formName}`,
      payload: { ...payload, parsedFields: fields },
      status: "new",
    });
  }

  const rows = formatFieldsHtml(fields);
  if (rows) {
    await sendNotificationEmail({
      subject: `[BEEÑA-E] Tally form: ${formName}`,
      html: notificationEmailWrapper(`New Tally submission — ${formName}`, rows),
      replyTo: fields.Email || fields.email,
    });
  }

  return NextResponse.json({ received: true });
}
