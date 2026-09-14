import Text from "@/shared/components/atoms/Text";
import Title from "@/shared/components/atoms/Title";
interface Props {
  title: string;
  text: string;
}
const PatientTitle = ({ text, title }: Props) => {
  return (
    <div>
      <Title size="md" variant="primary" className="mb-4">
        {title}
      </Title>
      <Text size="sm" className="text-gray-400">
        {text}
      </Text>
    </div>
  );
};

export default PatientTitle;
