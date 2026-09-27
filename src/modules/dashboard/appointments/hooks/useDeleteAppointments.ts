"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosConfig from "@/services/axiosConfig";

const deleteAppointment = async (id: string) => {
  const { data } = await axiosConfig.delete(`/appointment/${id}`);
  return data;
};

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};

export default useDeleteAppointment;
