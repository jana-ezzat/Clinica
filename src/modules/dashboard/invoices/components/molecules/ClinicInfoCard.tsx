import Title from "@/shared/components/atoms/Title";
import Text from "@/shared/components/atoms/Text";

interface Props {
  logoText: string;
  doctorName: string;
  taxNumberLabel: string;
  taxNumber: string;
  mainBranchLabel: string;
  address: string;
  phone: string;
  email: string;
}

export default function ClinicInfoCard({
  logoText,
  doctorName,
  taxNumberLabel,
  taxNumber,
  mainBranchLabel,
  address,
  phone,
  email,
}: Props) {
  return (
    <div className="ds-bg-primary rounded-xl p-6 flex   items-start justify-between gap-4">
      <div className="flex flex-col gap-7 ">
        <Text size="lg" className="text-white ">
          {doctorName}
        </Text>
        <div>
          <Text  className="text-white/80 text-xs">
            {taxNumberLabel}: {taxNumber}
          </Text>
          <Text size="sm" className="text-white">
            {mainBranchLabel}
          </Text>
        </div>
        <Text size="sm" className="text-white">
          {address}
        </Text>
        <Text size="sm" className="text-white">
          {phone}
        </Text>
        <Text size="sm" className="text-white">
          {email}
        </Text>
      </div>

      <Title size="lg" className="text-white font-bold mt-4">
        {logoText}
      </Title>
    </div>
  );
}
