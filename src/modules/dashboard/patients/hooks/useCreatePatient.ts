"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosConfig from "@/services/axiosConfig";

interface CreatePatientPayload {
  name: string;
  phone: string;
  email?: string;
  gender: "male" | "female";
  dateOfBirth: string;
}

interface CreatePatientResponse {
  status: string;
  message: string;
  data: { patient: { _id: string } };
}

const createPatient = async (
  payload: CreatePatientPayload,
): Promise<CreatePatientResponse> => {
  const { data } = await axiosConfig.post<CreatePatientResponse>(
    "/patient",
    payload,
  );
  return data;
};

export const useCreatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
};

export default useCreatePatient;
