"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import Modal from "@/shared/components/molecules/ModalShell";
import Title from "@/shared/components/atoms/Title";
import Button from "@/shared/components/atoms/Button";
import VisitFormFields from "../molecules/VisitFormFields";

import type { Visit } from "../../hooks/useVisits";
import { getCurrentDoctorId } from "@/modules/dashboard/appointments/hooks/useCreateAppointments";
import { useCreateVisit, useUpdateVisit, VisitInput } from "../../hooks/useVisitsMutations";
import { VisitFormValues, VisitSchema } from "../../schema/visitSchema";

interface Props {
  patientId: string;
  visit?: Visit;
  isOpen: boolean;
  onClose: () => void;
}

const pad = (n: number) => String(n).padStart(2, "0");
const toLocalInput = (iso: string) => {
  const d = new Date(iso);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};
const num = (s?: string) => (s ? Number(s) : undefined);

export default function VisitFormModal({
  patientId,
  visit,
  isOpen,
  onClose,
}: Props) {
  const t = useTranslations("visitHistory");
  const createVisit = useCreateVisit();
  const updateVisit = useUpdateVisit();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VisitFormValues>({
    resolver: zodResolver(VisitSchema),
    defaultValues: {
      visitDate: visit ? toLocalInput(visit.visitDate) : "",
      reason: visit?.reason === "—" ? "" : (visit?.reason ?? ""),
      weight: visit?.vitals.weight?.toString() ?? "",
      height: visit?.vitals.height?.toString() ?? "",
      pulse: visit?.vitals.pulse?.toString() ?? "",
      temperature: visit?.vitals.temperature?.toString() ?? "",
      diagnosis: visit?.diagnosis ?? "",
      treatment: visit?.treatment ?? "",
      doctorNotes: visit?.doctorNotes ?? "",
      followUpDate: visit?.followUpDate?.split("T")[0] ?? "",
    },
  });

  const onSubmit = async (data: VisitFormValues) => {
    const input: VisitInput = {
      visitDate: new Date(data.visitDate).toISOString(),
      reason: data.reason,
      weight: num(data.weight),
      height: num(data.height),
      pulse: num(data.pulse),
      temperature: num(data.temperature),
      diagnosis: data.diagnosis || undefined,
      treatment: data.treatment || undefined,
      doctorNotes: data.doctorNotes || undefined,
      followUpDate: data.followUpDate || undefined,
    };

    try {
      if (visit) {
        await updateVisit.mutateAsync({ id: visit.id, input });
        toast.success(t("toasts.updateSuccess"));
      } else {
        const doctorId = getCurrentDoctorId();
        if (!doctorId) {
          toast.error(t("toasts.noDoctor"));
          return;
        }
        await createVisit.mutateAsync({
          patient: patientId,
          doctor: doctorId,
          input,
        });
        toast.success(t("toasts.createSuccess"));
      }
      onClose();
    } catch (error) {
      const backendMessage = isAxiosError(error)
        ? error.response?.data?.message
        : null;
      toast.error(backendMessage ?? t("toasts.error"));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-6">
        <Title size="lg" className="font-bold">
          {visit ? t("form.editTitle") : t("form.addTitle")}
        </Title>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <VisitFormFields register={register} errors={errors} />

          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              className="text-red-500"
              onClick={onClose}>
              {t("form.cancel")}
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={isSubmitting}>
              {isSubmitting ? t("form.saving") : t("form.save")}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
