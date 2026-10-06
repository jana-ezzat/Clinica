import Skeleton from "@/shared/components/atoms/Skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="w-full rounded-2xl p-7">
      <div className="mb-6 flex items-start justify-between">
        <div className="flex items-center gap-3.5">
          <Skeleton className="h-14 w-14 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-9 w-32 rounded-lg" />
      </div>

      <div className="mb-3.5 flex flex-col gap-4 rounded-xl border p-5">
        <Skeleton className="h-4 w-32" />
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-28" />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border p-5">
        <Skeleton className="mb-3 h-4 w-32" />
        <Skeleton className="h-16 w-full" />
      </div>

      <div className="rounded-xl border p-5">
        <Skeleton className="mb-3 h-4 w-32" />
        <Skeleton className="h-16 w-full" />
      </div>
    </div>
  );
}
