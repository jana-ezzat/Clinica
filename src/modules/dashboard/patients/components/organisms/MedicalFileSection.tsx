
import Accordion from "../molecules/Accordion";
import FieldGroup from "../atoms/FieldGroup";
import DataField from "@/shared/components/atoms/DataField";
import IconList from "@/shared/components/molecules/IconList";
import { Pill, Scissors } from "lucide-react";
import Badge from "@/shared/components/atoms/Badge";

export default function MedicalFileSection() {
  return (
    <Accordion title="الملف الطبي">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <FieldGroup label="فصيلة الدم">
          <Badge tone="red">A+</Badge>
        </FieldGroup>

        <FieldGroup label="الحساسية">
          <Badge tone="pink">البنسلين</Badge>
          <Badge tone="yellow">الفول السودانى</Badge>
        </FieldGroup>

        <FieldGroup label="الامراض المزمنة">
          <Badge tone="yellow">السكري من النوع الثاني</Badge>
          <Badge tone="info">ارتفاع ضغط الدم</Badge>
        </FieldGroup>

        <IconList
          label="الأدوية الحالية"
          icon={Pill}
          items={["كونكور 5 مجم مرة يومياً", "جلوكوفاج 500 مجم مرتين يومياً"]}
          iconClassName="ds-color-secondary"
        />

        <IconList
          label="العمليات السابقة"
          icon={Scissors}
          items={["عملية غضروف - 2020", "استئصال المرارة - 2018"]}
          iconClassName="text-red-500"
        />

        <DataField
          label="تاريخ العائلة المرضي"
          value="والدة مصابة بالسكري، والدة مصابة بارتفاع ضغط الدم"
          fullWidth
        />
        <DataField
          label="التاريخ المرضي"
          value="لم تشخيص المريض بأي أمراض مزمنة بخلاف ما ذكر"
          fullWidth
        />
      </div>
    </Accordion>
  );
}
