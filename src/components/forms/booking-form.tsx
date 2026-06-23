"use client";

import { useActionState } from "react";
import { submitBooking } from "@/app/actions/booking";
import { initialBookingState } from "@/lib/validations/booking";
import { FormFieldError, FormStatusMessage } from "@/components/forms/form-field-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

const meetingTypes = [
  "Discovery call",
  "Consultation",
  "Partnership discussion",
  "Project scoping",
  "Other",
];

export function BookingForm() {
  const [state, action, pending] = useActionState(
    submitBooking,
    initialBookingState,
  );

  const errors = state.errors;

  return (
    <form action={action} className="space-y-5" aria-busy={pending} noValidate>
      <div className="sr-only" aria-hidden>
        <label htmlFor="booking-website">Leave blank</label>
        <input id="booking-website" type="text" name="website" tabIndex={-1} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="fullName">Full name *</Label>
          <Input
            id="fullName"
            name="fullName"
            variant="light"
            required
            disabled={pending}
            className="mt-1.5"
            aria-invalid={Boolean(errors?.fullName)}
            aria-describedby={errors?.fullName ? "fullName-error" : undefined}
          />
          <FormFieldError id="fullName-error" message={errors?.fullName?.[0]} />
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
          <Input id="company" name="company" variant="light" disabled={pending} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" variant="light" disabled={pending} className="mt-1.5" />
        </div>
      </div>

      <div>
        <Label htmlFor="meetingType">Meeting type *</Label>
        <select
          id="meetingType"
          name="meetingType"
          required
          disabled={pending}
          aria-invalid={Boolean(errors?.meetingType)}
          aria-describedby={errors?.meetingType ? "meetingType-error" : undefined}
          className="mt-1.5 h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 focus-visible:border-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/20"
          defaultValue=""
        >
          <option value="" disabled>
            Select a type
          </option>
          {meetingTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <FormFieldError id="meetingType-error" message={errors?.meetingType?.[0]} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="preferredDates">Preferred dates</Label>
          <Input
            id="preferredDates"
            name="preferredDates"
            variant="light"
            placeholder="e.g. June 10–14, 2026"
            disabled={pending}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="timezone">Timezone</Label>
          <Input
            id="timezone"
            name="timezone"
            variant="light"
            placeholder="e.g. EST / CET"
            disabled={pending}
            className="mt-1.5"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="message">Program context</Label>
        <Textarea
          id="message"
          name="message"
          variant="light"
          disabled={pending}
          placeholder="Brief overview of your asset, stage, and objectives (optional)."
          className="mt-1.5"
        />
      </div>

      <p className="text-xs leading-relaxed text-muted">
        Consultation requests are reviewed confidentially. We confirm scheduling
        by email, typically within one business day.
      </p>

      <button
        type="submit"
        disabled={pending}
        className={cn(buttonVariants({ variant: "dark", size: "lg" }))}
      >
        {pending ? "Submitting…" : "Request consultation"}
      </button>

      {state.message ? (
        <FormStatusMessage success={Boolean(state.success)} message={state.message} />
      ) : null}
    </form>
  );
}
