"use client";
import { MdPerson, MdLogout } from "@/assets/icons/icons";
import { useEffect, useRef, useState } from "react";
import { menuItems } from "../../lib/menuItems";
import Link from "next/link";
import Text from "@/shared/components/atoms/Text";
import { useTranslations } from "next-intl";
import useLogout from "@/modules/auth/hooks/useLogout";
const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("dashboard.sidebar");
  const { logout } = useLogout();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!isOpen) return;
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);
  return (
    <div className="relative" ref={dropDownRef}>
      {/* Button */}
      <button
        onClick={() => setIsOpen((pre) => !pre)}
        className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full ds-bg-icon cursor-pointer"
      >
        <MdPerson size={20} className="ds-text-primary" />
      </button>

      {/* DropDown */}
      <div
        className={`absolute top-12 w-60 rounded-xl border border-gray-200 ds-bg shadow-lg z-50 overflow-hidden origin-top transition-all duration-200 ease-out
         ltr:right-0 ltr:origin-top-right
         rtl:left-0 rtl:origin-top-left
       ${
         isOpen
           ? "opacity-100 scale-100 translate-y-0"
           : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
       }`}
      >
        <div className="flex flex-col py-2 ">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="group flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-gray-100"
            >
              <item.icon size={18} className="ds-dark group-hover:text-black" />

              <Text
                size="sm"
                variant="primary"
                className="group-hover:text-black"
              >
                {t(item.labelKey)}
              </Text>
            </Link>
          ))}

          <button
            onClick={logout}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors w-full text-red-500 border-t border-gray-100 hover:hover:bg-red-50 cursor-pointer"
          >
            <MdLogout size={18} />
            <Text size="sm" className="text-red-500">
              {t("logout")}
            </Text>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
