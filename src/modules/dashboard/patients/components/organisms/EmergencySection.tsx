import Accordion from "../molecules/Accordion";
import DataField from "@/shared/components/atoms/DataField";

export default function EmergencySection() {
  return (
    <Accordion title="جهة اتصال الطوارئ">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <DataField label="الاسم" value="احمد محمد علي السالم" />
        <DataField label="رقم الهاتف" value="01271644001" />

        <DataField label="صلة القرابة" value="الأب" />
      </div>
    </Accordion>
  );
}
