import { CalendarDays, Siren, Users, Wallet } from "lucide-react";
import type { StatCardId } from "@/shared/types/stats";
import type { ComponentType, SVGProps } from "react";

export const reportStatIcons: Record<
  StatCardId,
  ComponentType<SVGProps<SVGSVGElement> & { size?: number }>
> = {
  todayPatients: Users,
  appointments: CalendarDays,
  revenue: Wallet,
  emergencyCases: Siren,
};
