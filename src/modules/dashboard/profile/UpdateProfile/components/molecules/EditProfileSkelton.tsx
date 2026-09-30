import Skeleton from "@/shared/components/atoms/Skeleton";

export default function EditProfileSkelton() {
  return (
    <div className="w-full p-6">
      <Skeleton className="mb-6 h-7 w-40" />

      {/* Personal Data Card */}
      <div className="ds-bg-card ds-shadow-sm mb-6 rounded-xl p-6">
        <div className="mb-6 border-b pb-4 dark:border-gray-50">
          <Skeleton className="h-5 w-32" />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex justify-center">
            <Skeleton className="h-25 w-25 rounded-full" />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-11 w-full rounded-lg" />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-11 w-full rounded-lg" />
          </div>
        </div>
      </div>

      {/* Certificates & Awards Card */}
      <div className="ds-bg-card ds-shadow-sm mb-6 rounded-xl p-6">
        {/* Card Title */}
        <div className="mb-6 border-b pb-4 dark:border-gray-50">
          <Skeleton className="h-5 w-44" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Certificate */}
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-24" />

            <Skeleton className="h-11 w-full rounded-lg" />

            <Skeleton className="h-11 w-full rounded-lg" />

            <Skeleton className="h-11 w-full rounded-lg" />
          </div>

          {/* Award */}
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-20" />

            <Skeleton className="h-11 w-full rounded-lg" />

            <Skeleton className="h-11 w-full rounded-lg" />

            <Skeleton className="h-11 w-full rounded-lg" />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Skeleton className="h-10 w-24 rounded-lg" />
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
    </div>
  );
}
