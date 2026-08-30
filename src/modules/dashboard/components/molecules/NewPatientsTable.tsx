import { MdChevronLeft } from "react-icons/md";
import { useTranslations } from "next-intl";
import Title from "@/shared/components/atoms/Title";
import Text from "@/shared/components/atoms/Text";
import Button from "@/shared/components/atoms/Button";
import type { NewPatient } from "../../lib/mockData";

type Props = {
  patients: NewPatient[];
};

export default function NewPatientsTable({ patients }: Props) {
  const t = useTranslations("dashboard.home.newPatients");

  return (
    <div className="rounded-xl border ds-border-gray ds-bg-card p-5 ds-shadow-sm">
      <div className="mb-1 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="!gap-1 !p-0 !text-sm ds-text-secondary hover:opacity-70">
          <MdChevronLeft size={16} />
          {t("viewAll")}
        </Button>
        <Title size="sm" className="p-0! font-bold">
          {t("title")}
        </Title>
      </div>
      <Text size="sm" className="mb-4 p-0! text-end">
        {t("subtitle")}
      </Text>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="ds-bg-button-primary text-white">
              <th className="rounded-e-lg px-4 py-3 text-start font-medium">
                {t("columns.patient")}
              </th>
              <th className="px-4 py-3 text-start font-medium">
                {t("columns.age")}
              </th>
              <th className="px-4 py-3 text-start font-medium">
                {t("columns.symptoms")}
              </th>
              <th className="rounded-s-lg px-4 py-3 text-start font-medium">
                {t("columns.date")}
              </th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="border-b ds-border-gray">
                <td className="px-4 py-3 ds-text">{patient.name}</td>
                <td className="px-4 py-3 ds-text-secondary">
                  {patient.age} {t("ageUnit")}
                </td>
                <td className="px-4 py-3 ds-text-secondary">
                  {patient.symptoms}
                </td>
                <td className="px-4 py-3 ds-text-secondary">
                  {patient.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
