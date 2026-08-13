"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/axiosConfig";

export interface Patient {
  id: number;
  name: string;
  patient_type: "new" | "returning";
  nationality: string;
  phone: string;
  email: string | null;
}

interface PatientsResponse {
  patient: Patient[];
}

const fetchPatients = async (): Promise<Patient[]> => {
  const { data } = await api.get<PatientsResponse>("/patients");
  return data.patient;
};

export const usePatients = () => {
  return useQuery({
    queryKey: ["patients"],
    queryFn: fetchPatients,
  });
};

export default usePatients;
