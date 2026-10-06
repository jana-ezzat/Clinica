// src/modules/dashboard/doctors/components/organisms/DoctorProfileHeader.tsx
"use client";

import { useState } from "react";
import { Pencil, FaPlus } from "@/assets/icons/icons";
import Button from "@/shared/components/atoms/Button";
import Title from "@/shared/components/atoms/Title";
import Text from "@/shared/components/atoms/Text";
import type { DoctorProfile } from "../../types/doctor";
import EditDoctorDialog from "./EditDoctorDialog";
import Image from "next/image";

interface DoctorProfileHeaderProps {
  doctor: DoctorProfile;
  labels: {
    editProfile: string;
    addAppointment: string;
    onlineNow: string;
    offline: string;
  };
}

export default function DoctorProfileHeader({
  doctor,
  labels,
}: DoctorProfileHeaderProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="flex flex-col-reverse items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        {doctor.image ? (
          <Image
            key={doctor.image}
            width={64}
            height={64}
            src={doctor.image}
            alt={doctor.name}
            className="h-16 w-16 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="bg-muted flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-lg font-medium">
            {doctor.name.trim().charAt(0).toUpperCase() || "?"}
          </div>
        )}
        <div className="text-start">
          <Title size="sm" className="p-0! font-bold">
            {doctor.name}
          </Title>
          <Text size="sm" className="ds-text-secondary">
            {doctor.specialty}
          </Text>
          <div className="mt-1 flex items-center justify-start gap-1.5">
            {/* <span
              className={`h-2 w-2 rounded-full ${doctor.isOnline ? "bg-green-500" : "bg-gray-400"
                }`}
            />
            <Text size="sm" className="ds-text-secondary">
              {doctor.isOnline ? labels.onlineNow : labels.offline}
            </Text> */}
          </div>
        </div>

      </div>

      <div className="flex w-full flex-col gap-3 sm:w-72">
        <Button
          variant="outline"
          className="!justify-center gap-2"
          onClick={() => setIsEditOpen(true)}
        >
          <Pencil size={16} />
          {labels.editProfile}
        </Button>
        <Button variant="primary" className="!justify-center gap-2">
          <FaPlus size={14} />
          {labels.addAppointment}
        </Button>
      </div>

      <EditDoctorDialog
        doctor={doctor}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />
    </div>
  );
}
