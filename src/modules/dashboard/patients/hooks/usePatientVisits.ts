"use client";

import { useQuery } from "@tanstack/react-query";
import axiosConfig from "@/services/axiosConfig";
import { PatientVisit } from "../types/visit";

interface VisitsResponse {
  status: string;
  results?: number;
  data: PatientVisit[];
}

const fetchPatientVisits = async (patientId: string): Promise<PatientVisit[]> => {
  const { data } = await axiosConfig.get<VisitsResponse>(
    `/visit/patient/${patientId}`,
  );
  return data.data ?? [];
};

export const usePatientVisits = (patientId: string, enabled = true) => {
  return useQuery({
    queryKey: ["patient-visits", patientId],
    queryFn: () => fetchPatientVisits(patientId),
    enabled: enabled && !!patientId,
  });
};
