import { z } from "zod";
import {
  assessPostContent,
  hasBlockingIssues,
  SERVICE_SLUGS,
} from "@/lib/content-governance";

export const postSchema = z.object({
  title: z.string().min(3, "Title is required"),
  slug: z
    .string()
    .min(3, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
  status: z.enum(["draft", "published", "archived"]),
  categoryId: z.string().uuid().optional().or(z.literal("")),
  coverImageUrl: z
    .string()
    .optional()
    .refine((v) => !v || v.startsWith("http"), "Must be a valid URL"),
  readTimeMin: z.coerce.number().int().min(1).max(120).optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  relatedServiceSlug: z
    .string()
    .optional()
    .refine(
      (v) => !v || (SERVICE_SLUGS as readonly string[]).includes(v),
      "Select a valid related service",
    ),
});

export type PostFormInput = z.infer<typeof postSchema>;

export type PostActionState = {
  success: boolean;
  message: string;
  postId?: string;
  errors?: Partial<Record<keyof PostFormInput, string[]>>;
  governance?: string[];
};

export const initialPostState: PostActionState = {
  success: false,
  message: "",
};

export function getPublishGovernanceErrors(data: PostFormInput): string[] {
  const issues = assessPostContent({
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    status: data.status,
    coverImageUrl: data.coverImageUrl,
    categoryId: data.categoryId,
    metaTitle: data.metaTitle,
    metaDescription: data.metaDescription,
    readTimeMin: data.readTimeMin,
    relatedServiceSlug: data.relatedServiceSlug || undefined,
  });

  if (!hasBlockingIssues(issues)) return [];
  return issues.filter((i) => i.severity === "error").map((i) => i.message);
}
