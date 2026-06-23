"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

export function ImageUpload({
  name = "coverImageUrl",
  defaultUrl = "",
  label = "Cover image URL",
  onChange,
}: {
  name?: string;
  defaultUrl?: string;
  label?: string;
  onChange?: (url: string) => void;
}) {
  const [url, setUrl] = useState(defaultUrl);

  function updateUrl(next: string) {
    setUrl(next);
    onChange?.(next);
  }
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);

    const supabase = createClient();
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `posts/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("media")
      .upload(path, file, { upsert: false });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("media").getPublicUrl(path);
    updateUrl(data.publicUrl);
    setUploading(false);
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <input type="hidden" name={name} value={url} />
      <Input
        id={name}
        variant="light"
        value={url}
        onChange={(e) => updateUrl(e.target.value)}
        placeholder="https://... or upload below"
        readOnly={uploading}
      />
      <div className="flex flex-wrap items-center gap-3">
        <label className={cn(buttonVariants({ variant: "dark", size: "sm" }), "cursor-pointer")}>
          {uploading ? "Uploading…" : "Upload image"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="sr-only"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleFile(file);
            }}
          />
        </label>
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-forest hover:text-gold"
          >
            Preview
          </a>
        ) : null}
      </div>
      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
      {url ? (
        <div className="relative mt-2 aspect-video max-w-xs overflow-hidden rounded-lg border border-neutral-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="Cover preview" className="h-full w-full object-cover" />
        </div>
      ) : null}
    </div>
  );
}
