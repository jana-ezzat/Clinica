import IconBox from "@/shared/components/atoms/IconBox";
import Text from "@/shared/components/atoms/Text";
import Title from "@/shared/components/atoms/Title";
import React, { ComponentType } from "react";

type FormHeaderProps = {
  title: string;
  description: string;
  icon?: ComponentType<{ size?: number; className?: string }>;
};
const FormHead = ({ title, description, icon: Icon }: FormHeaderProps) => {
  return (
    <div>
      {IconBox && Icon && (
        <IconBox icon={Icon} size="lg" className="mb-4" variant="primary" />
      )}
      <Title size="md" variant="" center className="mb-2 font-bold ">
        {title}
      </Title>
      <Text size="sm" variant="secondary" center className="max-w-xs md:max-w-sm mx-auto mb-3">
        {description}
      </Text>
    </div>
  );
};

export default FormHead;
