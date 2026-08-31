import {
  MdOutlineWarningAmber,
  MdOutlineAttachMoney,
  MdOutlineCalendarToday,
  MdOutlineGroup,
} from "react-icons/md";
import type { StatCardId } from "@/shared/types/stats";
import type { ComponentType, SVGProps } from "react";

export const dashboardStatIcons: Record<
  StatCardId,
  ComponentType<SVGProps<SVGSVGElement> & { size?: number }>
> = {
  emergencyCases: MdOutlineWarningAmber,
  revenue: MdOutlineAttachMoney,
  appointments: MdOutlineCalendarToday,
  todayPatients: MdOutlineGroup,
};
