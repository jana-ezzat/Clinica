import { cn } from "@/lib/cn";

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse rounded-md bg-current opacity-[0.08] motion-reduce:animate-none",
        className,
      )}
    />
  );
}
