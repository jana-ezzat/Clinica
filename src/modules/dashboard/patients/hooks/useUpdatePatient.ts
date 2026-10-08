"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosConfig from "@/services/axiosConfig";

export interface UpdatePatientPayload {
  name?: string;
  phone?: string;
  otherPhone?: string;
  email?: string;
  gender?: "male" | "female";
  dateOfBirth?: string;
  nationalID?: string;
  address?: string;

  bloodType?: string;
  allergies?: string[];
  chronicDiseases?: string[];
  medications?: string[];
  previousSurgeries?: { name: string; date: string }[];
  familyMedicalHistory?: string;
  medicalHistory?: string;

  emergencyName?: string;
  emergencyPhone?: string;
  emergencyRelationship?: string;

  insuranceCompany?: string;
  memberNumber?: string;
  coverageRatio?: number;
  insuranceEndDate?: string;
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patient"] });
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-home"] });
    },
  });
};

export default useUpdatePatient;