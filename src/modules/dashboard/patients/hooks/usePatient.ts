"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/axiosConfig";
import { Patient } from "./usePatients";

export interface PatientDetails extends Patient {
  fileNumber?: string;
  gender?: "male" | "female";
  age?: number;
  lastVisit?: string;
}

interface PatientResponse {
  patient: PatientDetails;
}

const fetchPatient = async (id: string): Promise<PatientDetails> => {
  const { data } = await api.get<PatientResponse>(`/patients/${id}`);
  return data.patient;
};

export const usePatient = (id: string) => {
  return useQuery({
    queryKey: ["patient", id],
    queryFn: () => fetchPatient(id),
    enabled: !!id,
  });
};

export default usePatient;
