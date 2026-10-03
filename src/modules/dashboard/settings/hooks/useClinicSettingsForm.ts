"use client";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { useSettings } from "./useSettings";
import { useWorkHours } from "../context/WorkHoursContext";
import { ClinicSettingsForm } from "../lib/SettingData";
import { UpdateSettingData } from "./UpdateSettingDataRequest";
import { useSettingsEdit } from "../context/SettingEdit";

export function useClinicSettingsForm() {
  const { data, isLoading, isError, refetch } = useSettings();
  const t = useTranslations("settings.toast");
  const { setIsEditing } = useSettingsEdit();
  const queryClient = useQueryClient();
  const [logo, setLogo] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ClinicSettingsForm>();

  const { selectedDays, setSelectedDays, slots, setSlots } = useWorkHours();

  const isWorkDaysDirty =
    JSON.stringify(selectedDays) !== JSON.stringify(data?.workingDays ?? []);

  const isWorkHoursDirty =
    JSON.stringify(slots) !==
    JSON.stringify(
      data?.workingHours
        ? [
            {
              from: data.workingHours.start,
              to: data.workingHours.end,
            },
          ]
        : [
            {
              from: "09:00",
              to: "17:00",
            },
          ],
    );

  const isFormDirty =
    isDirty || logo !== null || isWorkDaysDirty || isWorkHoursDirty;

  const { mutateAsync, isPending: isSaving } = useApiMutation<
    FormData,
    unknown
  >({
    mutationFn: UpdateSettingData,
  });

  const resetForm = useCallback(() => {
    if (!data) return;

    reset({
      clinicName: data.clinicName ?? "",
      phone: data.phone ?? "",
      email: data.email ?? "",
      address: data.address ?? "",
      paymentMethods: data.paymentMethods ?? [],
      taxRate: data.taxRate ?? 0,
      appointmentDuration: data.appointmentDuration ?? 0,
      maxAdvanceBookingDays: data.maxAdvanceBookingDays ?? 0,
      minAdvanceBookingHours: data.minAdvanceBookingHours ?? 0,
    });

    setSelectedDays(data.workingDays ?? []);

    setSlots(
      data.workingHours
        ? [
            {
              from: data.workingHours.start,
              to: data.workingHours.end,
            },
          ]
        : [
            {
              from: "09:00",
              to: "17:00",
            },
          ],
    );

    setLogo(null);

  }, [data, reset, setSelectedDays, setSlots]);

  useEffect(() => {
    if (!data) return;

    reset({
      clinicName: data.clinicName ?? "",
      phone: data.phone ?? "",
      email: data.email ?? "",
      address: data.address ?? "",
      paymentMethods: data.paymentMethods ?? [],
      taxRate: data.taxRate ?? 0,
      appointmentDuration: data.appointmentDuration ?? 0,
      maxAdvanceBookingDays: data.maxAdvanceBookingDays ?? 0,
      minAdvanceBookingHours: data.minAdvanceBookingHours ?? 0,
    });

    setSelectedDays(data.workingDays ?? []);

    setSlots(
      data.workingHours
        ? [
            {
              from: data.workingHours.start,
              to: data.workingHours.end,
            },
          ]
        : [
            {
              from: "09:00",
              to: "17:00",
            },
          ],
    );

    setLogo(null);
  }, [data, reset, setSelectedDays, setSlots]);

  const submitForm = handleSubmit(async (formValues) => {
    try {
      const formData = new FormData();

      formData.append("clinicName", formValues.clinicName);
      formData.append("phone", formValues.phone);
      formData.append("email", formValues.email);
      formData.append("address", formValues.address);

      selectedDays.forEach((day) => {
        formData.append("workingDays[]", day);
      });

      formData.append("workingHours[start]", slots[0]?.from ?? "");
      formData.append("workingHours[end]", slots[0]?.to ?? "");

      formValues.paymentMethods.forEach((method) => {
        formData.append("paymentMethods[]", method);
      });

      formData.append("taxRate", String(formValues.taxRate));

      formData.append(
        "appointmentDuration",
        String(formValues.appointmentDuration),
      );

      formData.append(
        "maxAdvanceBookingDays",
        String(formValues.maxAdvanceBookingDays),
      );

      formData.append(
        "minAdvanceBookingHours",
        String(formValues.minAdvanceBookingHours),
      );

      if (logo) {
        formData.append("logo", logo);
      }

      await mutateAsync(formData);

      await queryClient.invalidateQueries({
        queryKey: ["clinic-settings"],
      });

      setIsEditing(false);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      toast.success(t("success"));
    } catch (error) {
      console.error("UPDATE SETTINGS ERROR:", error);

      toast.error(t("error"));
    }
  });

  return {
    register,
    errors,
    submitForm,
    isLoading,
    isError,
    isSaving,
    resetForm,
    refetch,
    data,
    setLogo,
    isDirty: isFormDirty,
  };
}
