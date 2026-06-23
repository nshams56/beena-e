"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createPost, updatePost } from "@/app/actions/posts";
import { initialPostState } from "@/lib/validations/post";
import { ImageUpload } from "@/components/admin/image-upload";
import { FieldGuidance } from "@/components/admin/field-guidance";
import { PostQualityPanel } from "@/components/admin/post-quality-panel";
import { ARTICLE_CONTENT_TEMPLATE, CONTENT_LIMITS } from "@/lib/content-governance";
import { staticServices } from "@/lib/data/services";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buttonVariants } from "@/components/ui/button";
import { slugify } from "@/lib/utils/slugify";
import { cn } from "@/lib/utils/cn";

export type PostFormData = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: "draft" | "published" | "archived";
  categoryId: string;
  coverImageUrl: string;
  readTimeMin: number;
  metaTitle: string;
  metaDescription: string;
  relatedServiceSlug: string;
};

type Category = { id: string; name: string };

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1 text-sm text-red-600" role="alert">
      {message}
    </p>
  );
}

export function PostForm({
  post,
  categories,
  mode,
}: {
  post?: PostFormData;
  categories: Category[];
  mode: "create" | "edit";
}) {
  const boundUpdate = post?.id ? updatePost.bind(null, post.id) : undefined;

  const [state, action, pending] = useActionState(
    mode === "create" ? createPost : boundUpdate!,
    initialPostState,
  );

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [status, setStatus] = useState<PostFormData["status"]>(post?.status ?? "draft");
  const [coverImageUrl, setCoverImageUrl] = useState(post?.coverImageUrl ?? "");
  const [metaTitle, setMetaTitle] = useState(post?.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(post?.metaDescription ?? "");
  const [relatedServiceSlug, setRelatedServiceSlug] = useState(
    post?.relatedServiceSlug ?? "",
  );
  const [categoryId, setCategoryId] = useState(post?.categoryId ?? "");
  const [readTimeMin, setReadTimeMin] = useState(
    post?.readTimeMin ? String(post.readTimeMin) : "",
  );

  useEffect(() => {
    if (!slugTouched && title) {
      setSlug(slugify(title));
    }
  }, [title, slugTouched]);

  const draftFields = useMemo(
    () => ({
      title,
      slug,
      excerpt,
      content,
      status,
      coverImageUrl,
      categoryId: categoryId || undefined,
      metaTitle: metaTitle || undefined,
      metaDescription: metaDescription || undefined,
      readTimeMin: readTimeMin ? Number(readTimeMin) : undefined,
      relatedServiceSlug: relatedServiceSlug || undefined,
    }),
    [
      title,
      slug,
      excerpt,
      content,
      status,
      coverImageUrl,
      categoryId,
      metaTitle,
      metaDescription,
      readTimeMin,
      relatedServiceSlug,
    ],
  );

  function insertTemplate() {
    if (content.trim() && !confirm("Replace current content with the article template?")) {
      return;
    }
    setContent(ARTICLE_CONTENT_TEMPLATE);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
      <form
        action={action}
        className="space-y-6 rounded-xl border border-neutral-200 bg-white p-6 md:p-8"
      >
        {state.message ? (
          <p
            role="status"
            className={cn(
              "rounded-lg px-4 py-3 text-sm",
              state.success
                ? "bg-forest/10 text-forest"
                : "bg-red-50 text-red-700",
            )}
          >
            {state.message}
          </p>
        ) : null}

        {state.governance?.length ? (
          <ul className="rounded-lg border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-800">
            {state.governance.map((msg) => (
              <li key={msg}>• {msg}</li>
            ))}
          </ul>
        ) : null}

        <div className="rounded-lg border border-forest/15 bg-forest/5 px-4 py-3 text-xs leading-relaxed text-forest">
          <strong>Editorial standard:</strong> Executive biotech perspective — consultative,
          specific, and operationally credible.{" "}
          <Link href="/admin/editorial" className="font-medium underline hover:text-gold">
            View full guidelines
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              variant="light"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={pending}
              className="mt-1.5"
            />
            <FieldGuidance count={title.length} max={CONTENT_LIMITS.title.max}>
              Specific, executive-facing (avoid hype adjectives)
            </FieldGuidance>
            <FieldError message={state.errors?.title?.[0]} />
          </div>

          <div>
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              name="slug"
              variant="light"
              required
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value);
              }}
              disabled={pending}
              className="mt-1.5 font-mono text-sm"
            />
            <FieldGuidance>Lowercase, hyphenated — e.g. regulatory-pathways-ophthalmology</FieldGuidance>
            <FieldError message={state.errors?.slug?.[0]} />
          </div>

          <div>
            <Label htmlFor="status">Status *</Label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as PostFormData["status"])}
              disabled={pending}
              className="mt-1.5 h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
            <FieldGuidance>
              Publishing enforces depth, headings, cover image, and tone checks
            </FieldGuidance>
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="excerpt">Excerpt *</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              variant="light"
              required
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              disabled={pending}
              className="mt-1.5 min-h-[80px]"
            />
            <FieldGuidance
              count={excerpt.length}
              min={CONTENT_LIMITS.excerpt.min}
              max={CONTENT_LIMITS.excerpt.max}
            >
              Listing + meta fallback — operational, not promotional
            </FieldGuidance>
            <FieldError message={state.errors?.excerpt?.[0]} />
          </div>

          <div className="md:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Label htmlFor="content">Content *</Label>
              <button
                type="button"
                onClick={insertTemplate}
                className="text-xs font-medium text-forest hover:text-gold"
              >
                Insert article template
              </button>
            </div>
            <FieldGuidance>
              Use ## for section headings. Blank line between paragraphs. Target 900+ words to
              publish.
            </FieldGuidance>
            <Textarea
              id="content"
              name="content"
              variant="light"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={pending}
              className="mt-1.5 min-h-[320px] font-mono text-sm leading-relaxed"
            />
            <FieldError message={state.errors?.content?.[0]} />
          </div>

          <div>
            <Label htmlFor="categoryId">Category</Label>
            <select
              id="categoryId"
              name="categoryId"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              disabled={pending}
              className="mt-1.5 h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm"
            >
              <option value="">None</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="relatedServiceSlug">Related service (internal link)</Label>
            <select
              id="relatedServiceSlug"
              name="relatedServiceSlug"
              value={relatedServiceSlug}
              onChange={(e) => setRelatedServiceSlug(e.target.value)}
              disabled={pending}
              className="mt-1.5 h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm"
            >
              <option value="">None</option>
              {staticServices.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.title}
                </option>
              ))}
            </select>
            <FieldGuidance>Shown on article page — strengthens SEO and authority</FieldGuidance>
          </div>

          <div>
            <Label htmlFor="readTimeMin">Read time (minutes)</Label>
            <Input
              id="readTimeMin"
              name="readTimeMin"
              type="number"
              min={1}
              variant="light"
              value={readTimeMin}
              onChange={(e) => setReadTimeMin(e.target.value)}
              placeholder="Auto from word count"
              disabled={pending}
              className="mt-1.5"
            />
          </div>

          <div className="md:col-span-2">
            <ImageUpload
              defaultUrl={post?.coverImageUrl ?? ""}
              onChange={setCoverImageUrl}
            />
            <FieldGuidance>
              Recommended 1200×630 WebP/JPG — ophthalmic-relevant, restrained (see Media guidelines)
            </FieldGuidance>
          </div>

          <div>
            <Label htmlFor="metaTitle">SEO title</Label>
            <Input
              id="metaTitle"
              name="metaTitle"
              variant="light"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder={title || "Defaults to post title"}
              disabled={pending}
              className="mt-1.5"
            />
            <FieldGuidance count={metaTitle.length || title.length} max={CONTENT_LIMITS.metaTitle.max}>
              Optional override
            </FieldGuidance>
          </div>

          <div>
            <Label htmlFor="metaDescription">SEO description</Label>
            <Textarea
              id="metaDescription"
              name="metaDescription"
              variant="light"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Defaults to excerpt"
              disabled={pending}
              className="mt-1.5 min-h-[72px]"
            />
            <FieldGuidance
              count={(metaDescription || excerpt).length}
              min={CONTENT_LIMITS.metaDescription.min}
              max={CONTENT_LIMITS.metaDescription.max}
            >
              120–160 characters for search snippets
            </FieldGuidance>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 border-t border-neutral-100 pt-6">
          <button
            type="submit"
            disabled={pending}
            className={cn(buttonVariants({ variant: "dark", size: "lg" }))}
          >
            {pending ? "Saving…" : mode === "create" ? "Create post" : "Save changes"}
          </button>
          <Link
            href="/admin/posts"
            className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "text-forest")}
          >
            Cancel
          </Link>
          {mode === "edit" && post?.slug && post.status === "published" ? (
            <Link
              href={`/insights/${post.slug}`}
              target="_blank"
              className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "text-forest")}
            >
              View live
            </Link>
          ) : null}
        </div>
      </form>

      <PostQualityPanel fields={draftFields} />
    </div>
  );
}
