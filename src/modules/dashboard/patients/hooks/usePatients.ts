// src\modules\dashboard\patients\hooks\usePatients.ts
"use client";
import axiosConfig from "@/services/axiosConfig";
import { useQuery } from "@tanstack/react-query";

export interface Patient {
  id: string;
  slug: string;
  name: string;
  patient_type: "new" | "returning";
  nationality?: string;
  phone: string;
  email: string | null;
}

interface PatientsResponse {
  status: string;
  results: number;
  data: {
    patients: BackendPatient[];
  };
}

interface BackendPatient {
  _id: string;
  slug: string;
  personalInformation: {
    name: string;
    phone: string;
    email: string | null;
    gender?: "male" | "female";
    dateOfBirth?: string;
    nationalID?: string;
    address?: string;
    otherPhone?: string;
  };
}


const fetchPatients = async (): Promise<Patient[]> => {
  const { data } = await axiosConfig.get<PatientsResponse>("/patient");

  return data.data.patients.map((patient) => ({
    id: patient._id,
    slug: patient.slug,
    name: patient.personalInformation.name,
    patient_type: "new",
    nationality: "",
    phone: patient.personalInformation.phone,
    email: patient.personalInformation.email,
  }));
};

export const usePatients = () => {
  return useQuery({
    queryKey: ["patients"],
    queryFn: fetchPatients,
  });
};

export default usePatients;
