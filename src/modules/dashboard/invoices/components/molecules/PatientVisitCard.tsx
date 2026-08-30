import Text from "@/shared/components/atoms/Text";

interface Props {
  name: string;
  fileNumber: string;
  phone: string;
  visitDate: string;
  doctorName: string;
  fileNumberLabel: string;
  phoneLabel: string;
  visitDateLabel: string;
}

const PatientVisitCard = ({
  name,
  fileNumber,
  phone,
  visitDate,
  doctorName,
  fileNumberLabel,
  phoneLabel,
  visitDateLabel,
}: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="px-5 py-4">
        <div className="flex flex-col gap-2 text-start">
          <Text size="lg" variant="primary">
            {name}
          </Text>

          <Text size="sm" variant="secondary">
            {fileNumberLabel}: {fileNumber}
          </Text>

          <Text size="sm" variant="secondary">
            {phoneLabel}: {phone}
          </Text>

          <Text size="sm" variant="secondary">
            {visitDateLabel}: {visitDate}
          </Text>
        </div>
      </div>

      <div className="flex items-center  px-5 py-4">
        <Text size="md" variant="primary">
          {doctorName}
        </Text>
      </div>
    </div>
  );
};

export default PatientVisitCard;
