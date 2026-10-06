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
    <>
      <div className="flex flex-col gap-10 sm:flex-row sm:items-center">
        <WelcomeBanner doctorName={doctorName} />
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          {addAppointmentLabel}
        </Button>
        <ModalAppointment
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </>
  );
}
