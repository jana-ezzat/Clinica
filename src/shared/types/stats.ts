import type { ComponentType, SVGProps } from "react";
import type { BadgeTone } from "@/shared/components/atoms/Badge";

export type StatCardId =
  | "emergencyCases"
  | "todayPatients"
  | "revenue"
  | "appointments"
  | "confirmationRate"
  | "confirmedToday"
  | "bookingsToday";

export type StatCardData = {
  id: StatCardId;
  labelKey: string;
  value: string;
  delta: string;
  deltaPositive: boolean;
  date?: string;
};
export const statCards: StatCardData[] = [
  {
    id: "todayPatients",
    labelKey: "todayPatients",
    value: "43",
    delta: "+12%",
    deltaPositive: true,
  },
  {
    id: "appointments",
    labelKey: "appointments",
    value: "3",
    delta: "+80%",
    deltaPositive: true,
  },
  {
    id: "revenue",
    labelKey: "revenue",
    value: "40.00 EG",
    delta: "+80%",
    deltaPositive: true,
  },
  {
    id: "emergencyCases",
    labelKey: "emergencyCases",
    value: "3",
    delta: "+2%",
    deltaPositive: false,
  },
];
export interface StatCardDisplayData {
  id: StatCardId;
  label: string;
  value: string | number;
  delta: string;
  deltaPositive: boolean;
  date?: string;
}

export type StatCardIconConfig = {
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
  tone: BadgeTone;
};
