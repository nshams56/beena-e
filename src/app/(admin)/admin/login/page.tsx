import Image from "next/image";
import { AdminLoginForm } from "@/components/forms/admin-login-form";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Admin Login",
  description: "Sign in to the BEEÑA-E Consulting admin dashboard.",
  path: "/admin/login",
});

type Props = {
  searchParams: Promise<{ redirectTo?: string; error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  const { redirectTo, error } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 p-6">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex justify-center">
          <Image
            src="/images/beena-e-logo.png"
            alt="BEEÑA-E Consulting"
            width={120}
            height={120}
            className="h-24 w-24 object-contain"
            priority
          />
        </div>
        <h1 className="text-center font-serif text-2xl text-forest">Admin Login</h1>
        <p className="mt-2 text-sm text-muted">
          Sign in with your Supabase Auth credentials.
        </p>
        {error === "unauthorized" ? (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
            Your account does not have editor access. Ask an admin to set your role
            to <code className="text-forest">admin</code> or{" "}
            <code className="text-forest">editor</code> in Supabase → Table Editor →
            profiles.
          </p>
        ) : null}
        <AdminLoginForm redirectTo={redirectTo} />
      </div>
    </main>
  );
}
