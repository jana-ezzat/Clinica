"use client";

import {
  MdMenu,
  MdSearch,
  MdOutlineFilterList,
  MdNotificationsNone,
} from "react-icons/md";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/atoms/Button";
import Input from "@/shared/components/atoms/Input";
import { ThemeToggle } from "@/shared/components/ThemeButton";
import { useSidebar } from "../../context/SidebarContext";
import ProfileDropdown from "../molecules/ProfileDropdown";
import { useAuth } from "@/shared/hooks/useAuth";
import SignInButton from "../molecules/SignInButton";

export default function Header() {
  const { openMobile } = useSidebar();
  const t = useTranslations("dashboard.header");
  const { isAuthenticated } = useAuth();

  return (
    <header className="flex justify-between items-center border-b ds-border-gray ds-bg px-4 py-4 sm:px-6">
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={openMobile}
          aria-label="Open menu"
          className="!p-0 md:hidden"
        >
          <MdMenu size={26} />
        </Button>

        <Input
          type="text"
          placeholder={t("searchPlaceholder")}
          icon={<MdSearch size={20} />}
          trailingIcon={<MdOutlineFilterList size={20} />}
          className="flex-1 !bg-[var(--ds-card-background)]"
        />
      </div>
      <div className="flex gap-4">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          className="!p-0"
        >
          <MdNotificationsNone size={24} />
        </Button>

        <ThemeToggle />

        {isAuthenticated ? <ProfileDropdown /> : <SignInButton />}
      </div>
    </header>
  );
}
