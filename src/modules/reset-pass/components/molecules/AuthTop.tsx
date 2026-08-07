"use client";
import Title from "@/shared/components/atoms/Title";
import { ThemeToggle } from "@/shared/components/ThemeButton";
import { useTranslations } from "next-intl";

const AuthTop = () => {
  const t = useTranslations("forgetpassword.Logo");
  return (
    <div className="flex w-full justify-between px-4  sm:px-8">
      <div className="w-9" />

      <Title
        size="xxl"
        className="p-0 font-extrabold font-cairo ds-text-button-primary mt-10"
      >
        {t("alt")}
      </Title>
      <ThemeToggle />
    </div>
  );
};

export default AuthTop;
