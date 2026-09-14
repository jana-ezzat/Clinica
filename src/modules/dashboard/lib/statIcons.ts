import {
  MdOutlineWarningAmber,
  MdOutlineAttachMoney,
  MdOutlineCalendarToday,
  MdOutlineGroup,
} from "react-icons/md";
import type { StatCardId, StatCardIconConfig } from "@/shared/types/stats";

export const dashboardStatIcons: Partial<Record<StatCardId, StatCardIconConfig>> = {
  emergencyCases: { icon: MdOutlineWarningAmber, tone: "red" },
  revenue: { icon: MdOutlineAttachMoney, tone: "success" },
  appointments: { icon: MdOutlineCalendarToday, tone: "info" },
  todayPatients: { icon: MdOutlineGroup, tone: "orange" },
};
