"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosConfig from "@/services/axiosConfig";
import tokenService from "@/services/tokenService";
import { decodeToken } from "@/lib/utils";
import type { AppointmentBookingType } from "@/modules/dashboard/appointments/lib/mockData";
interface NewPatientInput {
  name: string;
  phone: string;
  email?: string;
  gender: "male" | "female";
  dateOfBirth: string;
}

type CreateAppointmentPayload =
  | {
      patientType: "existing";
      patient: string;
      doctor: string;
      date: string;
      startTime: string;
      type: AppointmentBookingType;
      duration?: number;
    }
  | {
      patientType: "new";
      newPatient: NewPatientInput;
      doctor: string;
      date: string;
      startTime: string;
      type: AppointmentBookingType;
      duration?: number;
    };

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
