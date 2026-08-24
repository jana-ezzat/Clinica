"use client";

import { Plus, CalendarDays, Search, X, ArrowRight, ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import Input from "@/shared/components/atoms/Input";
import Select from "@/shared/components/atoms/Select";
import Button from "@/shared/components/atoms/Button";
import Text from "@/shared/components/atoms/Text";

type ReportFiltersState = {
    reportType: string;
    receivedFrom: string;
    bookingType: string;
    status: string;
    bookingDate: string;
    paymentMethod: string;
};

const initialFilters: ReportFiltersState = {
    reportType: "",
    receivedFrom: "",
    bookingType: "",
    status: "",
    bookingDate: "",
    paymentMethod: "",
};

interface ReportsFiltersProps {
    onChange?: (filters: ReportFiltersState) => void;
}

export default function ReportsFilters({
    onChange,
}: ReportsFiltersProps) {
    const t = useTranslations("reports");
    const [filters, setFilters] = useState(initialFilters);

    const updateFilter = (
        key: keyof ReportFiltersState,
        value: string,
    ) => {
        const nextFilters = {
            ...filters,
            [key]: value,
        };

        setFilters(nextFilters);
        onChange?.(nextFilters);
    };

    const reportTypeOptions = [
        {
            value: "booking",
            label: t("reportTypes.booking"),
        },
    ];

    const bookingTypeOptions = [
        {
            value: "consultation",
            label: t("bookingTypes.consultation"),
        },
        {
            value: "regular",
            label: t("bookingTypes.regular"),
        },
        {
            value: "emergency",
            label: t("bookingTypes.emergency"),
        },
    ];

    const statusOptions = [
        {
            value: "paid",
            label: t("statuses.paid"),
        },
        {
            value: "pending",
            label: t("statuses.pending"),
        },
        {
            value: "overdue",
            label: t("statuses.overdue"),
        },
    ];

    const paymentMethodOptions = [
        {
            value: "cash",
            label: t("paymentMethods.cash"),
        },
        {
            value: "visa",
            label: t("paymentMethods.visa"),
        },
    ];

    return (
        <section className="ds-bg-card ds-shadow-sm rounded-[18px] p-5 sm:p-6">
            <div className="mb-6">
                <h2 className="ds-text text-lg font-bold">
                    {t("filters.title")}
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                <Select
                    label={t("filters.reportType")}
                    value={filters.reportType}
                    onChange={(value) => updateFilter("reportType", value)}
                    options={reportTypeOptions}
                    placeholder={t("filters.selectPlaceholder")}
                />

                <div className="flex flex-col gap-2">
                    <Text size="sm" variant="secondary">
                        {t("filters.receivedFrom")}
                    </Text>
                    <Input
                        placeholder={t("filters.receivedFromPlaceholder")}
                        value={filters.receivedFrom}
                        onChange={(event) =>
                            updateFilter("receivedFrom", event.target.value)}
                        trailingIcon={<Search size={18} />}
                    />
                </div>

                <Select
                    label={t("filters.bookingType")}
                    value={filters.bookingType}
                    onChange={(value) => updateFilter("bookingType", value)}
                    options={bookingTypeOptions}
                    placeholder={t("filters.selectPlaceholder")}
                />

                <Select
                    label={t("filters.status")}
                    value={filters.status}
                    onChange={(value) => updateFilter("status", value)}
                    options={statusOptions}
                    placeholder={t("filters.selectPlaceholder")}
                />

                <div className="flex flex-col gap-2">
                    <Text size="sm" variant="secondary">
                        {t("filters.bookingDate")}
                    </Text>

                    <Input
                        type="date"
                        value={filters.bookingDate}
                        onChange={(event) =>
                            updateFilter("bookingDate", event.target.value)
                        }
                        trailingIcon={<CalendarDays size={18} />}
                    />
                </div>

                <Select
                    label={t("filters.paymentMethod")}
                    value={filters.paymentMethod}
                    onChange={(value) => updateFilter("paymentMethod", value)}
                    options={paymentMethodOptions}
                    placeholder={t("filters.selectPlaceholder")}
                />
            </div>

            <div className="mt-6 flex justify-between">
                <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    className="gap-2"
                >
                    <Plus size={18} />
                    {t("filters.addCondition")}
                </Button>
                <div className="flex gap-2">

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-2"
                    >
                        <X size={18} />
                        {t("filters.resetFilters")}
                    </Button>
                    <Button
                        type="button"
                        variant="primary"
                        size="sm"
                        className="gap-2"
                    >
                        {t("filters.applyFilters")}
                        <ArrowRight
                            size={18}
                            className="rtl:scale-x-[-1]"
                        />
                    </Button>
                </div>
            </div>
        </section>
    );
}