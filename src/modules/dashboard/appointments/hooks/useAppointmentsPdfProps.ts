"use client";
import { useTranslations } from "next-intl";
import useAppointments from "./useAppointments";

export function useAppointmentsPdfProps() {
  const t = useTranslations("appointments");
  const { data: appointments } = useAppointments();

  return {
    brand: "كلينيكا",
    title: t("pageTitle"),
    generatedOn: t("stats.date"),
    appointments: (appointments ?? []).map((a) => ({
      name: a.name,
      bookingType: t(`bookingTypes.${a.bookingType}`),
      status: t(`statuses.${a.status}`),
      bookingDate: a.bookingDate,
      bookingTime: a.bookingTime,
    })),
    labels: {
      name: t("table.name"),
      bookingType: t("table.bookingType"),
      status: t("table.status"),
      bookingDate: t("table.bookingDate"),
      bookingTime: t("table.bookingTime"),
    },
  };
}
