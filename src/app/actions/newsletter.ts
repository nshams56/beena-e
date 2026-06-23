"use server";

import { createClient } from "@/lib/supabase/server";
import {
  formatFieldsHtml,
  notificationEmailWrapper,
  sendNotificationEmail,
} from "@/lib/email/send-notification";
import { newsletterSchema, type NewsletterFormState } from "@/lib/validations/newsletter";

export async function subscribeNewsletter(
  _prevState: NewsletterFormState,
  formData: FormData,
): Promise<NewsletterFormState> {
  const parsed = newsletterSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const email = parsed.data.email.toLowerCase().trim();

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return {
      success: false,
      message:
        "Newsletter is not configured yet. Add Supabase keys to .env.local.",
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("newsletter_subscribers").insert({
      email,
      source: "homepage",
      status: "active",
    });

    if (error) {
      if (error.code === "23505") {
        return {
          success: true,
          message: "You are already subscribed. Thank you!",
        };
      }
      return {
        success: false,
        message: "Something went wrong. Please try again later.",
      };
    }

    void sendNotificationEmail({
      subject: "[BEEÑA-E] New newsletter subscriber",
      html: notificationEmailWrapper(
        "Newsletter signup",
        formatFieldsHtml({ Email: email, Source: "website" }),
      ),
      replyTo: email,
    });

    return {
      success: true,
      message: "Thank you for subscribing to BEEÑA-E insights.",
    };
  } catch {
    return {
      success: false,
      message: "Unable to subscribe right now. Please try again.",
    };
  }
}
