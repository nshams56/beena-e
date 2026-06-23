import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type AdminRole = "admin" | "editor" | "viewer";

export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/admin/login");
  }

  let { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    const { data: created } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        role: "editor",
        full_name: user.email?.split("@")[0] ?? "Admin",
      })
      .select("role, full_name")
      .single();

    profile = created ?? { role: "editor" as const, full_name: null };
  }

  if (profile.role === "viewer") {
    redirect("/admin/login?error=unauthorized");
  }

  return { supabase, user, profile: profile as { role: AdminRole; full_name: string | null } };
}

export async function getAdminSession() {
  try {
    return await requireAdmin();
  } catch {
    return null;
  }
}
