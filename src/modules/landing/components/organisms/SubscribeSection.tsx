import Button from "@/shared/components/atoms/Button";
import EmailInput from "@/shared/components/atoms/EmailInput";
import Heading from "@/shared/components/atoms/Heading";
import { getTranslations } from "next-intl/server";
import React from "react";

export default async function SubscribeSection() {
  const t = await getTranslations("stayUpdated");

  return (
    <section id="subscribe" className="ds-bg px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <Heading title={t("heading")} subtitle={t("subheading")} />
        <div className="mt-12 flex justify-center items-center gap-2">
          <div className="flex-1">
            <EmailInput
              type="email"
              placeholder={t("placeholder")}
            />
          </div>
          <Button variant="primary">{t("cta")}</Button>
        </div>
      </div>
    </section>
  );
}
