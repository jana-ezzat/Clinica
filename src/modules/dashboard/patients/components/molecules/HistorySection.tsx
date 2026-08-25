import Title from "@/shared/components/atoms/Title";
import InfoBox from "./InfoBox";

interface Props {
  title: string;
  medicalHistoryLabel: string;
  medicalHistory: string;
  familyHistoryLabel: string;
  familyHistory: string;
}

export default function HistorySection({
  title,
  medicalHistoryLabel,
  medicalHistory,
  familyHistoryLabel,
  familyHistory,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <Title size="md" className="text-xl sm:text-3xl md:text-4xl">
        {title}
      </Title>
      <div className="flex flex-col gap-3">
        <InfoBox label={medicalHistoryLabel} tone="gray">
          {medicalHistory}
        </InfoBox>
        <InfoBox label={familyHistoryLabel} tone="gray">
          {familyHistory}
        </InfoBox>
      </div>
    </div>
  );
}
