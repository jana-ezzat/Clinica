"use client";

import { useLocale } from "next-intl";
import Badge, { type BadgeTone } from "@/shared/components/atoms/Badge";
import { formatTime } from "../../lib/formatTime";
import type {
  DoctorReservation,
  DoctorReservationStatus,
  DoctorVisitType,
} from "../../types/doctor";

const STATUS_TONES: Record<DoctorReservationStatus, BadgeTone> = {
  confirmed: "success",
  pending: "neutral",
  cancelled: "red",
};

interface DoctorReservationRowProps {
  reservation: DoctorReservation;
  statusLabels: Record<DoctorReservationStatus, string>;
  visitTypeLabels: Record<DoctorVisitType, string>;
}

export default function DoctorReservationRow({
  reservation,
  statusLabels,
  visitTypeLabels,
}: DoctorReservationRowProps) {
  const locale = useLocale();

  return (
    <tr className="ds-border-gray border-b transition-colors hover:bg-black/[0.02]">
      <td className="px-8 py-4">
        <span className="ds-text font-medium">{reservation.patient}</span>
      </td>
      <td className="ds-text-secondary px-4 py-3 text-sm">
        {visitTypeLabels[reservation.visitTypeKey]}
      </td>
      <td className="ds-text-secondary px-4 py-3 text-sm">
        {formatTime(reservation.time, locale)}
      </td>
      <td className="px-4 py-3">
        <Badge tone={STATUS_TONES[reservation.status]}>
          {statusLabels[reservation.status]}
        </Badge>
      </td>
    </tr>
  );
}
