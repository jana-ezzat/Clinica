import ProfileSectionCard from "../molecules/ProfileSectionCard";
import CredentialCard from "../molecules/CredentialCard";
import DataField from "@/shared/components/atoms/DataField";
import Text from "@/shared/components/atoms/Text";
import type { DoctorProfile } from "../../types/doctor";

interface ExperienceSectionProps {
  doctor: DoctorProfile;
  title: string;
  labels: {
    yearsOfExperience: string;
    certificates: string;
    awards: string;
  };
}

export default function ExperienceSection({
  doctor,
  title,
  labels,
}: ExperienceSectionProps) {
  return (
    <ProfileSectionCard title={title}>
      <div className="flex flex-col gap-6">
        <DataField
          label={labels.yearsOfExperience}
          value={String(doctor.yearsOfExperience)}
        />

        <Text size="sm" className="ds-text leading-relaxed">
          {doctor.bio}
        </Text>

        {doctor.certificates.length > 0 && (
          <div>
            <Text size="sm" variant="accent" className="mb-3 font-bold">
              {labels.certificates}
            </Text>
            <div className="flex flex-wrap gap-6">
              {doctor.certificates.map((cert) => (
                <CredentialCard key={cert.id} credential={cert} />
              ))}
            </div>
          </div>
        )}

        {doctor.awards.length > 0 && (
          <div>
            <Text size="sm" variant="accent" className="mb-3 font-bold">
              {labels.awards}
            </Text>
            <div className="flex flex-wrap gap-6">
              {doctor.awards.map((award) => (
                <CredentialCard key={award.id} credential={award} />
              ))}
            </div>
          </div>
        )}
      </div>
    </ProfileSectionCard>
  );
}
