// app/(dashboard)/layout.tsx
import DashboardTemplate from "@/modules/dashboard/templates/DashboardTemplate";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardTemplate>{children}</DashboardTemplate>;
}
