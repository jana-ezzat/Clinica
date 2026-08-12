"use client";

import {
  MdMenu,
  MdSearch,
  MdOutlineFilterList,
  MdNotificationsNone,
  MdPerson,
} from "react-icons/md";
import { ThemeToggle } from "@/shared/components/ThemeButton";
import { useSidebar } from "../../context/SidebarContext";

export default function Header() {
  const { openMobile } = useSidebar();

  return (
    <header className="flex items-center gap-4 border-b ds-border-gray ds-bg px-4 py-4 sm:px-6">
      <button
        type="button"
        onClick={openMobile}
        aria-label="Open menu"
        className="ds-text md:hidden">
        <MdMenu size={26} />
      </button>

      <div className="flex flex-1 items-center rounded-lg ds-bg-card px-3 py-2">
        <MdSearch size={20} className="ds-text-secondary" />
        <input
          type="text"
          placeholder="بحث...."
          className="ds-text flex-1 bg-transparent px-2 text-sm outline-none placeholder:ds-text-secondary"
        />
        <MdOutlineFilterList size={20} className="ds-text-secondary" />
      </div>

      <button
        type="button"
        aria-label="Notifications"
        className="ds-text hover:opacity-70">
        <MdNotificationsNone size={24} />
      </button>

      <ThemeToggle />

      <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full ds-bg-icon">
        <MdPerson size={20} className="ds-text-primary" />
      </div>
    </header>
  );
}
