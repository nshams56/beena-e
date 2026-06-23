"use client";

import { useActionState } from "react";
import { signIn, type LoginState } from "@/app/actions/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

export function AdminLoginForm({ redirectTo }: { redirectTo?: string }) {
  const [state, action, pending] = useActionState(signIn, {} as LoginState);

  return (
    <form action={action} className="mt-6 space-y-4">
      {redirectTo ? (
        <input type="hidden" name="redirectTo" value={redirectTo} />
      ) : null}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          variant="light"
          required
          autoComplete="email"
          disabled={pending}
          className="mt-1.5"
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          variant="light"
          required
          autoComplete="current-password"
          disabled={pending}
          className="mt-1.5"
        />
      </div>
      {state.error ? (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className={cn(buttonVariants({ variant: "dark", size: "lg" }), "w-full")}
      >
        {pending ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}
