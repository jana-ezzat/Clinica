import Badge from "@/shared/components/atoms/Badge";
import Button from "@/shared/components/atoms/Button";
import Title from "@/shared/components/atoms/Title";
import Text from "@/shared/components/atoms/Text";
import { getTranslations } from "next-intl/server";

export default async function HeroSection() {
  const t = await getTranslations("hero");

  return (
    <section className="ds-bg px-6 py-20 md:py-28 text-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
        <Badge>{t("badge")}</Badge>

        <Title size="xxl" center>
          <span className="block">{t("titleLine1")}</span>
          <span className="block">{t("titleLine2")}</span>
        </Title>

        <Text size="lg" variant="secondary" center className="max-w-xl">
          {t("subtitle")}
        </Text>

        <Button tag="link" href="/sign-up" size="lg">
          {t("cta")}
        </Button>

        <Text size="sm" variant="secondary" center>
          {t("disclaimer")}
        </Text>
      </div>
    </section>
  );
}
