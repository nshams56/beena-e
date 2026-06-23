"use client";

import { usePathname } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";

export function AdminLayoutWrapper({
  children,
  userEmail,
  role,
}: {
  children: React.ReactNode;
  userEmail: string;
  role: string;
}) {
  const pathname = usePathname();
  return (
    <AdminShell userEmail={userEmail} role={role} activePath={pathname}>
      {children}
    </AdminShell>
  );
}
