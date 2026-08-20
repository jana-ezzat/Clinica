import Accordion from "../molecules/Accordion";
import DataField from "@/shared/components/atoms/DataField";

export default function InsuranceSection() {
  return (
    <Accordion title="بيانات التأمين">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <DataField label="شركة التأمين" value="شركة التأمين الطبي الوطنية" />
        <DataField label="رقم العضوية" value="INS-123456" />

        <DataField label="نسبة التغطية" value="80%" />
        <DataField label="تاريخ انتهاء التأمين" value="2025-12-31" />
      </div>
    </Accordion>
  );
}
