import Text from "@/shared/components/atoms/Text";
import type { DoctorCredential } from "../../types/doctor";

export default function CredentialCard({
  credential,
}: {
  credential: DoctorCredential;
}) {
  return (
    <div className="flex flex-col gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={credential.image}
        alt={credential.title}
        className="h-48 w-full rounded-lg object-cover sm:w-72"
      />
      <div>
        <Text size="sm" variant="primary" className="font-bold">
          {credential.title}
        </Text>
        <Text size="sm" className="ds-text-secondary">
          {credential.subtitle}
        </Text>
      </div>
    </div>
  );
}
