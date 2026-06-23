import { Lock, MailX, Shield, UserCheck } from "lucide-react";

const notes = [
  { icon: MailX, text: "Periodic updates only — no promotional spam" },
  { icon: UserCheck, text: "Senior-authored ophthalmic perspectives" },
  { icon: Shield, text: "Unsubscribe anytime with one click" },
  { icon: Lock, text: "Your email is never sold or shared" },
] as const;

export function NewsletterTrustNotes() {
  return (
    <ul className="mt-6 space-y-3.5">
      {notes.map(({ icon: Icon, text }) => (
        <li key={text} className="flex gap-3 text-[0.8rem] leading-[1.7] text-muted">
          <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/85" strokeWidth={1.5} aria-hidden />
          {text}
        </li>
      ))}
    </ul>
  );
}
