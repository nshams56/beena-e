export function FormFieldError({
  id,
  message,
}: {
  id: string;
  message?: string;
}) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1 text-sm text-red-600">
      {message}
    </p>
  );
}

export function FormStatusMessage({
  success,
  message,
}: {
  success: boolean;
  message: string;
}) {
  return (
    <p
      role="status"
      aria-live="polite"
      className={success ? "text-sm font-medium text-forest" : "text-sm font-medium text-red-600"}
    >
      {message}
    </p>
  );
}
