"use server";

import { createClient } from "@/lib/supabase/server";
import {
  formatFieldsHtml,
  notificationEmailWrapper,
  sendNotificationEmail,
} from "@/lib/email/send-notification";
import { contactSchema, type ContactFormState } from "@/lib/validations/contact";

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  if (formData.get("website")) {
    return { success: true, message: "Thank you for your message." };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company") || undefined,
    phone: formData.get("phone") || undefined,
    subject: formData.get("subject"),
    message: formData.get("message"),
    website: formData.get("website") || "",
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please correct the errors below.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const payload = parsed.data;

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return {
      success: false,
      message: "Contact form is not configured. Add Supabase keys to .env.local.",
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("form_submissions").insert({
      form_type: "contact",
      payload: {
        name: payload.name,
        email: payload.email,
        company: payload.company,
        phone: payload.phone,
        subject: payload.subject,
        message: payload.message,
      },
      status: "new",
    });

    if (error) {
      return {
        success: false,
        message: "Unable to send your message. Please try again.",
      };
    }

    void sendNotificationEmail({
      subject: `[BEEÑA-E] Contact: ${payload.subject}`,
      html: notificationEmailWrapper(
        "New contact form submission",
        formatFieldsHtml({
          Name: payload.name,
          Email: payload.email,
          Company: payload.company,
          Phone: payload.phone,
          Subject: payload.subject,
          Message: payload.message,
        }),
      ),
      replyTo: payload.email,
    });

    return {
      success: true,
      message:
        "Thank you for contacting BEEÑA-E Consulting. We will respond shortly.",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
