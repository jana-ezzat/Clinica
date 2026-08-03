import Title from "@/shared/components/atoms/Title";
import Card from "./Card";
import StarRating from "@/shared/components/atoms/StarRating";
import Text from "@/shared/components/atoms/Text";


export default function TestimonialCard({
  name,
  role,
  quote,
  rating,
}: {
  name: string;
  role: string;
  quote: string;
  rating: number;
}) {
  return (
    <Card className="flex flex-col gap-3">
      <StarRating
       rating={rating} />
      <Title size="sm">
        {name}
      </Title>
      <Text size="sm" variant="secondary">
        {role}
      </Text>
      <Text size="sm" variant="secondary">
        {quote}
      </Text>
    </Card>
  );
}
