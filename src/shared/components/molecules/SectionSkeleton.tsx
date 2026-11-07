import { cn } from "@/lib/cn";
import Skeleton from "../atoms/Skeleton";

interface SectionSkeletonProps {
  fields?: number;
  columns?: 2 | 3;
}

export default function SectionSkeleton({
  fields = 6,
  columns = 3,
}: SectionSkeletonProps) {
  return (
    <div aria-hidden="true" className="ds-bg-card rounded-xl p-6">
      <Skeleton className="mb-6 h-7 w-40" />
      <div
        className={cn(
          "grid grid-cols-1 gap-6",
          columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2",
        )}>
        {Array.from({ length: fields }, (_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-36" />
          </div>
        ))}
      </div>
    </div>
  );
}
