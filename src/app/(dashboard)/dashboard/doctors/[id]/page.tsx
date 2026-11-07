// src/app/(dashboard)/dashboard/doctors/[id]/page.tsx
"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

import StatusCard from "@/shared/components/atoms/StatusCard";
import DoctorProfileSkeleton from "@/shared/components/skeletons/DoctorProfileSkeleton";
import useDoctor from "@/modules/dashboard/doctors/hooks/useDoctor";

import DoctorProfileHeader from "@/modules/dashboard/doctors/components/organisms/DoctorProfileHeader";
import ExperienceSection from "@/modules/dashboard/doctors/components/organisms/ExperienceSection";
import PersonalDataSection from "@/modules/dashboard/doctors/components/organisms/PersonalDataSection";

export default function DoctorProfilePage() {
  const params = useParams<{ id: string }>();
  const t = useTranslations("doctorProfile");

  const { data: doctor, isLoading, isError, refetch } = useDoctor(params.id);

  if (isLoading) {
    return <DoctorProfileSkeleton />;
  }

  if (isError || !doctor) {
    return (
      <StatusCard
        description={t("notFound")}
        tone="error"
        actionLabel={t("retry")}
        onAction={() => refetch()}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <DoctorProfileHeader
        doctor={doctor}
        labels={{
          editProfile: t("editProfile"),
          addAppointment: t("addAppointment"),
          onlineNow: t("onlineNow"),
          offline: t("offline"),
        }}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PersonalDataSection
          doctor={doctor}
          title={t("personalData.title")}
          labels={{
            age: t("personalData.age"),
            gender: t("personalData.gender"),
            phone: t("personalData.phone"),
            email: t("personalData.email"),
            clinicAddress: t("personalData.clinicAddress"),
            workingHours: t("personalData.workingHours"),
          }}
          genderLabel={
            doctor.gender === "male" || doctor.gender === "female"
              ? t(`gender.${doctor.gender}`)
              : t("gender.unspecified")
          }
        />

        <ExperienceSection
          doctor={doctor}
          title={t("experience.title")}
          labels={{
            experienceYears: t("experience.yearsOfExperience"),
            certificates: t("experience.certificates"),
            awards: t("experience.awards"),
          }}
        />
      </div>
    </div>
  );
}