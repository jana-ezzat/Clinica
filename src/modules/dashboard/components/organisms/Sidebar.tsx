"use client";

import { usePathname } from "next/navigation";
import { MdChevronLeft, MdChevronRight, MdLogout } from "react-icons/md";
import Logo from "@/shared/components/atoms/Logo";
import Button from "@/shared/components/atoms/Button";
import Text from "@/shared/components/atoms/Text";
import { cn } from "@/lib/utils";
import { navItems } from "../../lib/navItems";
import { useSidebar } from "../../context/SidebarContext";

function SidebarContent({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div
        className={cn(
          "flex items-center px-5 py-6",
          collapsed ? "justify-center" : "justify-between",
        )}>
        {!collapsed && <Logo />}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === item.href
              : pathname?.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Button
              key={item.href}
              tag="link"
              href={item.href}
              variant="ghost"
              fullWidth
              className={cn(
                "!justify-start gap-3 font-medium",
                collapsed && "!justify-center",
                isActive
                  ? "!ds-text-button-primary"
                  : "!ds-text hover:opacity-70",
              )}>
              <Icon size={22} className="shrink-0" />
              {!collapsed && (
                <Text size="sm" className="!p-0 !text-inherit font-medium">
                  {item.label}
                </Text>
              )}
            </Button>
          );
        })}
      </nav>

      <div className="border-t ds-border-gray px-3 py-4">
        <Button
          variant="ghost"
          fullWidth
          className={cn(
            "!justify-start gap-3 !text-red-500 hover:opacity-70",
            collapsed && "!justify-center",
          )}>
          <MdLogout size={22} className="shrink-0" />
          {!collapsed && (
            <Text size="sm" className="!p-0 !text-inherit font-medium">
              تسجيل الخروج
            </Text>
          )}
        </Button>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const { collapsed, toggleCollapsed, mobileOpen, closeMobile } =
    useSidebar();

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "relative hidden shrink-0 border-l ds-border-gray ds-bg-card transition-[width] duration-200 md:block",
          collapsed ? "w-20" : "w-64",
        )}>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleCollapsed}
          aria-label="Toggle sidebar"
          className="absolute -start-3 top-8 z-10 !rounded-full !p-0 h-6 w-6">
          {collapsed ? (
            <MdChevronLeft size={16} />
          ) : (
            <MdChevronRight size={16} />
          )}
        </Button>
        <SidebarContent collapsed={collapsed} />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeMobile}
          />
          <aside className="absolute inset-y-0 end-0 w-64 ds-bg-card shadow-xl">
            <SidebarContent collapsed={false} />
          </aside>
        </div>
      )}
    </>
  );
}
