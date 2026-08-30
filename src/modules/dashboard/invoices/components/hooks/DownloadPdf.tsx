"use client";

import { pdf } from "@react-pdf/renderer";
import { useState } from "react";
import InvoicePdf from "../molecules/InvoicePdf";

export function useDownloadPdf(
  props: React.ComponentProps<typeof InvoicePdf>,
  fileName: string,
) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      const blob = await pdf(<InvoicePdf {...props} />).toBlob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    handleDownload,
    isDownloading,
    showSuccess,
    setShowSuccess,
  };
}
