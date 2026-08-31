"use client";
import { useState } from "react";
import Button from "@/shared/components/atoms/Button";
import WelcomeBanner from "../molecules/WelcomeBanner";
import ModalAppointment from "@/shared/components/organisms/ModalAppointment";

interface Props {
  doctorName: string;
  addAppointmentLabel: string;
}

export default function DashboardHeader({
  doctorName,
  addAppointmentLabel,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <Button
        variant="primary"
        className="shrink-0"
        onClick={() => setIsModalOpen(true)}>
        {addAppointmentLabel}
      </Button>
      <WelcomeBanner doctorName={doctorName} />
      <ModalAppointment
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
