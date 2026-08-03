"use client";

import { cn } from "@/lib/cn";
import Text from "@/shared/components/atoms/Text";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
export default function AccordionItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="ds-bg-card ds-border ds-border-gray rounded-lg p-4">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-4 px-6 cursor-pointer text-right"
        aria-expanded={isOpen}>
        <Text size="md" className="font-medium">
          {question}
        </Text>
        <ChevronDown
          size={20}
          className={cn(
            "ds-text-secondary shrink-0 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div className="px-6 pt-3 pb-2">
          <Text size="sm" variant="secondary">
            {answer}
          </Text>
        </div>
      )}
    </div>
  );
}
