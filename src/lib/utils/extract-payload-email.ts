export function extractPayloadEmail(
  payload: Record<string, unknown>,
): string | null {
  const keys = ["email", "Email", "e-mail", "work_email", "your_email"];
  for (const key of keys) {
    const value = payload[key];
    if (typeof value === "string" && value.includes("@")) {
      return value.trim();
    }
  }
  for (const value of Object.values(payload)) {
    if (typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return value.trim();
    }
  }
  return null;
}
