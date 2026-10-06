"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { isAxiosError } from "axios";

import Modal from "@/shared/components/molecules/ModalShell";
import Title from "@/shared/components/atoms/Title";
import Button from "@/shared/components/atoms/Button";

import type { AppointmentBooking } from "../../lib/mockData";
import { useUpdateAppointment } from "../../hooks/useUpdateAppointment";
import { EditAppointmentFormValues, EditAppointmentSchema } from "../../schema/AppointmentModalSchema";
import EditAppointmentFields from "../molecules/EditAppointmentFields";

const padTime = (time: string) => (time.length === 4 ? `0${time}` : time);

interface Props {
  appointment: AppointmentBooking;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditAppointmentModal({
  appointment,
  isOpen,
  onClose,
}: Props) {
  const t = useTranslations("appointmentsModal.editAppointment");
  const tToasts = useTranslations("appointments.toasts");
  const updateAppointment = useUpdateAppointment();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditAppointmentFormValues>({
    resolver: zodResolver(EditAppointmentSchema),
    defaultValues: {
      date: appointment.bookingDate,
      startTime: padTime(appointment.bookingTime),
      type: appointment.bookingType,
      status: appointment.status,
    },
  });

  const onSubmit = async (data: EditAppointmentFormValues) => {
    try {
      await updateAppointment.mutateAsync({
        id: appointment.id,
        payload: data,
      });
      toast.success(tToasts("updateSuccess"));
      onClose();
    } catch (error) {
      const backendMessage = isAxiosError(error)
        ? error.response?.data?.message
        : null;
      toast.error(backendMessage ?? tToasts("updateError"));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-6">
        <div>
          <Title size="lg" className="mb-1 font-bold">
            {t("title")}
          </Title>
          <p className="text-sm text-gray-500">{appointment.name}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <EditAppointmentFields register={register} errors={errors} />

          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              className="text-red-500"
              onClick={onClose}>
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={updateAppointment.isPending}>
              {updateAppointment.isPending ? t("saving") : t("save")}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
