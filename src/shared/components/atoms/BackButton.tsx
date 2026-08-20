"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      aria-label="back"
      className="ds-text-primary flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-black/5 cursor-pointer">
      <ChevronLeft size={26} />
    </button>
  );
}
