"use client";
import { useQuery } from "@tanstack/react-query";
import { appointmentsMockData, type AppointmentBooking } from "../lib/mockData";

const fetchAppointments = async (): Promise<AppointmentBooking[]> =>
  appointmentsMockData;

export const useAppointments = () => {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: fetchAppointments,
  });
};

export default useAppointments;
