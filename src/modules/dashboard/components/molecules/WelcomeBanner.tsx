// src/modules/dashboard/components/molecules/WelcomeBanner.tsx
import { GiStethoscope } from "react-icons/gi";
import { useTranslations } from "next-intl";
import Title from "@/shared/components/atoms/Title";
import Text from "@/shared/components/atoms/Text";

type Props = {
  doctorName: string;
};

export default function WelcomeBanner({ doctorName }: Props) {
  const t = useTranslations("dashboard.home");

  return (
    <div
      className="relative flex flex-1 items-center overflow-hidden rounded-xl px-6 py-6"
      style={{
        background:
          "linear-gradient(90deg, var(--ds-button-primary) 0%, color-mix(in srgb, var(--ds-button-primary) 40%, var(--ds-card-background)) 100%)",
      }}>
      <GiStethoscope
        size={90}
        className="absolute end-6 top-1/2 -translate-y-1/2 text-white/25"
      />
      <div className="relative w-full text-start">
        <Title size="sm" className="!p-0 !text-white font-bold">
          {t("welcome", { name: doctorName })}
        </Title>
        <Text size="sm" className="mt-1 !p-0 !text-white/80">
          {t("summary")}
        </Text>
      </div>
    </div>
  );
}
