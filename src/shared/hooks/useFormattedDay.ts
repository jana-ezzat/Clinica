"use client";
import { useMemo, useSyncExternalStore } from "react";
import { useLocale } from "next-intl";
import { getLocalDateString } from "@/lib/utils";

const subscribe = () => () => {};
const getSnapshot = () => getLocalDateString(new Date());
const getServerSnapshot = () => null;

const useFormattedDay = (): string | undefined => {
  const locale = useLocale();
  const today = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return useMemo(() => {
    if (!today) return undefined;
    return new Intl.DateTimeFormat(`${locale}-u-nu-latn`, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(`${today}T00:00:00`));
  }, [today, locale]);
};

export default useFormattedDay;
