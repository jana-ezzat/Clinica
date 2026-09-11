import ProfileSectionCard from "../molecules/ProfileSectionCard";
import DataField from "@/shared/components/atoms/DataField";
import type { DoctorProfile } from "../../types/doctor";

interface PersonalDataSectionProps {
  doctor: DoctorProfile;
  title: string;
  labels: {
    age: string;
    gender: string;
    phone: string;
    email: string;
    clinicAddress: string;
    workHours: string;
  };
  genderLabel: string;
}

export default function PersonalDataSection({
  doctor,
  title,
  labels,
  genderLabel,
}: PersonalDataSectionProps) {
  return (
    <ProfileSectionCard title={title}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <DataField label={labels.age} value={String(doctor.age)} />
        <DataField label={labels.gender} value={genderLabel} />

        <DataField label={labels.email} value={doctor.email} />
        <DataField label={labels.phone} value={doctor.phone} />

        <DataField label={labels.workHours} value={doctor.workHours} />
        <DataField label={labels.clinicAddress} value={doctor.clinicAddress} />
      </div>
    </ProfileSectionCard>
  );
}
