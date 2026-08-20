"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "@/assets/icons/icons";
import { cn } from "@/lib/cn";
import Title from "@/shared/components/atoms/Title";

export default function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="ds-bg-card rounded-lg">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 cursor-pointer"
        aria-expanded={isOpen}>
        <Title
          size="md"
          variant="primary"
          className="ds-text-primary font-bold py-1">
          {title}
        </Title>
        <ChevronDown
          size={28}
          className={cn(
            "ds-text-primary shrink-0 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && <div className="px-6 pb-6">{children}</div>}
    </div>
  );
}
