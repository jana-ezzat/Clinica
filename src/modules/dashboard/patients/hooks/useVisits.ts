"use client";
import { useQuery } from "@tanstack/react-query";
import axiosConfig from "@/services/axiosConfig";

export interface Visit {
  id: string;
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
  doctor?: { name?: string };
  visitDate: string;
  reason?: string;
  vitalSigns?: {
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

interface VisitsResponse {
  status: string;
  results: number;
  data: BackendVisit[];
}

const idOf = (patient: BackendVisit["patient"]): string | null => {
  if (!patient) return null;
  return typeof patient === "string" ? patient : patient._id;
};

const fetchVisits = async (patientId: string): Promise<Visit[]> => {
  const { data } = await axiosConfig.get<VisitsResponse>("/visit");

  return data.data
    .filter((v) => idOf(v.patient) === patientId)
    .map((v) => ({
      id: v._id,
      doctorName: v.doctor?.name ?? "—",
      visitDate: v.visitDate,
      reason: v.reason ?? "—",
      vitals: v.vitalSigns ?? {},
      diagnosis: v.diagnosis,
      treatment: v.treatment,
      doctorNotes: v.doctorNotes,
      followUpDate: v.followUpDate,
    }));
};

export const useVisits = (patientId: string) => {
  return useQuery({
    queryKey: ["visits", patientId],
    queryFn: () => fetchVisits(patientId),
    enabled: !!patientId,
  });
};

export default useVisits;
