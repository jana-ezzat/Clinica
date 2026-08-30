"use client";
import Button from "@/shared/components/atoms/Button";
import { useTranslations } from "next-intl";
import { Printer, Download, ChevronRight } from "@/assets/icons/icons";
import Text from "@/shared/components/atoms/Text";

interface Props {
  onDownload: () => void;
  isDownloading?: boolean;
}

export default function InvoiceActionsBar({
  onDownload,
  isDownloading,
}: Props) {
  const t = useTranslations("Invoice");

  return (
    <div className="flex items-center justify-between flex-wrap gap-3">
      <div className="flex items-center gap-1 text-sm ds-text">
        <ChevronRight size={30} className="ds-primary font-bold" />
        <Text variant="primary" size="sm">
          {t("invoiceNumber", { number: "INV-2024-1247" })}
        </Text>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex gap-2"
          onClick={onDownload}
          disabled={isDownloading}
        >
          <Download size={16} />
          {isDownloading ? t("downloading") : t("savePdf")}
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="flex gap-2"
          onClick={() => window.print()}
        >
          <Printer size={16} />
          {t("print")}
        </Button>
      </div>
    </div>
  );
}
