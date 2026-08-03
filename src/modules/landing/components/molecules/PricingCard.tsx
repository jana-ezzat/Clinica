import Card from "./Card";

import { BadgeCheck } from "@/assets/icons/icons";
import { cn } from "@/lib/cn";
import Button from "@/shared/components/atoms/Button";
import PopularBadge from "@/shared/components/atoms/PopularBadge";
import Text from "@/shared/components/atoms/Text";
import Title from "@/shared/components/atoms/Title";

export default function PricingCard({
  name,
  price,
  currency,
  features,
  popular,
  popularLabel,
  cta,
}: {
  name: string;
  price: string;
  currency: string;
  features: string[];
  popular: boolean;
  popularLabel: string;
  cta: string;
}) {
  return (
    <Card
      className={cn(
        "relative flex flex-col h-full gap-6 text-center",
        popular ? "border-2 ds-border-primary" : "ds-border-secondary",
      )}>
      {popular && <PopularBadge>{popularLabel}</PopularBadge>}

      <Title size="lg" center>
        {name}
      </Title>

      <div className="flex items-baseline justify-center gap-2">
        <Text size="sm" variant="secondary">
          {currency}
        </Text>
        <span className="text-4xl font-bold ds-text">{price}</span>
      </div>

      <ul className="flex flex-col gap-3 text-right flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <BadgeCheck size={18} className="ds-text-primary shrink-0" />
            <Text size="sm" variant="secondary">
              {feature}
            </Text>
          </li>
        ))}
      </ul>

      <Button variant={popular ? "primary" : "outline"} fullWidth>
        {cta}
      </Button>
    </Card>
  );
}
