import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { PostForm, type PostFormData } from "@/components/admin/post-form";
import { deletePost } from "@/app/actions/posts";
import { requireAdmin } from "@/lib/auth/require-admin";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return buildPageMetadata({
    title: "Edit Post",
    description: "Edit blog post",
    path: `/admin/posts/${id}/edit`,
  });
}

export default async function EditPostPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { saved } = await searchParams;
  const { supabase } = await requireAdmin();

  const [{ data: post, error }, { data: categories }] = await Promise.all([
    supabase.from("posts").select("*").eq("id", id).single(),
    supabase.from("categories").select("id, name").order("name"),
  ]);

  if (error || !post) notFound();

  const formData: PostFormData = {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt ?? "",
    content: post.content ?? "",
    status: post.status,
    categoryId: post.category_id ?? "",
    coverImageUrl: post.cover_image_url ?? "",
    readTimeMin: post.read_time_min ?? 5,
    metaTitle: post.meta_title ?? "",
    metaDescription: post.meta_description ?? "",
    relatedServiceSlug: post.related_service_slug ?? "",
  };

  return (
    <>
      <AdminPageHeader
        title="Edit post"
        description={post.title}
      />

      {saved ? (
        <p className="mb-4 rounded-lg bg-forest/10 px-4 py-3 text-sm text-forest">
          Post created. You can continue editing below.
        </p>
      ) : null}

      <PostForm
        mode="edit"
        post={formData}
        categories={categories ?? []}
      />

      <form
        action={deletePost.bind(null, id)}
        className="mt-8 rounded-xl border border-red-200 bg-red-50/50 p-6"
      >
        <h2 className="font-semibold text-red-800">Danger zone</h2>
        <p className="mt-1 text-sm text-red-700">
          Permanently delete this post. This cannot be undone.
        </p>
        <button
          type="submit"
          className={cn(
            buttonVariants({ size: "md" }),
            "mt-4 bg-red-600 text-white hover:bg-red-700",
          )}
        >
          Delete post
        </button>
      </form>
    </>
  );
}
