"use client";
import { useTranslations } from "next-intl";
import { appointmentsMockData } from "../lib/mockData";

export function useAppointmentsPdfProps() {
  const t = useTranslations("appointments");

  return {
    brand: "كلينيكا",
    title: t("pageTitle"),
    generatedOn: t("stats.date"),
    appointments: appointmentsMockData.map((a) => ({
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
