"use client";

import axiosConfig from "@/services/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import type { DoctorProfile } from "../types/doctor";
import { resolveUserImage, type UserImage } from "../lib/userImage";

interface DoctorApiProfile {
    id: string;
    name: string;
    role: string;
    slug: string;
    email: string;
    phone: string;
    specialty: string;
    gender?: "male" | "female";
    dateOfBirth: string;
    clinicAddress: string;
    experienceYears: number;
    bio: string;
    image: string;
    workingHours: string;
    certificates: {
        id: string;
        title: string;
        subtitle: string;
        image: string;
    }[];
    awards: {
        id: string;
        title: string;
        subtitle: string;
        image: string;
    }[];
}

interface BackendDoctor {
    _id: string;
    name: string;
    slug: string;
    email: string;
    phone: string;
    role: string;
    gender?: string;
    dateOfBirth?: string;
    specialty: string;
    clinicAddress: string;
    experienceYears: number;
    bio: string;
    img?: UserImage;
    workingHours: string;
    certificates?: {
        title: string;
        desc?: string;
        image?: string;
        file?: string;
        _id: string;
    }[];
    awards?: {
        title: string;
        desc?: string;
        image?: string;
        file?: string;
        _id: string;
    }[];
}

interface DoctorResponse {
    status: string;
    data: BackendDoctor;
}

const parseDoctorGender = (value?: string): DoctorProfile["gender"] => {
    if (!value) return undefined;

    const normalized = value.trim().toLowerCase();

    if (normalized === "male" || normalized === "m" || normalized === "ذكر") {
        return "male";
    }

    if (
        normalized === "female" ||
        normalized === "f" ||
        normalized === "أنثى" ||
        normalized === "انثى"
    ) {
        return "female";
    }

    return undefined;
};

const calculateAge = (dateOfBirth: string) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const hasHadBirthday =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    if (!hasHadBirthday) age--;

    return Number.isFinite(age) && age >= 0 ? age : 0;
};

const fetchDoctor = async (id: string): Promise<DoctorProfile> => {
    const { data } = await axiosConfig.get<DoctorResponse>(`/user/${id}`);

    const doctor = data.data;

    const apiDoctor: DoctorApiProfile = {
        id: doctor._id,
        name: doctor.name,
        role: doctor.role,
        slug: doctor.slug,
        email: doctor.email,
        phone: doctor.phone,
        specialty: doctor.specialty,
        gender: parseDoctorGender(doctor.gender),
        dateOfBirth: doctor.dateOfBirth ?? "",
        clinicAddress: doctor.clinicAddress,
        experienceYears: doctor.experienceYears,
        bio: doctor.bio,
        image: resolveUserImage(doctor.img),
        workingHours: doctor.workingHours,
        certificates: (doctor.certificates ?? []).map((certificate) => ({
            id: certificate._id,
            title: certificate.title,
            subtitle: certificate.desc ?? "",
            image: certificate.file ?? certificate.image ?? "",
        })),
        awards: (doctor.awards ?? []).map((award) => ({
            id: award._id,
            title: award.title,
            subtitle: award.desc ?? "",
            image: award.file ?? award.image ?? "",
        })),
    };

    return {
        ...apiDoctor,
        age: calculateAge(apiDoctor.dateOfBirth),
        reservations: [],
        reservationsTotal: 0,
    };
};

export const useDoctor = (id: string) => {
    return useQuery({
        queryKey: ["doctor", id],
        queryFn: () => fetchDoctor(id),
        enabled: Boolean(id),
    });
};

export default useDoctor;
