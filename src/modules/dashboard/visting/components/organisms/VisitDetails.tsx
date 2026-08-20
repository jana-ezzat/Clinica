import { useTranslations } from "next-intl";
import InfoBox from "../molecules/InfoBox";

interface Props {
  reason: string;
  vitals: {
    weight: string;
    pressure: string;
    pulse: string;
    temperature: string;
  };
  examination: string;
  diagnosis: string;
  prescription: string;
  followUp: string;
  Doctornotes: string;
}

export default function VisitDetailsSection({
  reason,
  vitals,
  examination,
  diagnosis,
  prescription,
  followUp,
  Doctornotes,
}: Props) {
  const t = useTranslations("visitHistory");
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <InfoBox label={t("reason")} tone="gray">
          {reason}
        </InfoBox>

        <InfoBox label={t("vitals")} tone="gray">
          <div className="flex flex-col gap-1">
            <span>
              {t("weight")} : {vitals.weight}
            </span>
            <span>
              {t("pressure")}: {vitals.pressure}
            </span>
            <span>
              {t("pulse")} : {vitals.pulse}
            </span>
            <span>
              {t("temperature")} : {vitals.temperature}
            </span>
          </div>
        </InfoBox>
      </div>

      <InfoBox label={t("examination")} tone="green">
        {examination}
      </InfoBox>

      <div className="grid grid-cols-2 gap-6">
        <InfoBox label={t("diagnosis")} tone="orange">
          {diagnosis}
        </InfoBox>
        <InfoBox label={t("prescription")} tone="cyan">
          {prescription}
        </InfoBox>
      </div>
      <div className="grid grid-cols-2  gap-6">
        <InfoBox label={t("doctorNotes")} tone="gray">
          {Doctornotes}
        </InfoBox>
        <InfoBox label={t("followUp")} tone="purple">
          {followUp}
        </InfoBox>
      </div>
    </div>
  );
}
