export type StatCardId =
  | "emergencyCases"
  | "revenue"
  | "appointments"
  | "todayPatients";

export type StatCardData = {
  id: StatCardId;
  label: string;
  value: string;
  delta: string;
  deltaPositive: boolean;
};
