import Skeleton from "@/shared/components/atoms/Skeleton";

export default function DoctorProfileSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col-reverse items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-72">
          <Skeleton className="h-11 w-full rounded-lg" />
          <Skeleton className="h-11 w-full rounded-lg" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, sectionIndex) => (
          <div
            key={sectionIndex}
            className="ds-bg-card ds-shadow-sm h-fit rounded-lg p-6"
          >
            <Skeleton className="h-5 w-36" />
            <div className="ds-border-gray mt-3 mb-6 border-t" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, fieldIndex) => (
                <div key={fieldIndex} className="flex flex-col gap-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-28" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
