import { useTranslations } from "next-intl";
import InfoBox from "../molecules/InfoBox";

interface Props {
  reason: string;
  vitals: {
    weight?: number;
    height?: number;
    pulse?: number;
    temperature?: number;
  };
  diagnosis?: string;
  treatment?: string;
  doctorNotes?: string;
  followUp: string;
}

const show = (value: string | number | undefined, suffix = "") =>
  value === undefined || value === "" ? "—" : `${value}${suffix}`;

export default function VisitDetailsSection({
  reason,
  vitals,
  diagnosis,
  treatment,
  doctorNotes,
  followUp,
}: Props) {
  const t = useTranslations("visitHistory");

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <InfoBox label={t("reason")} tone="gray">
          {reason}
        </InfoBox>

        <InfoBox label={t("vitals")} tone="gray">
          <div className="flex flex-col gap-1">
            <span>
              {t("weight")} : {show(vitals.weight, ` ${t("units.kg")}`)}
            </span>
            <span>
              {t("height")} : {show(vitals.height, ` ${t("units.cm")}`)}
            </span>
            <span>
              {t("pulse")} : {show(vitals.pulse)}
            </span>
            <span>
              {t("temperature")} : {show(vitals.temperature, "°")}
            </span>
          </div>
        </InfoBox>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <InfoBox label={t("diagnosis")} tone="orange">
          {show(diagnosis)}
        </InfoBox>
        <InfoBox label={t("prescription")} tone="cyan">
          {show(treatment)}
        </InfoBox>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <InfoBox label={t("doctorNotes")} tone="gray">
          {show(doctorNotes)}
        </InfoBox>
        <InfoBox label={t("followUp")} tone="purple">
          {followUp}
        </InfoBox>
      </div>
    </div>
  );
}
