import PatientTable from "@/modules/dashboard/patients/components/organisms/PatientTable";
import Title from "@/shared/components/atoms/Title";
import { useTranslations } from "next-intl";

export default function PatientsPage() {
  const t = useTranslations("patients");

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <Title className="ds-text text-xl font-bold">{t("pageTitle")}</Title>
      </div>

      <PatientTable />
    </div>
  );
}
