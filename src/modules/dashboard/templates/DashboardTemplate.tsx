
import { SidebarProvider } from "@/modules/dashboard/context/SidebarContext";
import Sidebar from "@/modules/dashboard/components/organisms/Sidebar";
import Header from "@/modules/dashboard/components/organisms/Header";

export default function DashboardTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen ds-bg">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header />
          <main className="flex-1 overflow-x-hidden p-4 sm:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
