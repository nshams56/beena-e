import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().optional(),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  website: z.string().max(0).optional(),
});

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: Partial<Record<keyof z.infer<typeof contactSchema>, string[]>>;
};

export const initialContactState: ContactFormState = {
  success: false,
  message: "",
};
