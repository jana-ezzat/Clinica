"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDoctor } from "../lib/updateDoctor";
import type { DoctorProfile } from "../types/doctor";
import { resolveUserImage } from "../lib/userImage";

export const useUpdateDoctor = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: {
                name: string;
                email: string;
                role: string;
                image?: File;
                removeImage?: boolean;
            };
        }) => updateDoctor(id, data),

        onSuccess: (response, variables) => {
            const updated = response.data;
            const nextImage = variables.data.removeImage
                ? ""
                : resolveUserImage(updated?.img);

            queryClient.setQueryData<DoctorProfile>(
                ["doctor", variables.id],
                (current) => {
                    if (!current) return current;

                    return {
                        ...current,
                        name: updated?.name ?? variables.data.name,
                        email: updated?.email ?? variables.data.email,
                        role: updated?.role ?? variables.data.role,
                        image: variables.data.removeImage
                            ? ""
                            : nextImage || current.image,
                    };
                },
            );

            queryClient.invalidateQueries({
                queryKey: ["doctor", variables.id],
            });

            queryClient.invalidateQueries({
                queryKey: ["doctors"],
            });
        },
    });
};

export default useUpdateDoctor;