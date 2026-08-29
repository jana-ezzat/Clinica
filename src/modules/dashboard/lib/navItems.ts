import {
  MdGridView,
  MdOutlineGroup,
  MdOutlineMedicalServices,
  MdOutlineCalendarToday,
  MdOutlineReceiptLong,
  MdOutlineShowChart,
  MdOutlineSettings,
} from "react-icons/md";
import type { IconType } from "react-icons";

export type NavItem = {
  label: string;
  href: string;
  icon: IconType;
};

export const navItems: NavItem[] = [
  { label: "الرئيسية", href: "/dashboard", icon: MdGridView },
  { label: "المرضى", href: "/dashboard/patients", icon: MdOutlineGroup },
  {
    label: "الأطباء",
    href: "/dashboard/doctors",
    icon: MdOutlineMedicalServices,
  },
  {
    label: "المواعيد",
    href: "/dashboard/appointments",
    icon: MdOutlineCalendarToday,
  },
  {
    label: "الفواتير",
    href: "/dashboard/invoices",
    icon: MdOutlineReceiptLong,
  },
  { label: "التقارير", href: "/dashboard/reports", icon: MdOutlineShowChart },
  { label: "الأعدادات", href: "/dashboard/settings", icon: MdOutlineSettings },
];
