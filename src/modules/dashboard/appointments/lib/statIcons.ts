import { PieChart, CheckCircle2, Users } from "lucide-react";
import type { StatCardId, StatCardIconConfig } from "@/shared/types/stats";

export const appointmentStatIcons: Partial<
  Record<StatCardId, StatCardIconConfig>
> = {
  confirmationRate: { icon: PieChart, tone: "info" },
  confirmedToday: { icon: CheckCircle2, tone: "success" },
  bookingsToday: { icon: Users, tone: "orange" },
};
