"use client";

import { useTranslations } from "next-intl";

import { ThemeToggle } from "@/shared/components/ThemeButton";
import NavLink from "@/shared/components/atoms/navbar/NavLink";
import Logo from "@/shared/components/atoms/Logo";
import { useAuth } from "@/shared/hooks/useAuth";
import ProfileDropdown from "@/modules/dashboard/components/molecules/ProfileDropdown";
import NavAuthActions from "@/shared/components/atoms/navbar/NavAuthActions";

const NAV_ITEMS = [
  { key: "features", href: "#features" },
  { key: "pricing", href: "#pricing" },
  { key: "reviews", href: "#reviews" },
  { key: "faq", href: "#faq" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const { isAuthenticated } = useAuth();

  return (
    <header className="ds-bg-card ds-shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.key} href={item.href}>
              {t(item.key)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <ThemeToggle />

          {isAuthenticated ? (
            <ProfileDropdown />
          ) : (
            <>
              <NavAuthActions loginLabel={t("login")} ctaLabel={t("cta")} />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
