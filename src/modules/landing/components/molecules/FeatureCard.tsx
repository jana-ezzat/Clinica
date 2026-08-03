import React from "react";
import Card from "./Card";
import Title from "@/shared/components/atoms/Title";
import Text from "@/shared/components/atoms/Text";

export default function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="flex flex-col items-center text-center gap-3">
      <div className="ds-bg-icon rounded-lg p-3 flex items-center justify-center">
        {icon}
      </div>
      <Title size="md" className="font-semibold">
        {title}
      </Title>
      <Text size="sm" variant="secondary" center>
        {description}
      </Text>
    </Card>
  );
}
