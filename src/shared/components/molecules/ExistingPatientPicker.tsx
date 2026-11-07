"use client";
import { useDeferredValue, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import Text from "@/shared/components/atoms/Text";
import usePatients from "@/modules/dashboard/patients/hooks/usePatients";
import { cn } from "@/lib/cn";

interface Props {
  selectedId?: string;
  onSelect: (id: string) => void;
  error?: string;
}

export default function ExistingPatientPicker({
  selectedId,
  onSelect,
  error,
}: Props) {
  const t = useTranslations("appointmentsModal.addAppointment.patient");
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const { data: patients, isLoading, isError, refetch } = usePatients();

  const filtered = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();
    const list = patients ?? [];
    return query
      ? list.filter((p) => p.name.toLowerCase().includes(query))
      : list;
  }, [patients, deferredSearch]);

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t("searchPatientPlaceholder")}
        className="ds-border w-full rounded-md border px-3 py-2 text-sm"
      />

      {isLoading && <Text size="sm">{t("loading")}</Text>}
      {isError && (
        <div className="flex items-center justify-between">
          <Text size="sm" className="text-red-500">
            {t("loadError")}
          </Text>
          <button
            type="button"
            onClick={() => refetch()}
            className="text-sm underline">
            {t("retry")}
          </button>
        </div>
      )}

      <div className="max-h-40 overflow-y-auto rounded-md border">
        {filtered.map((p) => {
          const selected = p.id === selectedId;
          return (
            <button
              key={p.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(p.id)}
              className={cn(
                "flex w-full items-center justify-between px-3 py-2 text-start text-sm hover:bg-gray-100",
                selected && "bg-gray-100 font-medium",
              )}>
              <span>
                {p.name} — <span dir="ltr">{p.phone}</span>
              </span>
              {selected && <Check size={16} />}
            </button>
          );
        })}
        {!isLoading && !isError && filtered.length === 0 && (
          <p className="px-3 py-2 text-sm text-gray-400">{t("noResults")}</p>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
