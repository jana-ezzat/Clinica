"use client";
import { useQuery } from "@tanstack/react-query";
import { Patient } from "./usePatients";

export interface PatientDetails extends Patient {
  fileNumber?: string;
  gender?: "male" | "female";
  age?: number;
  lastVisit?: string;
}

// Backend disconnected — temporary local mock data until the new backend is wired up.
const MOCK_PATIENT_DETAILS: Record<string, PatientDetails> = {
  "1": {
    id: 1,
    name: "Sara Ahmed",
    patient_type: "returning",
    nationality: "Egyptian",
    phone: "+20 100 123 4567",
    email: "sara.ahmed@example.com",
    fileNumber: "F-0001",
    gender: "female",
    age: 34,
    lastVisit: "2026-08-01",
  },
  "2": {
    id: 2,
    name: "Omar Khaled",
    patient_type: "new",
    nationality: "Egyptian",
    phone: "+20 111 987 6543",
    email: "omar.khaled@example.com",
    fileNumber: "F-0002",
    gender: "male",
    age: 28,
    lastVisit: "2026-07-15",
  },
  "3": {
    id: 3,
    name: "Laila Hassan",
    patient_type: "returning",
    nationality: "Saudi",
    phone: "+966 50 123 4567",
    email: null,
    fileNumber: "F-0003",
    gender: "female",
    age: 41,
    lastVisit: "2026-06-20",
  },
};

const fetchPatient = async (id: string): Promise<PatientDetails> => {
  return MOCK_PATIENT_DETAILS[id] ?? Object.values(MOCK_PATIENT_DETAILS)[0];
};

export const usePatient = (id: string) => {
  return useQuery({
    queryKey: ["patient", id],
    queryFn: () => fetchPatient(id),
    enabled: !!id,
  });
};

export default usePatient;
