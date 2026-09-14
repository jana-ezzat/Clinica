import { CalendarDays, Siren, Users, Wallet } from "lucide-react";
import type { StatCardId, StatCardIconConfig } from "@/shared/types/stats";

export const reportStatIcons: Partial<Record<StatCardId, StatCardIconConfig>> = {
  todayPatients: { icon: Users, tone: "info" },
  appointments: { icon: CalendarDays, tone: "success" },
  revenue: { icon: Wallet, tone: "orange" },
  emergencyCases: { icon: Siren, tone: "red" },
}
