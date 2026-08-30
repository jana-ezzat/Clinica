"use client";
import { useQuery } from "@tanstack/react-query";

export interface Patient {
  id: number;
  name: string;
  patient_type: "new" | "returning";
  nationality: string;
  phone: string;
  email: string | null;
}

// Backend disconnected — temporary local mock data until the new backend is wired up.
const MOCK_PATIENTS: Patient[] = [
  {
    id: 1,
    name: "Sara Ahmed",
    patient_type: "returning",
    nationality: "Egyptian",
    phone: "+20 100 123 4567",
    email: "sara.ahmed@example.com",
  },
  {
    id: 2,
    name: "Omar Khaled",
    patient_type: "new",
    nationality: "Egyptian",
    phone: "+20 111 987 6543",
    email: "omar.khaled@example.com",
  },
  {
    id: 3,
    name: "Laila Hassan",
    patient_type: "returning",
    nationality: "Saudi",
    phone: "+966 50 123 4567",
    email: null,
  },
];

const fetchPatients = async (): Promise<Patient[]> => MOCK_PATIENTS;

export const usePatients = () => {
  return useQuery({
    queryKey: ["patients"],
    queryFn: fetchPatients,
  });
};

export default usePatients;
