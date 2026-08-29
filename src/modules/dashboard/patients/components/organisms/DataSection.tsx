import Accordion from "../molecules/Accordion";
import DataField from "@/shared/components/atoms/DataField";

export default function DataSection() {
  return (
    <Accordion title="البيانات الأساسية">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <DataField label="الاسم الرباعي" value="احمد محمد علي السالم" />
        <DataField label="النوع" value="ذكر" />
        <DataField label="تاريخ الميلاد" value="15/05/1989" />

        <DataField label="العمر" value="35 سنه" />
        <DataField label="الرقم القومي" value="1234567890" />
        <DataField label="رقم الهاتف" value="01271644001" />

        <DataField label="رقم الهاتف إضافي" value="012133849202" />
        <DataField
          label="البريد الالكتروني"
          value="ahmedmohamed102@gmail.com"
        />
        <div />

        <DataField
          label="العنوان"
          value="محافظة الجيزه - 6 اكتوبر - الحي الثالث - المجاوره 8 - شارع 40"
          fullWidth
        />
      </div>
    </Accordion>
  );
}
