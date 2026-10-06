// src\modules\dashboard\doctors\hooks\useDoctors.ts
"use client";
import axiosConfig from "@/services/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { resolveUserImage, type UserImage } from "../lib/userImage";

export interface Doctor {
    id: string;
    name: string;
    slug: string;
    email: string;
    phone: string;
    specialty: string;
    image: string;
    experienceYears: number;
}

interface BackendDoctor {
    _id: string;
    name: string;
    slug?: string;
    email: string;
    phone?: string;
    specialty?: string;
    img?: UserImage;
    experienceYears?: number;
}

interface DoctorsResponse {
    status: string;
    results: number;
    data: BackendDoctor[];
}

const fetchDoctors = async (): Promise<Doctor[]> => {
    const { data } = await axiosConfig.get<DoctorsResponse>("/user/doctors");

    return data.data.map((doctor) => ({
        id: doctor._id,
        name: doctor.name,
        slug: doctor.slug ?? "",
        email: doctor.email,
        phone: doctor.phone ?? "",
        specialty: doctor.specialty ?? "",
        image: resolveUserImage(doctor.img),
        experienceYears: doctor.experienceYears ?? 0,
    }));
};

export const useDoctors = () => {
    return useQuery({
        queryKey: ["doctors"],
        queryFn: fetchDoctors,
    });
};

export default useDoctors;