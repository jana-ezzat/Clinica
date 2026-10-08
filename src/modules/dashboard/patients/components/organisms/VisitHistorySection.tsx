"use client";
import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import VisitMeta from "../molecules/VisitMeta";
import VisitDetailsSection from "./VisitDetails";
import VisitingHeader from "../molecules/VisitingHeader";
import VisitFormModal from "./VisitFormModal";
import StatusCard from "@/shared/components/atoms/StatusCard";
import useVisits, { type Visit } from "../../hooks/useVisits";

const formatDate = (
  iso: string | undefined,
  locale: string,
  withTime = false,
) => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat(`${locale}-u-nu-latn`, {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...(withTime ? { hour: "numeric", minute: "2-digit" } : {}),
  }).format(d);
};

interface Props {
  patientId: string;
}

const VisitHistorySection = ({ patientId }: Props) => {
  const t = useTranslations("visitHistory");
  const locale = useLocale();
  const { data: visits, isLoading, isError, refetch } = useVisits(patientId);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVisit, setEditingVisit] = useState<Visit | undefined>();

  const openAdd = () => {
    setEditingVisit(undefined);
    setIsFormOpen(true);
  };
  const openEdit = (visit: Visit) => {
    setEditingVisit(visit);
    setIsFormOpen(true);
  };
  const closeForm = () => {
    setIsFormOpen(false);
    setEditingVisit(undefined);
  };

  return (
    <div className="flex flex-col gap-5">
      <VisitingHeader
        title={t("Title")}
        btnTitle={t("btnTitle")}
        onClick={openAdd}
      />

      {isLoading && <StatusCard description={t("loading")} />}

      {isError && (
        <StatusCard
          description={t("loadError")}
          tone="error"
          actionLabel={t("retry")}
          onAction={() => refetch()}
        />
      )}

      {!isLoading && !isError && visits?.length === 0 && (
        <StatusCard description={t("empty")} />
      )}

      {visits?.map((visit, index) => (
        <div
          key={visit.id}
          className="flex flex-col gap-5 border-b pb-5 last:border-b-0">
          <VisitMeta
            visitNumber={`V-${String(visits.length - index).padStart(3, "0")}`}
            doctor={visit.doctorName}
            date={formatDate(visit.visitDate, locale, true)}
            onEdit={() => openEdit(visit)}
            editLabel={t("form.editTitle")}
          />
          <VisitDetailsSection
            reason={visit.reason}
            vitals={visit.vitals}
            diagnosis={visit.diagnosis}
            treatment={visit.treatment}
            doctorNotes={visit.doctorNotes}
            followUp={formatDate(visit.followUpDate, locale)}
          />
        </div>
      ))}

      {isFormOpen && (
        <VisitFormModal
          key={editingVisit?.id ?? "new"}
          patientId={patientId}
          visit={editingVisit}
          isOpen={isFormOpen}
          onClose={closeForm}
        />
      )}
    </div>
  );
};

export default VisitHistorySection;
