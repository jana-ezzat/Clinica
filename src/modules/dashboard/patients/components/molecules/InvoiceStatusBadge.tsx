// src/modules/dashboard/patients/components/molecules/InvoiceStatusBadge.tsx
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { InvoiceStatus } from "../../types/invoice";
import Badge from "@/shared/components/atoms/Badge";

const STATUS_STYLES: Record<InvoiceStatus, string> = {
    paid: "bg-green-100 text-green-700",
    partial: "bg-yellow-100 text-yellow-700",
    unpaid: "bg-red-100 text-red-700",
};

const InvoiceStatusBadge = ({ status }: { status: InvoiceStatus }) => {
    const t = useTranslations("patients.details.invoices.status");

    return (
        <Badge className={cn("rounded-full px-3 py-1 text-xs font-medium", STATUS_STYLES[status])}>
            {t(status)}
        </Badge>
    );
};

export default InvoiceStatusBadge;