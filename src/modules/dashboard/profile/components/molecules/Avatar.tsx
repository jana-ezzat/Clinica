import Image from "next/image";
import { User } from "lucide-react";

interface Props {
  src?: string | null;
  name: string;
  className?: string;
}

export default function Avatar({ src, name, className = "" }: Props) {
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
    <Image
      src={cleanSrc}
      alt={name}
      width={128}
      height={128}
      className={`rounded-full object-cover ${className}`}
    />
  );
}
