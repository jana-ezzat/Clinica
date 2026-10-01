import Skeleton from "@/shared/components/atoms/Skeleton";

export default function ProfileSkeleton() {
  return (
    <div className=" rounded-2xl p-7  w-full">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3.5">
          <Skeleton className="w-14 h-14 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-9 w-32 rounded-lg" />
      </div>

      <div className=" border rounded-xl p-5 mb-3.5 flex flex-col gap-4">
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

      <div className="border rounded-xl p-5">
        <Skeleton className="h-4 w-32 mb-3" />
        <Skeleton className="h-16 w-full" />
      </div>

      <div className="border rounded-xl p-5">
        <Skeleton className="h-4 w-32 mb-3" />
        <Skeleton className="h-16 w-full" />
      </div>
    </div>
  );
}
