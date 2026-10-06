"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosConfig from "@/services/axiosConfig";
import tokenService from "@/services/tokenService";
import { decodeToken } from "@/lib/utils";

interface CreateAppointmentPayload {
  patient: string;
  doctor: string;
  date: string;
  startTime: string;
  type: string;
}

const createAppointment = async (payload: CreateAppointmentPayload) => {
  const { data } = await axiosConfig.post("/appointment", payload);
  return data;
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};

export const getCurrentDoctorId = (): string | null => {
  const token = tokenService.get();
  if (!token) return null;
  const decoded = decodeToken(token);
  return decoded?.id ?? null;
};

export default useCreateAppointment;
