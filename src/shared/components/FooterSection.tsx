import React from "react";
import { useTranslations } from "next-intl";
import Title from "./atoms/Title";
import FooterColumn from "@/modules/landing/components/atoms/FooterColumn";
import Text from "./atoms/Text";
import SocialLinks from "@/modules/landing/components/molecules/SocialLinks";

interface FooterColumnData {
  heading: string;
  links: { label: string; href: string }[];
}

export default function FooterSection() {
  const t = useTranslations("footer");
  const columns = t.raw("columns") as FooterColumnData[];

  return (
    <div className="ds-bg-footer ds-footer-text ds-shadow px-6 py-12" dir="rtl">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="md:max-w-xs">
            <Title variant="footerText" size="lg" className="font-bold">
              {t("brand")}
            </Title>
            <Text
              size="sm"
              variant="footerText"
              className="mt-3 leading-relaxed opacity-80">
              {t("tagline")}
            </Text>
          </div>

          {/* Columns */}
          <div className="flex flex-1 flex-wrap justify-between gap-8 md:justify-end md:gap-16">
            {columns.map((column) => (
              <FooterColumn
                key={column.heading}
                heading={column.heading}
                links={column.links}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/15" />

        <div className="flex flex-col-reverse items-center gap-4 md:flex-row md:justify-between">
          <Text className="text-xs opacity-70" variant="footerText">{t("copyright")}</Text>
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}
