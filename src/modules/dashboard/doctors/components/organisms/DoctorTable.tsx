// src/modules/dashboard/doctors/components/organisms/DoctorTable.tsx
"use client";

import { useTranslations } from "next-intl";
import useDoctors from "../../hooks/useDoctors";
import StatusCard from "@/shared/components/atoms/StatusCard";
import TableCard from "@/shared/components/molecules/TableCard";
import TableHeaderRow from "@/shared/components/molecules/TableHeaderRow";
import TableRow from "../molecules/TableRow";
import TableSkeleton from "@/shared/components/skeletons/TableSkeleton";

export default function DoctorTable() {
    const t = useTranslations("doctorsList");
    const { data: doctors, isLoading, isError, refetch } = useDoctors();

    const columnLabels = {
        name: t("columns.name"),
        specialty: t("columns.specialty"),
        experience: t("columns.experience"),
        phone: t("columns.phone"),
        email: t("columns.email"),
    };

    if (isError) {
        return (
            <StatusCard
                description={t("loadError")}
                tone="error"
                actionLabel={t("retry")}
                onAction={() => refetch()}
            />
        );
    }

    if (!isLoading && (!doctors || doctors.length === 0)) {
        return (
            <StatusCard
                title={t("emptyTitle")}
                description={t("emptyDescription")}
            />
        );
    }

    return (
        <TableCard className="ds-bg-card ds-shadow-sm overflow-hidden rounded-[18px]">
            <TableHeaderRow
                columns={[
                    columnLabels.name,
                    columnLabels.specialty,
                    columnLabels.experience,
                    columnLabels.phone,
                    columnLabels.email,
                ]}
            />

            <tbody>
                {isLoading ? (
                    <TableSkeleton columns={5} />
                ) : (
                    doctors?.map((doctor) => (
                        <TableRow key={doctor.id} doctor={doctor} />
                    ))
                )}
            </tbody>
        </TableCard>
    );
}