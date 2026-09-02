import type { ComponentType, SVGProps } from "react";
import type { BadgeTone } from "@/shared/components/atoms/Badge";

export type StatCardId =
  | "emergencyCases"
  | "revenue"
  | "appointments"
  | "todayPatients"
  | "confirmationRate"
  | "confirmedToday"
  | "bookingsToday";

export type StatCardData = {
  id: StatCardId;
  label: string;
  value: string;
  delta: string;
  deltaPositive: boolean;
  date?: string;
};

export type StatCardIconConfig = {
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
  tone: BadgeTone;
};
