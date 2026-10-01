"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import Title from "@/shared/components/atoms/Title";
import Text from "@/shared/components/atoms/Text";
import Button from "@/shared/components/atoms/Button";

import PatientInfo from "../molecules/PatientInfo";
import MeetingInfo from "../molecules/MeetingInfo";
import Modal from "@/shared/components/molecules/ModalShell";
import {
  AppointmentFormValues,
  AppointmentFormOutput,
  AppointmentModalSchema,
} from "@/modules/dashboard/appointments/schema/AppointmentModalSchema";

import { ageToDateOfBirth } from "@/lib/utils";
import useCreatePatient from "@/modules/dashboard/patients/hooks/useCreatePatient";
import useCreateAppointment, {
  getCurrentDoctorId,
} from "@/modules/dashboard/appointments/hooks/useCreateAppointments";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalAppointment({ isOpen, onClose }: Props) {
  const t = useTranslations("appointmentsModal.addAppointment");
  const schema = AppointmentModalSchema(t("required"));

  const [patientType, setPatientType] = useState<"new" | "existing">("new");
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormValues, any, AppointmentFormOutput>({
    resolver: zodResolver(schema),
  });

  const createPatient = useCreatePatient();
  const createAppointment = useCreateAppointment();

  const onSubmit = async (data: AppointmentFormOutput) => {
    setFormError(null);

    if (patientType === "existing" && !data.patientId) {
      setFormError(t("patient.selectRequired"));
      return;
    }

    try {
      let patientId = data.patientId;

      if (patientType === "new") {
        const patientRes = await createPatient.mutateAsync({
          name: data.name,
          phone: data.phone,
          email: data.email || undefined,
          gender: data.gender,
          dateOfBirth: ageToDateOfBirth(data.age),
        });
        patientId = patientRes.data.patient._id;
      }

      const doctorId = getCurrentDoctorId();
      if (!doctorId) {
        setFormError(t("errors.noDoctor"));
        return;
      }

      await createAppointment.mutateAsync({
        patient: patientId!,
        doctor: doctorId,
        date: data.appointmentDate,
        startTime: data.time,
        type: data.appointmentType,
      });

      onClose();
    } catch (error) {
      setFormError(t("errors.somethingWentWrong"));
    }
  };

  const handleClose = () => {
    clearErrors();
    setFormError(null);
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

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <PatientInfo
            register={register}
            errors={errors}
            setValue={setValue}
            patientType={patientType}
            onPatientTypeChange={setPatientType}
          />

          <MeetingInfo register={register} errors={errors} />

          {formError && (
            <Text size="sm" className="text-center text-red-500">
              {formError}
            </Text>
          )}

          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              className="text-red-500"
              variant="ghost"
              onClick={handleClose}>
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={isSubmitting}>
              {isSubmitting ? t("submitting") : t("submit")}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
