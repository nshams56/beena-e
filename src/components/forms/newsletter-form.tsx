"use client";

import { useActionState } from "react";
import { Mail } from "lucide-react";
import { subscribeNewsletter } from "@/app/actions/newsletter";
import { initialNewsletterState } from "@/lib/validations/newsletter";
import { FormFieldError, FormStatusMessage } from "@/components/forms/form-field-error";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

export function NewsletterForm({
  variant = "default",
}: {
  variant?: "default" | "institutional";
}) {
  const [state, formAction, pending] = useActionState(
    subscribeNewsletter,
    initialNewsletterState,
  );

  const isInstitutional = variant === "institutional";
  const inputVariant = isInstitutional ? "light" : "dark";

  return (
    <form
      action={formAction}
      className={cn("w-full", !isInstitutional && "lg:max-w-xl")}
      aria-busy={pending}
      noValidate
    >
      <div
        className={cn(
          "flex flex-col gap-4",
          isInstitutional ? "md:gap-5" : "gap-3 sm:flex-row sm:items-start",
        )}
      >
        <div className={cn(isInstitutional ? "w-full" : "sm:flex-1")}>
          <label
            htmlFor="newsletter-email"
            className={cn(
              isInstitutional
                ? "mb-2.5 block text-[11px] font-medium uppercase tracking-[0.22em] text-muted"
                : "sr-only",
            )}
          >
            Professional email
          </label>
          <Input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={
              isInstitutional ? "name@organization.com" : "Work email"
            }
            required
            disabled={pending}
            variant={inputVariant}
            aria-invalid={Boolean(state.errors?.email)}
            aria-describedby={
              state.errors?.email ? "newsletter-email-error" : "newsletter-hint"
            }
            className={cn(
              "w-full transition-shadow duration-500",
              isInstitutional &&
                "h-14 rounded-2xl px-5 text-base shadow-[0_4px_24px_rgba(11,28,22,0.04)] focus:shadow-[0_8px_32px_rgba(11,28,22,0.06)]",
            )}
          />
          <FormFieldError
            id="newsletter-email-error"
            message={state.errors?.email?.[0]}
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className={cn(
            buttonVariants({ variant: "dark", size: "lg" }),
            "w-full shrink-0 transition-all duration-500 hover:shadow-[0_18px_52px_rgba(11,28,22,0.2)]",
            isInstitutional && "h-14 rounded-2xl px-10 text-base",
            !isInstitutional && "sm:w-auto",
          )}
        >
          {pending
            ? "Confirming…"
            : isInstitutional
              ? "Request briefing access"
              : "Subscribe"}
        </button>
      </div>

      {state.message ? (
        <div
          className={cn(
            "flex items-start gap-2.5 rounded-xl border px-4 py-3",
            state.success
              ? "mt-5 border-forest/15 bg-forest/5"
              : "mt-5 border-red-200/80 bg-red-50/50",
          )}
        >
          <Mail
            className={cn(
              "mt-0.5 h-4 w-4 shrink-0",
              state.success ? "text-forest" : "text-red-600",
            )}
            aria-hidden
          />
          <FormStatusMessage success={Boolean(state.success)} message={state.message} />
        </div>
      ) : null}

      {!isInstitutional ? (
        <p id="newsletter-hint" className="mt-3 text-xs leading-relaxed text-muted">
          Periodic updates on ophthalmic development and regulation. Unsubscribe
          anytime. We do not share your email with third parties.
        </p>
      ) : (
        <p id="newsletter-hint" className="sr-only">
          Professional email for intelligence briefing subscription
        </p>
      )}
    </form>
  );
}
