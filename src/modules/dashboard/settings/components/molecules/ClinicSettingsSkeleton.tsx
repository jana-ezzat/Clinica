import Skeleton from "@/shared/components/atoms/Skeleton";
import SettingsFieldSkeleton from "../molecules/SettingsFieldSkeleton";

export default function ClinicSettingsSkeleton() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <Skeleton className="h-7 w-48" />

      <div className="border border-gray-100 shadow-md rounded-xl p-5 flex flex-col gap-4">
        <Skeleton className="h-4 w-32" />
        <SettingsFieldSkeleton />
        <SettingsFieldSkeleton />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-11 w-40" />
        </div>
        <SettingsFieldSkeleton />
      </div>

      <div className="border border-gray-100 rounded-xl p-5 flex flex-col gap-4">
        <Skeleton className="h-4 w-24" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-16 rounded-lg" />
          ))}
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-11 flex-1" />
          <Skeleton className="h-11 flex-1" />
        </div>
      </div>

      <div className="border border-gray-100 rounded-xl p-5 flex flex-col gap-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-11 w-40" />
      </div>

      <div className="border border-gray-100 rounded-xl p-5 flex flex-col gap-4">
        <SettingsFieldSkeleton />
        <SettingsFieldSkeleton />
        <SettingsFieldSkeleton />
      </div>

      <div className="flex items-center justify-end gap-4">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-11 w-32" />
      </div>
    </div>
  );
}
