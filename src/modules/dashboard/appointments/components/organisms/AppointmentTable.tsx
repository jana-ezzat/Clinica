"use client";
import { Search, Download } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import Input from "@/shared/components/atoms/Input";
import Select from "@/shared/components/atoms/Select";
import Button from "@/shared/components/atoms/Button";
import Text from "@/shared/components/atoms/Text";
import Pagination from "@/shared/components/molecules/Pagination";
import StatusCard from "@/shared/components/atoms/StatusCard";

import useAppointments from "../../hooks/useAppointments";
import AppointmentTableRow from "../molecules/AppointmentTableRow";
import type { AppointmentBookingType } from "../../lib/mockData";
import type { AppointmentStatus } from "@/modules/dashboard/lib/mockData";
import TableCard from "@/shared/components/molecules/TableCard";
import TableHeaderRow from "@/shared/components/molecules/TableHeaderRow";

const ITEMS_PER_PAGE = 5;

export default function AppointmentsTable() {
  const t = useTranslations("appointments");

  const [search, setSearch] = useState("");
  const [bookingType, setBookingType] = useState("");
  const [date, setDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: appointments, isLoading, isError, refetch } = useAppointments();

  const bookingTypeLabels: Record<AppointmentBookingType, string> = {
    checkup: t("bookingTypes.checkup"),
    followup: t("bookingTypes.followup"),
    emergency: t("bookingTypes.emergency"),
  };

  const statusLabels: Record<AppointmentStatus, string> = {
    confirmed: t("statuses.confirmed"),
    cancelled: t("statuses.cancelled"),
    pending: t("statuses.pending"),
  };

  const bookingTypeOptions = [
    { value: "checkup", label: bookingTypeLabels.checkup },
    { value: "followup", label: bookingTypeLabels.followup },
    { value: "emergency", label: bookingTypeLabels.emergency },
  ];

  const filtered = useMemo(() => {
    if (!appointments) return [];
    return appointments.filter((a) => {
      const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase());
      const matchesType = !bookingType || a.bookingType === bookingType;
      const matchesDate = !date || a.bookingDate === date;
      return matchesSearch && matchesType && matchesDate;
    });
  }, [appointments, search, bookingType, date]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const page = Math.min(currentPage, totalPages);

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };
  const handleTypeChange = (value: string) => {
    setBookingType(value);
    setCurrentPage(1);
  };
  const handleDateChange = (value: string) => {
    setDate(value);
    setCurrentPage(1);
  };

  if (isLoading) return <StatusCard description={t("table.loading")} />;

  if (isError) {
    return (
      <StatusCard
        description={t("table.loadError")}
        tone="error"
        actionLabel={t("table.retry")}
        onAction={() => refetch()}
      />
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:w-64">
          <Input
            value={search}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder={t("filters.searchPlaceholder")}
            icon={<Search size={18} />}
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="w-full sm:w-48">
            <Select
              value={bookingType}
              onChange={handleTypeChange}
              options={bookingTypeOptions}
              placeholder={t("filters.bookingType")}
            />
          </div>

          <div className="w-full sm:w-48">
            <Input
              type="date"
              value={date}
              onChange={(event) => handleDateChange(event.target.value)}
              aria-label={t("filters.bookingDate")}
            />
          </div>
          
          <Button type="button" variant="primary" size="sm" className="gap-2">
            <Download size={18} />
            {t("filters.export")}
          </Button>
        </div>
      </div>

      <TableCard
        minWidth="min-w-[900px]"
        footer={
          filtered.length === 0 ? (
            <div className="flex min-h-40 items-center justify-center">
              <Text size="sm" variant="secondary">
                {t("table.empty")}
              </Text>
            </div>
          ) : (
            <Pagination
              currentPage={page}
              totalItems={filtered.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}
            />
          )
        }>
        <TableHeaderRow
          columns={[
            t("table.name"),
            t("table.bookingType"),
            t("table.status"),
            t("table.bookingDate"),
            t("table.bookingTime"),
            t("table.actions"),
          ]}
        />
        <tbody>
          {paginated.map((appointment) => (
            <AppointmentTableRow
              key={appointment.id}
              appointment={appointment}
              labels={{
                bookingTypes: bookingTypeLabels,
                statuses: statusLabels,
                edit: t("table.edit"),
                delete: t("table.delete"),
              }}
            />
          ))}
        </tbody>
      </TableCard>
    </section>
  );
}
