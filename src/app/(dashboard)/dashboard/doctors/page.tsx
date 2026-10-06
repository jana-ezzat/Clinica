// src/app/(dashboard)/dashboard/doctors/page.tsx

import DoctorTable from "@/modules/dashboard/doctors/components/organisms/DoctorTable";
import Title from "@/shared/components/atoms/Title";
import { useTranslations } from "next-intl";


const page = () => {
  const t = useTranslations("doctorsList");

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <Title className="ds-text text-xl font-bold">{t("title")}</Title>
      </div>

      <DoctorTable />
    </div>
  );
}

export default page