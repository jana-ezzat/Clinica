"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormatter, useNow, useTranslations } from "next-intl";
import { MdNotificationsNone } from "react-icons/md";
import Button from "@/shared/components/atoms/Button";
import Text from "@/shared/components/atoms/Text";
import useNotifications, {
  type AppNotification,
} from "@/modules/dashboard/notifications/hooks/useNotifications";
import useMarkNotificationRead from "@/modules/dashboard/notifications/hooks/useMarkNotificationRead";

// The backend sends English titles with inconsistent casing ("invoice" vs
// "Patient"), so we key off relatedModel + the action found in the title.
const EVENT_KEYS: Record<string, string> = {
  "invoice.created": "invoiceCreated",
  "invoice.updated": "invoiceUpdated",
  "appointment.created": "appointmentCreated",
  "appointment.updated": "appointmentUpdated",
  "appointment.deleted": "appointmentDeleted",
  "patient.created": "patientCreated",
  "patient.updated": "patientUpdated",
  "settings.updated": "settingsUpdated",
};

const getAction = (title: string) => {
  if (/delet/i.test(title)) return "deleted";
  if (/creat|new/i.test(title)) return "created";
  if (/updat/i.test(title)) return "updated";
  return "";
};

const getEventKey = (n: AppNotification) =>
  EVENT_KEYS[`${n.relatedModel.toLowerCase()}.${getAction(n.title)}`];

const getHref = (n: AppNotification): string | null => {
  switch (n.relatedModel) {
    case "Invoice":
      return `/dashboard/invoices/${n.relatedId}`;
    case "Patient":
      return `/dashboard/patients/${n.relatedId}`;
    case "Appointment":
      return "/dashboard/appointments";
    case "Settings":
      return "/dashboard/settings";
    default:
      return null;
  }
};

export default function NotificationBell() {
  const t = useTranslations("dashboard.header.notifications");
  const format = useFormatter();
  const now = useNow({ updateInterval: 60_000 });
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError } = useNotifications();
  const markRead = useMarkNotificationRead();

  const notifications = data?.notifications ?? [];
  const unreadCount = data?.unreadCount ?? 0;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!isOpen) return;
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = (n: AppNotification) => {
    if (!n.isRead) markRead.mutate(n._id);
    setIsOpen(false);
    const href = getHref(n);
    if (href) router.push(href);
  };

  return (
    <div className="relative" ref={containerRef}>
      <Button
        variant="ghost"
        size="icon"
        aria-label={t("label")}
        aria-expanded={isOpen}
        className="relative !p-0"
        onClick={() => setIsOpen((prev) => !prev)}>
        <MdNotificationsNone size={24} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ltr:-right-1 rtl:-left-1">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </Button>

      <div
        className={`absolute top-12 z-50 w-80 origin-top overflow-hidden rounded-xl border border-gray-200 ds-bg shadow-lg transition-all duration-200 ease-out ltr:right-0 ltr:origin-top-right rtl:left-0 rtl:origin-top-left ${
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-95 opacity-0"
        }`}>
        <div className="border-b border-gray-200 px-4 py-3">
          <Text size="sm" variant="primary" className="p-0 font-bold">
            {t("title")}
          </Text>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {isLoading && (
            <Text size="sm" className="p-4 text-center">
              {t("loading")}
            </Text>
          )}

          {isError && (
            <Text size="sm" className="p-4 text-center">
              {t("error")}
            </Text>
          )}

          {!isLoading && !isError && notifications.length === 0 && (
            <Text size="sm" className="p-4 text-center">
              {t("empty")}
            </Text>
          )}

          {notifications.map((n) => {
            const eventKey = getEventKey(n);
            return (
              <button
                key={n._id}
                type="button"
                onClick={() => handleSelect(n)}
                className="flex w-full cursor-pointer items-start gap-3 border-b border-gray-100 px-4 py-3 text-start transition-colors last:border-b-0 hover:bg-black/5">
                <span
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                    n.isRead ? "bg-transparent" : "bg-red-500"
                  }`}
                />
                <div className="flex min-w-0 flex-col gap-0.5">
                  <Text
                    size="sm"
                    variant="primary"
                    className={n.isRead ? "p-0" : "p-0 font-bold"}>
                    {eventKey ? t(`events.${eventKey}`) : n.title}
                  </Text>
                  {!eventKey && (
                    <Text size="xs" className="p-0">
                      {n.message}
                    </Text>
                  )}
                  <Text size="xs" className="p-0">
                    {format.relativeTime(new Date(n.createdAt), now.getTime())}
                  </Text>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}