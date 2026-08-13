"use client";
import React from "react";
import { useTranslations } from "next-intl";
import usePatients from "../../hooks/usePatients";
import StatusCard from "../atoms/StatusCard";
import TableHeader from "../molecules/TableHeader";
import TableRow from "../molecules/TableRow";


export default function PatientTable() {
  const t = useTranslations("patients");
  const { data: patients, isLoading, isError, refetch } = usePatients();

  const typeLabels = {
    new: t("type.new"),
    returning: t("type.returning"),
  };

  const columnLabels = {
    name: t("columns.name"),
    type: t("columns.type"),
    nationality: t("columns.nationality"),
    phone: t("columns.phone"),
    email: t("columns.email"),
  };

  if (isLoading) {
    return <StatusCard description={t("loading")} />;
  }

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

  if (!patients || patients.length === 0) {
    return (
      <StatusCard title={t("emptyTitle")} description={t("emptyDescription")} />
    );
  }

  return (
    <div className="ds-bg-card ds-shadow-sm overflow-hidden rounded-[18px]">
      <table className="w-full text-right">
        <TableHeader labels={columnLabels} />
        <tbody>
          {patients.map((patient) => (
            <TableRow
              key={patient.id}
              patient={patient}
              typeLabels={typeLabels}
              emptyValueLabel={t("noEmail")}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
