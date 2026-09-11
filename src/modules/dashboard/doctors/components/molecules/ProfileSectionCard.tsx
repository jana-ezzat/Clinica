import type { ReactNode } from "react";
import Title from "@/shared/components/atoms/Title";

interface ProfileSectionCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function ProfileSectionCard({
  title,
  children,
  className,
}: ProfileSectionCardProps) {
  return (
    <section className={`ds-bg-card ds-shadow-sm rounded-lg p-6 ${className ?? ""}`}>
      <Title size="sm" className="p-0! font-bold">
        {title}
      </Title>
      <div className="ds-border-gray mt-3 mb-6 border-t" />
      {children}
    </section>
  );
}
