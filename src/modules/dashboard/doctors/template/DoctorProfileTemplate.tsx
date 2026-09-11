import { getTranslations } from "next-intl/server";
import DoctorProfileHeader from "../components/organisms/DoctorProfileHeader";
import PersonalDataSection from "../components/organisms/PersonalDataSection";
import ExperienceSection from "../components/organisms/ExperienceSection";
import DoctorReservationsTable from "../components/organisms/DoctorReservationsTable";
import type { DoctorProfile } from "../types/doctor";

interface DoctorProfileTemplateProps {
  doctor: DoctorProfile;
}

export default async function DoctorProfileTemplate({
  doctor,
}: DoctorProfileTemplateProps) {
  const t = await getTranslations("doctors.profile");
  const tCommon = await getTranslations("common");

  const genderLabel = t(`gender.${doctor.gender}`);

  return (
    <div className="flex flex-col gap-6 p-6">
      <DoctorProfileHeader
        doctor={doctor}
        labels={{
          editProfile: t("editProfile"),
          addAppointment: t("addAppointment"),
          onlineNow: t("onlineNow"),
          offline: t("offline"),
        }}
      />

      <PersonalDataSection
        doctor={doctor}
        title={t("personalData.title")}
        labels={{
          age: t("personalData.age"),
          gender: t("personalData.gender"),
          phone: t("personalData.phone"),
          email: t("personalData.email"),
          clinicAddress: t("personalData.clinicAddress"),
          workHours: t("personalData.workHours"),
        }}
        genderLabel={genderLabel}
      />

      <ExperienceSection
        doctor={doctor}
        title={t("experience.title")}
        labels={{
          yearsOfExperience: t("experience.yearsOfExperience"),
          certificates: t("experience.certificates"),
          awards: t("experience.awards"),
        }}
      />

      <DoctorReservationsTable
        title={t("reservations.title")}
        reservations={doctor.reservations}
        totalItems={doctor.reservationsTotal}
        columnLabels={{
          patient: t("reservations.columns.patient"),
          examType: t("reservations.columns.examType"),
          date: t("reservations.columns.date"),
          status: t("reservations.columns.status"),
        }}
        statusLabels={{
          confirmed: t("reservations.status.confirmed"),
          pending: t("reservations.status.pending"),
          cancelled: t("reservations.status.cancelled"),
        }}
        visitTypeLabels={{
          examination: t("reservations.visitTypes.examination"),
          consultation: t("reservations.visitTypes.consultation"),
          followUp: t("reservations.visitTypes.followUp"),
        }}
        emptyTitle={t("reservations.emptyTitle")}
        emptyDescription={t("reservations.emptyDescription")}
        ofLabel={tCommon("of")}
      />
    </div>
  );
}
