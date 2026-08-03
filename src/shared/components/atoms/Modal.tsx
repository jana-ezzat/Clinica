"use client";

import { ComponentType } from "react";
import { IoCheckmarkCircleOutline } from "@/assets/icons/icons";

interface Props {
  show: boolean;
  title: string;
  message: string;
  onClose?: () => void;
  icon?: ComponentType<{ size?: number | string; className?: string }>;
}

export default function Modal({
  show,
  title,
  message,
  onClose,
  icon: Icon = IoCheckmarkCircleOutline,
}: Props) {
  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6 transition-opacity duration-300 ${
        show
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`w-full max-w-[320px] rounded-2xl  ds-bg px-6 py-8 text-center shadow-2xl transition-transform duration-300 ${
          show ? "scale-100" : "scale-90"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <Icon size={48} className="mx-auto mb-4 text-green-600" />
        <p className="mb-1.5 text-base font-semibold text-ds-text">{title}</p>
        <p className="text-sm text-ds-text-secondary">{message}</p>
      </div>
    </div>
  );
}
