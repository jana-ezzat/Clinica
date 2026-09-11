import { getTranslations } from "next-intl/server";
import { getDoctorProfile } from "@/modules/dashboard/doctors/lib/mockData";
import DoctorProfileTemplate from "@/modules/dashboard/doctors/template/DoctorProfileTemplate";
import StatusCard from "@/shared/components/atoms/StatusCard";

interface DoctorProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function DoctorProfilePage({
  params,
}: DoctorProfilePageProps) {
  const { id } = await params;
  const doctor = await getDoctorProfile(id);
  const t = await getTranslations("doctors.profile");

  if (!doctor) {
    return <StatusCard description={t("notFound")} tone="error" />;
  }

  return <DoctorProfileTemplate doctor={doctor} />;
}
