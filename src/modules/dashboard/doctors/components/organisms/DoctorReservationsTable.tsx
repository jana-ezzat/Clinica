"use client";

import { useState } from "react";
import TableCard from "@/shared/components/molecules/TableCard";
import TableHeaderRow from "@/shared/components/molecules/TableHeaderRow";
import Pagination from "@/shared/components/molecules/Pagination";
import StatusCard from "@/shared/components/atoms/StatusCard";
import Title from "@/shared/components/atoms/Title";
import DoctorReservationRow from "../molecules/DoctorReservationRow";
import type {
  DoctorReservation,
  DoctorReservationStatus,
  DoctorVisitType,
} from "../../types/doctor";

interface DoctorReservationsTableProps {
  title: string;
  reservations: DoctorReservation[];
  totalItems: number;
  itemsPerPage?: number;
  columnLabels: {
    patient: string;
    examType: string;
    date: string;
    status: string;
  };
  statusLabels: Record<DoctorReservationStatus, string>;
  visitTypeLabels: Record<DoctorVisitType, string>;
  emptyTitle: string;
  emptyDescription: string;
  ofLabel: string;
}

export default function DoctorReservationsTable({
  title,
  reservations,
  totalItems,
  itemsPerPage = 10,
  columnLabels,
  statusLabels,
  visitTypeLabels,
  emptyTitle,
  emptyDescription,
  ofLabel,
}: DoctorReservationsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex flex-col gap-4">
      <Title size="sm" className="p-0! font-bold">
        {title}
      </Title>

      {reservations.length === 0 ? (
        <StatusCard title={emptyTitle} description={emptyDescription} />
      ) : (
        <TableCard
          className="ds-bg-card ds-shadow-sm overflow-hidden rounded-[18px]"
          footer={
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              ofLabel={ofLabel}
            />
          }
        >
          <TableHeaderRow
            columns={[
              columnLabels.patient,
              columnLabels.examType,
              columnLabels.date,
              columnLabels.status,
            ]}
          />
          <tbody>
            {reservations.map((reservation) => (
              <DoctorReservationRow
                key={reservation.id}
                reservation={reservation}
                statusLabels={statusLabels}
                visitTypeLabels={visitTypeLabels}
              />
            ))}
          </tbody>
        </TableCard>
      )}
    </div>
  );
}
