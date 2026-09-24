"use client";

import { useQuery } from "@tanstack/react-query";
import axiosConfig from "@/services/axiosConfig";
import { Patient } from "./usePatients";

export interface PatientDetails extends Patient {
  fileNumber?: string;
  lastVisit?: string;
  age?: number;
  gender?: "male" | "female";
  dateOfBirth?: string;
  nationalID?: string;
  address?: string;
  otherPhone?: string;

  medicalInformation?: {
    bloodType?: string;
    allergies: string[];
    chronicDiseases: string[];
    medications: string[];
    previousSurgeries: {
      name: string;
      date: string;
      _id: string;
    }[];
    familyMedicalHistory?: string;
    medicalHistory?: string;
  };

  emergencyContact?: {
    emergencyname?: string;
    emergencyphone?: string;
    emergencyrelationship?: string;
  };

  insurance?: {
    company?: string;
    memberNumber?: string;
    coverageRatio?: number;
    endDate?: string;
  };

  attachments?: string[];

  createdAt?: string;
  updatedAt?: string;
}

interface PatientResponse {
  status: string;
  data: BackendPatient;
}

interface BackendPatient {
  personalInformation: {
    name: string;
    phone: string;
    otherPhone?: string;
    email: string | null;
    gender?: "male" | "female";
    dateOfBirth?: string;
    nationalID?: string;
    address?: string;
  };

  medicalInformation?: {
    bloodType?: string;
    allergies?: string[];
    chronicDiseases?: string[];
    medications?: string[];
    previousSurgeries?: {
      name: string;
      date: string;
      _id: string;
    }[];
    familyMedicalHistory?: string;
    medicalHistory?: string;
  };

  emergencyContact?: {
    emergencyname?: string;
    emergencyphone?: string;
    emergencyrelationship?: string;
  };

  insurance?: {
    company?: string;
    memberNumber?: string;
    coverageRatio?: number;
    endDate?: string;
  };

  _id: string;
  slug: string;
  attachments?: string[];
  createdAt?: string;
  updatedAt?: string;
}

const fetchPatient = async (slug: string): Promise<PatientDetails> => {
  const { data } = await axiosConfig.get<PatientResponse>(`/patient/${slug}`);

  const patient = data.data;

  return {
    id: patient._id,
    name: patient.personalInformation.name,
    patient_type: "new",
    nationality: "",
    phone: patient.personalInformation.phone,
    email: patient.personalInformation.email,

    slug: patient.slug,

    gender: patient.personalInformation.gender,
    dateOfBirth: patient.personalInformation.dateOfBirth,
    nationalID: patient.personalInformation.nationalID,
    address: patient.personalInformation.address,
    otherPhone: patient.personalInformation.otherPhone,

    medicalInformation: {
      bloodType: patient.medicalInformation?.bloodType,
      allergies: patient.medicalInformation?.allergies ?? [],
      chronicDiseases: patient.medicalInformation?.chronicDiseases ?? [],
      medications: patient.medicalInformation?.medications ?? [],
      previousSurgeries: patient.medicalInformation?.previousSurgeries ?? [],
      familyMedicalHistory: patient.medicalInformation?.familyMedicalHistory,
      medicalHistory: patient.medicalInformation?.medicalHistory,
    },

    emergencyContact: patient.emergencyContact,

    insurance: patient.insurance,

    attachments: patient.attachments ?? [],

    createdAt: patient.createdAt,
    updatedAt: patient.updatedAt,
  };
};

export const usePatient = (slug: string) => {
  return useQuery({
    queryKey: ["patient", slug],
    queryFn: () => fetchPatient(slug),
    enabled: !!slug,
  });
};

export default usePatient;
