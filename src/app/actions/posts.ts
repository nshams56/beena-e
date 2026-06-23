"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/require-admin";
import {
  getPublishGovernanceErrors,
  initialPostState,
  postSchema,
  type PostActionState,
} from "@/lib/validations/post";
import { estimateReadTime, slugify } from "@/lib/utils/slugify";

function parsePostForm(formData: FormData) {
  return postSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug") || slugify(String(formData.get("title") ?? "")),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    status: formData.get("status"),
    categoryId: formData.get("categoryId") || "",
    coverImageUrl: formData.get("coverImageUrl") || "",
    readTimeMin: formData.get("readTimeMin") || undefined,
    metaTitle: formData.get("metaTitle") || undefined,
    metaDescription: formData.get("metaDescription") || undefined,
    relatedServiceSlug: formData.get("relatedServiceSlug") || "",
  });
}

function rejectIfGovernanceFails(
  data: ReturnType<typeof postSchema.parse>,
): PostActionState | null {
  if (data.status !== "published") return null;

  const governance = getPublishGovernanceErrors(data);
  if (governance.length > 0) {
    return {
      success: false,
      message: "Publishing blocked by editorial standards. Resolve issues in Publish readiness.",
      governance,
    };
  }
  return null;
}

function buildPostRow(data: ReturnType<typeof postSchema.parse>) {
  const now = new Date().toISOString();
  return {
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    status: data.status,
    category_id: data.categoryId || null,
    cover_image_url: data.coverImageUrl || null,
    read_time_min: data.readTimeMin ?? estimateReadTime(data.content),
    meta_title: data.metaTitle || data.title,
    meta_description: data.metaDescription || data.excerpt,
    related_service_slug: data.relatedServiceSlug || null,
    published_at:
      data.status === "published" ? now : null,
    updated_at: now,
  };
}

export async function createPost(
  _prev: PostActionState,
  formData: FormData,
): Promise<PostActionState> {
  const parsed = parsePostForm(formData);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const governanceBlock = rejectIfGovernanceFails(parsed.data);
  if (governanceBlock) return governanceBlock;

  const { supabase } = await requireAdmin();
  const row = buildPostRow(parsed.data);

  const { data, error } = await supabase
    .from("posts")
    .insert(row)
    .select("id")
    .single();

  if (error) {
    if (error.code === "23505") {
      return { success: false, message: "A post with this slug already exists." };
    }
    return { success: false, message: error.message };
  }

  revalidatePath("/insights");
  revalidatePath("/");
  redirect(`/admin/posts/${data.id}/edit?saved=1`);
}

export async function updatePost(
  postId: string,
  _prev: PostActionState,
  formData: FormData,
): Promise<PostActionState> {
  const parsed = parsePostForm(formData);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const governanceBlock = rejectIfGovernanceFails(parsed.data);
  if (governanceBlock) return governanceBlock;

  const { supabase } = await requireAdmin();

  const { data: existing } = await supabase
    .from("posts")
    .select("published_at, status")
    .eq("id", postId)
    .single();

  const row = buildPostRow(parsed.data);

  if (parsed.data.status === "published") {
    row.published_at =
      existing?.published_at ?? new Date().toISOString();
  } else {
    row.published_at = existing?.published_at ?? null;
  }

  const { error } = await supabase.from("posts").update(row).eq("id", postId);

  if (error) {
    if (error.code === "23505") {
      return { success: false, message: "A post with this slug already exists." };
    }
    return { success: false, message: error.message };
  }

  revalidatePath("/insights");
  revalidatePath(`/insights/${parsed.data.slug}`);
  revalidatePath("/");

  return {
    success: true,
    message: "Post saved successfully.",
    postId,
  };
}

export async function deletePost(postId: string) {
  const { supabase } = await requireAdmin();
  const { data: post } = await supabase
    .from("posts")
    .select("slug")
    .eq("id", postId)
    .single();

  await supabase.from("posts").delete().eq("id", postId);

  revalidatePath("/insights");
  if (post?.slug) revalidatePath(`/insights/${post.slug}`);
  revalidatePath("/");

  redirect("/admin/posts?deleted=1");
}
