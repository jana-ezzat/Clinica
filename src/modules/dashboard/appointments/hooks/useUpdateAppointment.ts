"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosConfig from "@/services/axiosConfig";
import type {
  AppointmentBookingType,
  AppointmentStatus,
} from "../lib/mockData";

export interface UpdateAppointmentPayload {
  date?: string;
  startTime?: string;
  type?: AppointmentBookingType;
  status?: AppointmentStatus;
}

interface UpdateAppointmentArgs {
  id: string;
  payload: UpdateAppointmentPayload;
}

const updateAppointment = async ({ id, payload }: UpdateAppointmentArgs) => {
  const { data } = await axiosConfig.patch(`/appointment/${id}`, payload);
  return data;
};

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};

export default useUpdateAppointment;
