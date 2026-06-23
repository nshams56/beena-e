"use client";

import { useActionState } from "react";
import { submitContact } from "@/app/actions/contact";
import { initialContactState } from "@/lib/validations/contact";
import { FormFieldError, FormStatusMessage } from "@/components/forms/form-field-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

export function ContactForm({
  defaultSubject = "",
  defaultMessage = "",
}: {
  defaultSubject?: string;
  defaultMessage?: string;
} = {}) {
  const [state, action, pending] = useActionState(
    submitContact,
    initialContactState,
  );

  const errors = state.errors;

  return (
    <form action={action} className="space-y-5" aria-busy={pending} noValidate>
      <div className="sr-only" aria-hidden>
        <label htmlFor="website">Leave blank</label>
        <input
          id="website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            name="name"
            variant="light"
            required
            disabled={pending}
            className="mt-1.5"
            aria-invalid={Boolean(errors?.name)}
            aria-describedby={errors?.name ? "name-error" : undefined}
          />
          <FormFieldError id="name-error" message={errors?.name?.[0]} />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            variant="light"
            required
            disabled={pending}
            className="mt-1.5"
            aria-invalid={Boolean(errors?.email)}
            aria-describedby={errors?.email ? "email-error" : undefined}
          />
          <FormFieldError id="email-error" message={errors?.email?.[0]} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            name="company"
            variant="light"
            disabled={pending}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            variant="light"
            disabled={pending}
            className="mt-1.5"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="subject">Subject *</Label>
        <Input
          id="subject"
          name="subject"
          variant="light"
          required
          disabled={pending}
          defaultValue={defaultSubject}
          className="mt-1.5"
          aria-invalid={Boolean(errors?.subject)}
          aria-describedby={errors?.subject ? "subject-error" : undefined}
        />
        <FormFieldError id="subject-error" message={errors?.subject?.[0]} />
      </div>

      <div>
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          name="message"
          variant="light"
          required
          disabled={pending}
          defaultValue={defaultMessage}
          className="mt-1.5"
          aria-invalid={Boolean(errors?.message)}
          aria-describedby={errors?.message ? "message-error" : undefined}
        />
        <FormFieldError id="message-error" message={errors?.message?.[0]} />
      </div>

      <p className="text-xs leading-relaxed text-muted">
        Information submitted through this form is handled confidentially. We
        typically respond within one business day.
      </p>

      <button
        type="submit"
        disabled={pending}
        className={cn(buttonVariants({ variant: "dark", size: "lg" }))}
      >
        {pending ? "Sending…" : "Send message"}
      </button>

      {state.message ? (
        <FormStatusMessage success={Boolean(state.success)} message={state.message} />
      ) : null}
    </form>
  );
}
