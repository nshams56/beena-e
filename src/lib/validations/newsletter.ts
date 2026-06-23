import { z } from "zod";

export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export type NewsletterFormState = {
  success: boolean;
  message: string;
  errors?: { email?: string[] };
};

export const initialNewsletterState: NewsletterFormState = {
  success: false,
  message: "",
};
