"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdChevronLeft, MdChevronRight, MdLogout } from "react-icons/md";
import Logo from "@/shared/components/atoms/Logo";
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
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                collapsed && "justify-center",
                isActive
                  ? "ds-text-button-primary"
                  : "ds-text hover:opacity-70",
              )}>
              <Icon size={22} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t ds-border-gray px-3 py-4">
        <button
          type="button"
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 hover:opacity-70",
            collapsed && "justify-center",
          )}>
          <MdLogout size={22} className="shrink-0" />
          {!collapsed && <span>تسجيل الخروج</span>}
        </button>
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
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-label="Toggle sidebar"
          className="absolute -start-3 top-8 z-10 flex h-6 w-6 items-center justify-center rounded-full ds-bg-card ds-border-gray border shadow">
          {collapsed ? (
            <MdChevronLeft size={16} />
          ) : (
            <MdChevronRight size={16} />
          )}
        </button>
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
