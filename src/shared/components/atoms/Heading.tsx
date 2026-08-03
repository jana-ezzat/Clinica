import Title from "../atoms/Title";
import Text from "../atoms/Text";

interface HeadingProps {
  title: React.ReactNode;
  subtitle?: string;
}

export default function Heading({ title, subtitle }: HeadingProps) {
  return (
    <div className="flex flex-col gap-y-4 mb-5 font-normal">
      <Title variant="primary" size="lg" center className="font-semibold">
        {title}
      </Title>
      {subtitle && (
        <Text size="md" variant="secondary" center>
          {subtitle}
        </Text>
      )}
    </div>
  );
}
