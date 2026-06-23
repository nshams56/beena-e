"use server";

import { createClient } from "@/lib/supabase/server";
import {
  formatFieldsHtml,
  notificationEmailWrapper,
  sendNotificationEmail,
} from "@/lib/email/send-notification";
import { bookingSchema, type BookingFormState } from "@/lib/validations/booking";

export async function submitBooking(
  _prev: BookingFormState,
  formData: FormData,
): Promise<BookingFormState> {
  if (formData.get("website")) {
    return { success: true, message: "Your request has been received." };
  }

  const parsed = bookingSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    company: formData.get("company") || undefined,
    phone: formData.get("phone") || undefined,
    meetingType: formData.get("meetingType"),
    preferredDates: formData.get("preferredDates") || undefined,
    timezone: formData.get("timezone") || undefined,
    message: formData.get("message") || undefined,
    website: formData.get("website") || "",
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please correct the errors below.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return {
      success: false,
      message: "Booking is not configured. Add Supabase keys to .env.local.",
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("booking_requests").insert({
      full_name: data.fullName,
      email: data.email,
      company: data.company,
      phone: data.phone,
      meeting_type: data.meetingType,
      preferred_dates: data.preferredDates,
      timezone: data.timezone,
      message: data.message,
      status: "new",
    });

    if (error) {
      return {
        success: false,
        message: "Unable to submit your request. Please try again.",
      };
    }

    void sendNotificationEmail({
      subject: `[BEEÑA-E] Booking: ${data.meetingType}`,
      html: notificationEmailWrapper(
        "New consultation request",
        formatFieldsHtml({
          Name: data.fullName,
          Email: data.email,
          Company: data.company,
          Phone: data.phone,
          "Meeting type": data.meetingType,
          "Preferred dates": data.preferredDates,
          Timezone: data.timezone,
          Message: data.message,
        }),
      ),
      replyTo: data.email,
    });

    return {
      success: true,
      message:
        "Thank you. Our team will confirm your consultation request via email.",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
