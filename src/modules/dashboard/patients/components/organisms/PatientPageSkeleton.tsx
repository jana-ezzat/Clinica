"use client";
import { useTranslations } from "next-intl";
import Skeleton from "@/shared/components/atoms/Skeleton";
import SectionSkeleton from "@/shared/components/molecules/SectionSkeleton";

export default function PatientPageSkeleton() {
  const t = useTranslations("common");

  return (
    <div role="status" aria-busy="true" className="flex flex-col gap-6 p-6">
      <span className="sr-only">{t("loading")}</span>

      <div className="flex flex-col gap-5 p-5">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton className="h-9 w-32" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
        <div className="flex gap-8">
          {Array.from({ length: 5 }, (_, i) => (
            <Skeleton key={i} className="h-7 w-24" />
          ))}
        </div>
      </div>

      <SectionSkeleton fields={9} />
      <SectionSkeleton fields={7} />
      <SectionSkeleton fields={3} />
      <SectionSkeleton fields={4} columns={2} />
    </div>
  );
}
