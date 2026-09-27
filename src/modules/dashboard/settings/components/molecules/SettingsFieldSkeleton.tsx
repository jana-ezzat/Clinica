import Skeleton from "@/shared/components/atoms/Skeleton";

export default function SettingsFieldSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-11 w-full" />
    </div>
  );
}