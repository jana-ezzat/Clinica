import Skeleton from "@/shared/components/atoms/Skeleton";

export default function UpdateDataSkeleton() {
  return (
    <div className="flex w-full flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-48 rounded-lg" />
        <Skeleton className="h-9 w-24 rounded-lg" />
      </div>

      <div className="ds-bg-card ds-shadow-sm flex w-full flex-col gap-6 rounded-xl p-6">
        <Skeleton className="h-52 w-full max-w-md rounded-xl" />

        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="h-11 w-full rounded-lg" />
        </div>

        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-11 w-full rounded-lg" />
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-100 px-5 py-4 dark:border-gray-700">
          <Skeleton className="h-10 w-20 rounded-lg" />
          <Skeleton className="h-10 w-28 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
