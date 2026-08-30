"use client";
import Text from "@/shared/components/atoms/Text";
import { BadgeCheck } from "@/assets/icons/icons";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export default function SuccessModal({ isOpen, onClose, message }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 ds-bg z-[100] flex flex-col items-center justify-center gap-3">
      <BadgeCheck
        size={56}
        className="text-white fill-blue-600"
        strokeWidth={1.5}
      />
      <Text size="sm" variant="secondary">
        {message}
      </Text>
    </div>
  );
}
