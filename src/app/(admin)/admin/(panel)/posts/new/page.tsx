import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { PostForm } from "@/components/admin/post-form";
import { requireAdmin } from "@/lib/auth/require-admin";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "New Post",
  description: "Create a new blog post",
  path: "/admin/posts/new",
});

export default async function NewPostPage() {
  const { supabase } = await requireAdmin();
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name")
    .order("name");

  return (
    <>
      <AdminPageHeader
        title="New post"
        description="Draft or publish an insights article."
      />
      <PostForm mode="create" categories={categories ?? []} />
    </>
  );
}
