"use client";

import { usePDF } from "@react-pdf/renderer";
import InvoicePdf from "../molecules/InvoicePdf";

export function useDownloadPdf(
  props: React.ComponentProps<typeof InvoicePdf>,
  fileName: string,
) {
  const [instance] = usePDF({
    document: <InvoicePdf {...props} />,
  });

  const handleDownload = () => {
    if (!instance.url) return;

    const link = document.createElement("a");

    

    link.href = instance.url;
    link.download = `${fileName}.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    handleDownload,
    isDownloading: instance.loading,
  };
}
