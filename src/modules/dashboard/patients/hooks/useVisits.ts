"use client";
import { useQuery } from "@tanstack/react-query";
import axiosConfig from "@/services/axiosConfig";

export interface Visit {
  id: string;
  patientId: string | null;
  doctorName: string;
  visitDate: string;
  reason: string;
  vitals: {
    weight?: number;
    height?: number;
    pulse?: number;
    temperature?: number;
  };
  diagnosis?: string;
  treatment?: string;
  doctorNotes?: string;
  followUpDate?: string;
}

interface BackendVisit {
  _id: string;
  patient: string | { _id: string } | null;
  doctor?: { name?: string } | null;
  visitDate: string;
  reason?: string;
  vitalSigns?: Visit["vitals"];
  diagnosis?: string;
  treatment?: string;
  doctorNotes?: string;
  followUpDate?: string;
}

interface VisitsResponse {
  status: string;
  data: BackendVisit[];
}

const patientIdOf = (patient: BackendVisit["patient"]): string | null =>
  !patient ? null : typeof patient === "string" ? patient : patient._id;

const fetchVisits = async (patientId: string): Promise<Visit[]> => {
  const { data } = await axiosConfig.get<VisitsResponse>("/visit");

  return data.data
    .filter((v) => patientIdOf(v.patient) === patientId)
    .map((v) => ({
      id: v._id,
      patientId: patientIdOf(v.patient),
      doctorName: v.doctor?.name ?? "—",
      visitDate: v.visitDate,
      reason: v.reason ?? "—",
      vitals: v.vitalSigns ?? {},
      diagnosis: v.diagnosis,
      treatment: v.treatment,
      doctorNotes: v.doctorNotes,
      followUpDate: v.followUpDate,
    }))
    .sort((a, b) => b.visitDate.localeCompare(a.visitDate)); // newest first
};

export const useVisits = (patientId: string) =>
  useQuery({
    queryKey: ["visits", patientId],
    queryFn: () => fetchVisits(patientId),
    enabled: !!patientId,
  });

export default useVisits;
