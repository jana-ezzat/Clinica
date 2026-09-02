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
  labelKey: string;
  href: string;
  icon: IconType;
};

export const navItems: NavItem[] = [
  { labelKey: "home", href: "/dashboard", icon: MdGridView },
  { labelKey: "patients", href: "/dashboard/patients", icon: MdOutlineGroup },
  {
    labelKey: "doctors",
    href: "/dashboard/doctors",
    icon: MdOutlineMedicalServices,
  },
  {
    labelKey: "appointments",
    href: "/dashboard/appointments",
    icon: MdOutlineCalendarToday,
  },
  {
    labelKey: "invoices",
    href: "/dashboard/invoices",
    icon: MdOutlineReceiptLong,
  },
  { labelKey: "reports", href: "/dashboard/reports", icon: MdOutlineShowChart },
  {
    labelKey: "settings",
    href: "/dashboard/settings",
    icon: MdOutlineSettings,
  },
];
