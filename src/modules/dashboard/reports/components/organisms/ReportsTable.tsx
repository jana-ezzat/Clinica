"use client";

import { Search, CalendarDays } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import Input from "@/shared/components/atoms/Input";
import Text from "@/shared/components/atoms/Text";
import Pagination from "@/shared/components/molecules/Pagination";
import TableCard from "@/shared/components/molecules/TableCard";

import {
  reportsMockData,
  type ReportData,
} from "@/modules/dashboard/lib/mockData";

import ReportTableRow from "../molecules/ReportTableRow";
import TableHeaderRow from "@/shared/components/molecules/TableHeaderRow";

const ITEMS_PER_PAGE = 5;

export default function ReportsTable() {
  const t = useTranslations("reports");

  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const bookingTypes: Record<ReportData["bookingType"], string> = {
    consultation: t("bookingTypes.consultation"),
    regular: t("bookingTypes.regular"),
    emergency: t("bookingTypes.emergency"),
  };

  const statuses: Record<ReportData["status"], string> = {
    paid: t("statuses.paid"),
    pending: t("statuses.pending"),
    overdue: t("statuses.overdue"),
  };

  const paymentMethods: Record<ReportData["paymentMethod"], string> = {
    cash: t("paymentMethods.cash"),
    visa: t("paymentMethods.visa"),
  };

  const filteredReports = useMemo(() => {
    return reportsMockData.filter((report) => {
      const matchesSearch = report.reportName
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesDate = !date || report.bookingDate === date;

      return matchesSearch && matchesDate;
    });
  }, [search, date]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredReports.length / ITEMS_PER_PAGE),
  );
  const page = Math.min(currentPage, totalPages);

  const paginatedReports = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return filteredReports.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredReports, page]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleDateChange = (value: string) => {
    setDate(value);
    setCurrentPage(1);
  };

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Text size="lg" className="font-bold">
            {t("table.title")}
          </Text>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="w-full sm:w-64">
            <Input
              value={search}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder={t("table.searchPlaceholder")}
              icon={<Search size={18} />}
            />
          </div>

          <div className="w-full sm:w-48">
            <Input
              type="date"
              value={date}
              onChange={(event) => handleDateChange(event.target.value)}
              trailingIcon={<CalendarDays size={18} />}
              aria-label={t("table.dateFilter")}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <TableCard
        minWidth="min-w-[900px]"
        footer={
          filteredReports.length === 0 ? (
            <div className="flex min-h-40 items-center justify-center">
              <Text size="sm" variant="secondary">
                {t("table.empty")}
              </Text>
            </div>
          ) : (
            <Pagination
              currentPage={page}
              totalItems={filteredReports.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}
            />
          )
        }>
        <TableHeaderRow
          columns={[
            t("table.receivedFrom"),
            t("table.bookingType"),
            t("table.status"),
            t("table.bookingDate"),
            t("table.paymentMethod"),
            t("table.actions"),
          ]}
        />

        <tbody>
          {paginatedReports.map((report) => (
            <ReportTableRow
              key={report.id}
              report={report}
              labels={{
                bookingTypes,
                statuses,
                paymentMethods,
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
