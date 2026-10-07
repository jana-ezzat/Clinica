"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosConfig from "@/services/axiosConfig";

interface UpdatePatientPayload {
  name?: string;
  phone?: string;
  otherPhone?: string;
  email?: string;
  gender?: "male" | "female";
  dateOfBirth?: string;
  nationalID?: string;
  address?: string;
  medicalInformation?: {
    bloodType?: string;
    allergies?: string[];
    chronicDiseases?: string[];
    medications?: string[];
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
}

const updatePatient = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdatePatientPayload;
}) => {
  const { data } = await axiosConfig.patch(`/patient/${id}`, payload);
  return data;
};

export const useUpdatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePatient,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["patient"] });
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-home"] });
    },
  });
};

export default useUpdatePatient;
