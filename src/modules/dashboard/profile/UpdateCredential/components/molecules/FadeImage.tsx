"use client";
import { useState } from "react";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export default function FadeImage({ src, alt, className = "" }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        loading="eager"
        onLoad={() => setLoaded(true)}
        className={`object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
      />
    </>
  );
}
