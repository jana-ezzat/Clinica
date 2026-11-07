// src\modules\dashboard\doctors\components\molecules\TableRow.tsx
"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Doctor } from "../../hooks/useDoctors";

interface TableRowProps {
    doctor: Doctor;
}

export default function TableRow({ doctor }: TableRowProps) {
    const router = useRouter();
    const t = useTranslations("doctorsList");
    return (
        <tr
            onClick={() => router.push(`/dashboard/doctors/${doctor.id}`)}
            className="ds-border-gray cursor-pointer border-b last:border-b-0 transition-colors hover:bg-black/[0.02]"
        >
            <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                    {doctor.image ? (
                        <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="h-10 w-10 rounded-full object-cover"
                        />
                    ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-medium">
                            {doctor.name.charAt(0).toUpperCase()}
                        </div>
                    )}

                    <span className="font-medium">{doctor.name}</span>
                </div>
            </td>

            <td className="px-4 py-4">
                {doctor.specialty || t("noData")}
            </td>

            <td className="px-4 py-4">
                {doctor.experienceYears > 0
                    ? `${doctor.experienceYears} years`
                    : t("noData")}
            </td>

            <td className="px-4 py-4">
                {doctor.phone || t("noData")}
            </td>

            <td className="px-4 py-4">
                {doctor.email || t("noData")}
            </td>
        </tr>
    );
}