"use client";

import { useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";

interface Props {
  src?: string | null;
  name: string;
  className?: string;
}

export default function FadeProfileImage({ src, name, className = "" }: Props) {
  const [loaded, setLoaded] = useState(false);

  const cleanSrc = typeof src === "string" ? src.trim() : "";

  if (!cleanSrc) {
    return (
      <div
        role="img"
        aria-label={name}
        className={`flex items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300 ${className}`}
      >
        <User size="50%" strokeWidth={1.75} />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-full ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700" />
      )}
      <Image
        src={cleanSrc}
        alt={name}
        width={128}
        height={128}
        priority
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
