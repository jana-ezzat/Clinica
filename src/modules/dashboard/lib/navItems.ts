import {
  MdGridView,
  MdOutlineGroup,
  MdOutlineMedicalServices,
  MdOutlineCalendarToday,
  MdOutlineReceiptLong,
  MdOutlineShowChart,
  MdOutlineSettings,
  MdPerson,
} from "react-icons/md";
import type { IconType } from "react-icons";

export type NavItem = {
  labelKey: string;
  href: string;
  icon: IconType;
  adminOnly?: boolean;
};

export const navItems: NavItem[] = [
  { labelKey: "home", href: "/dashboard", icon: MdGridView },
  { labelKey: "patients", href: "/dashboard/patients", icon: MdOutlineGroup },
  {
    labelKey: "doctors",
    href: "/dashboard/doctors",
    icon: MdOutlineMedicalServices,
    adminOnly: true,
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
    labelKey: "profile",
    href: "/dashboard/profile",
    icon: MdPerson,
  },
  {
    labelKey: "settings",
    href: "/dashboard/settings",
    icon: MdOutlineSettings,
    adminOnly: true,
  },
];
