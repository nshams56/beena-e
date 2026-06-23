import { AdminLayoutWrapper } from "@/components/admin/admin-layout-wrapper";
import { requireAdmin } from "@/lib/auth/require-admin";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile } = await requireAdmin();

  return (
    <AdminLayoutWrapper userEmail={user.email ?? ""} role={profile.role}>
      {children}
    </AdminLayoutWrapper>
  );
}
