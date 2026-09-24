"use client";
import { useQuery } from "@tanstack/react-query";
import axiosConfig from "@/services/axiosConfig";
import type { AppointmentBooking } from "../lib/mockData";
import type { AppointmentStatus } from "@/modules/dashboard/lib/mockData";

interface BackendPatient {
  personalInformation?: { name: string };
}
interface BackendAppointment {
  _id: string;
  patient: BackendPatient | null;
  date: string;
  startTime: string;
  status: AppointmentStatus;
  type: AppointmentBooking["bookingType"];
}
interface AppointmentsResponse {
  status: string;
  results: number;
  data: BackendAppointment[];
}

const fetchAppointments = async (): Promise<AppointmentBooking[]> => {
  const { data } = await axiosConfig.get<AppointmentsResponse>("/appointment");

  return data.data.map((appt) => ({
    id: appt._id,
    name: appt.patient?.personalInformation?.name ?? "—",
    bookingType: appt.type,
    status: appt.status,
    bookingDate: appt.date.split("T")[0],
    bookingTime: appt.startTime,
  }));
};

export const useAppointments = () => {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: fetchAppointments,
  });
};

export default useAppointments;
