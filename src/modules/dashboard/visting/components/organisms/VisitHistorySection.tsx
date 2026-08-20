"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import VisitMeta from "../molecules/VisitMeta";
import VisitDetailsSection from "./VisitDetails";
import ModalAppointment from "./ModalAppointment";
import VisitingHeader from "../molecules/VisitingHeader";
import { visitHistoryData } from "@/modules/dashboard/lib/VisitHistoryData";

const VisitHistorySection = () => {
  const t = useTranslations("visitHistory");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <VisitingHeader
        title={t("Title")}
        btnTitle={t("btnTitle")}
        onClick={() => setIsModalOpen(true)}
      />

      <VisitMeta
        visitNumber={visitHistoryData.visitNumber}
        doctor={visitHistoryData.doctor}
        date={visitHistoryData.date}
      />

      <VisitDetailsSection
        reason={visitHistoryData.reason}
        vitals={visitHistoryData.vitals}
        examination={visitHistoryData.examination}
        diagnosis={visitHistoryData.diagnosis}
        prescription={visitHistoryData.prescription}
        followUp={visitHistoryData.followUp}
        Doctornotes={visitHistoryData.doctorNotes}
      />

      <ModalAppointment
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default VisitHistorySection;
