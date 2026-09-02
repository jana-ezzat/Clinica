"use client";

import { pdf } from "@react-pdf/renderer";
import { useState } from "react";
import type { DocumentProps } from "@react-pdf/renderer";

import type { ReactElement } from "react";

export function useDownloadPdf(pdfDocument: ReactElement<DocumentProps>, fileName: string) {  const [isDownloading, setIsDownloading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      const blob = await pdf(pdfDocument).toBlob();
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

  return { handleDownload, isDownloading, showSuccess, setShowSuccess };
}
