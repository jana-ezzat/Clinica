"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosConfig from "@/services/axiosConfig";

export interface VisitInput {
  visitDate: string; // ISO string
  reason: string;
  weight?: number;
  height?: number;
  pulse?: number;
  temperature?: number;
  diagnosis?: string;
  treatment?: string;
  doctorNotes?: string;
  followUpDate?: string;
}

const toVisitPayload = (v: VisitInput) => {
  const vitalSigns = {
    weight: v.weight,
    height: v.height,
    pulse: v.pulse,
    temperature: v.temperature,
  };
  const hasVitals = Object.values(vitalSigns).some((x) => x !== undefined);

  return {
    visitDate: v.visitDate,
    reason: v.reason,
    ...(hasVitals ? { vitalSigns } : {}),
    diagnosis: v.diagnosis,
    treatment: v.treatment,
    doctorNotes: v.doctorNotes,
    followUpDate: v.followUpDate,
  };
};

const useRefresh = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ["visits"] });
    queryClient.invalidateQueries({ queryKey: ["dashboard-home"] });
  };
};

export const useCreateVisit = () => {
  const refresh = useRefresh();
  return useMutation({
    mutationFn: async (args: {
      patient: string;
      doctor: string;
      input: VisitInput;
    }) => {
      const { data } = await axiosConfig.post("/visit", {
        patient: args.patient,
        doctor: args.doctor,
        ...toVisitPayload(args.input),
      });
      return data;
    },
    onSuccess: refresh,
  });
};

export const useUpdateVisit = () => {
  const refresh = useRefresh();
  return useMutation({
    mutationFn: async (args: { id: string; input: VisitInput }) => {
      const { data } = await axiosConfig.patch(
        `/visit/${args.id}`,
        toVisitPayload(args.input),
      );
      return data;
    },
    onSuccess: refresh,
  });
};
