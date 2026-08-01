import { getTranslations } from "next-intl/server";

import { ThemeToggle } from "@/shared/components/ThemeButton";
import NavLink from "@/shared/components/atoms/navbar/NavLink";
import Button from "@/shared/components/atoms/Button";
import Logo from "@/shared/components/atoms/Logo";

const NAV_ITEMS = [
  { key: "features", href: "#features" },
  { key: "pricing", href: "#pricing" },
  { key: "reviews", href: "#reviews" },
  { key: "faq", href: "#faq" },
] as const;

export default async function Header() {
  const t = await getTranslations("nav");

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

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <NavLink href="/sign-in">{t("login")}</NavLink>
          <Button tag="link" href="/sign-up" size="sm">
            {t("cta")}
          </Button>
        </div>
      </div>
    </header>
  );
}
