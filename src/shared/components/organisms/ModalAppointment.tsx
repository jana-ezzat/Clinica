"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import Title from "@/shared/components/atoms/Title";
import Text from "@/shared/components/atoms/Text";
import Button from "@/shared/components/atoms/Button";

import PatientInfo from "../molecules/PatientInfo";
import MeetingInfo from "../molecules/MeetingInfo";
import Modal from "@/shared/components/molecules/ModalShell";
import { AppointmentFormValues, AppointmentModalSchema } from "@/shared/schema/AppointmentModalSechma";


interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalAppointment({ isOpen, onClose }: Props) {
  const t = useTranslations("appointmentsModal.addAppointment");

  const schema = AppointmentModalSchema(t("required"));

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<AppointmentFormValues >({
    resolver: zodResolver(schema),
  });

  const handleData = (data: AppointmentFormValues) => {
    console.log(data);
    onClose();
  };

  const handleClose = () => {
    clearErrors();
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="flex flex-col gap-6">
        <div>
          <Title size="lg" className="mb-4 font-bold">
            {t("title")}
          </Title>

          <Text size="sm" variant="secondary">
            {t("description")}
          </Text>
        </div>

        <form
          onSubmit={handleSubmit(handleData)}
          className="flex flex-col gap-4"
        >
          <PatientInfo register={register} errors={errors} />

          <MeetingInfo register={register} errors={errors} />

          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              className="text-red-500"
              variant="ghost"
              onClick={handleClose}
            >
              {t("cancel")}
            </Button>

            <Button type="submit" variant="primary" size="sm">
              {t("submit")}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
