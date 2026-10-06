import axiosConfig from "@/services/axiosConfig";
import type { UserImage } from "./userImage";

interface UpdateDoctorData {
    name: string;
    email: string;
    role: string;
    image?: File;
    removeImage?: boolean;
}

export interface UpdateDoctorResponse {
    status: string;
    message: string;
    data: {
        _id: string;
        name: string;
        email: string;
        role: string;
        img?: UserImage;
    };
}

export const updateDoctor = async (
    id: string,
    data: UpdateDoctorData,
): Promise<UpdateDoctorResponse> => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("role", data.role);

    if (data.image) {
        formData.append("img", data.image);
    }

    if (data.removeImage) {
        formData.append("removeimg", "true");
        formData.append("removeImage", "true");
    }

    const response = await axiosConfig.patch<UpdateDoctorResponse>(
        `/user/${id}`,
        formData,
        {
            headers: {
                "Content-Type": undefined,
            },
        },
    );

    return response.data;
};