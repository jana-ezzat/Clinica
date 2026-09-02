"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Title from "@/shared/components/atoms/Title";
import Button from "@/shared/components/atoms/Button";
import ModalAppointment from "@/shared/components/organisms/ModalAppointment";

export default function AppointmentsHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("appointments");
  const tModal = useTranslations("appointmentsModal.addAppointment");

  return (
    <div className="flex items-center justify-between">
      <Title size="md" className="font-bold">
        {t("pageTitle")}
      </Title>
      <Button variant="primary" onClick={() => setIsModalOpen(true)}>
        {`+ ${tModal("title")}`}
      </Button>
      <ModalAppointment
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
