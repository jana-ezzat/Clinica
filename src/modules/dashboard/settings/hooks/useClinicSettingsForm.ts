"use client";

import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { useSettings } from "./useSettings";
import { useWorkHours } from "../context/WorkHoursContext";
import { ClinicSettingsForm } from "../lib/SettingData";
import { useQueryClient } from "@tanstack/react-query";
import { UpdateSettingData } from "./UpdateSettingDataRequest";
import { useSettingsEdit } from "../context/SettingEdit";

export function useClinicSettingsForm() {
  const { data, isLoading, isError, refetch } = useSettings();
  const{setIsEditing} = useSettingsEdit()
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClinicSettingsForm>();

  const { selectedDays, setSelectedDays, slots, setSlots } = useWorkHours();

  // Reset
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
  }, [data, reset, setSelectedDays, setSlots]);

  // GET
  useEffect(() => {
    if (data) {
      resetForm();
    }
  }, [data]);

  // PUT Data
  const { mutateAsync, isPending: isSaving } = useApiMutation<
    Partial<ClinicSettingsForm>,
    unknown
  >({
    mutationFn: UpdateSettingData,
  });

  const submitForm = handleSubmit(async (formValues) => {
    const payload: Partial<ClinicSettingsForm> = {
      clinicName: formValues.clinicName,
      phone: formValues.phone,
      email: formValues.email,
      address: formValues.address,
      workingDays: selectedDays,
      workingHours: {
        start: slots[0]?.from ?? "",
        end: slots[0]?.to ?? "",
      },
      paymentMethods: formValues.paymentMethods,
      taxRate: formValues.taxRate,
      appointmentDuration: formValues.appointmentDuration,
      maxAdvanceBookingDays: formValues.maxAdvanceBookingDays,
      minAdvanceBookingHours: formValues.minAdvanceBookingHours,
    };

      await mutateAsync(payload);

      await queryClient.invalidateQueries({
        queryKey: ["clinic-settings"],
      });
      setIsEditing(false)
      window.scrollTo({
        top:0,
        behavior:"smooth"
      })
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
  };
}
