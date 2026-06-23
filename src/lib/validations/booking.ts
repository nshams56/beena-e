import { z } from "zod";

export const bookingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().optional(),
  phone: z.string().optional(),
  meetingType: z.string().min(1, "Please select a meeting type"),
  preferredDates: z.string().optional(),
  timezone: z.string().optional(),
  message: z.string().optional(),
  website: z.string().max(0).optional(),
});

export type BookingFormState = {
  success: boolean;
  message: string;
  errors?: Partial<Record<keyof z.infer<typeof bookingSchema>, string[]>>;
};

export const initialBookingState: BookingFormState = {
  success: false,
  message: "",
};
