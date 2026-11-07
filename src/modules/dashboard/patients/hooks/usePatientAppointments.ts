"use client";
import { useQuery } from "@tanstack/react-query";
import axiosConfig from "@/services/axiosConfig";
import type {
  AppointmentBookingType,
  AppointmentStatus,
} from "@/modules/dashboard/appointments/lib/mockData";

export interface PatientAppointment {
  id: string;
  date: string;
  time: string;
  type: AppointmentBookingType;
  status: AppointmentStatus;
  doctorName: string;
}

interface BackendAppointment {
  _id: string;
  patient: string | { _id: string } | null;
  doctor?: { name?: string } | null;
  date: string;
  startTime?: string;
  type: AppointmentBookingType;
  status: AppointmentStatus;
}

interface AppointmentsResponse {
  status: string;
  data: BackendAppointment[];
}

const patientIdOf = (patient: BackendAppointment["patient"]): string | null =>
  !patient ? null : typeof patient === "string" ? patient : patient._id;

const minutesOf = (time?: string): number => {
  const m = time?.trim().match(/^(\d{1,2}):(\d{2})$/);
  return m ? Number(m[1]) * 60 + Number(m[2]) : 0;
};

const fetchPatientAppointments = async (
  patientId: string,
): Promise<PatientAppointment[]> => {
  const { data } = await axiosConfig.get<AppointmentsResponse>("/appointment");

  return data.data
    .filter((a) => patientIdOf(a.patient) === patientId)
    .map((a) => ({
      id: a._id,
      date: a.date,
      time: a.startTime ?? "",
      type: a.type,
      status: a.status,
      doctorName: a.doctor?.name ?? "—",
    }))
    .sort(
      (a, b) =>
        b.date.localeCompare(a.date) || minutesOf(b.time) - minutesOf(a.time),
    );
};

export const usePatientAppointments = (patientId: string) =>
  useQuery({
    queryKey: ["appointments", "patient", patientId],
    queryFn: () => fetchPatientAppointments(patientId),
    enabled: !!patientId,
  });

export default usePatientAppointments;
