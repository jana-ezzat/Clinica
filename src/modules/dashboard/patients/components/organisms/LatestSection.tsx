import Accordion from "../molecules/Accordion";
import AppointmentRow from "../molecules/AppoitmentsRow";

export default function LatestSection() {
  return (
    <Accordion title="أخر المواعيد">
      <div className="flex flex-col divide-y ds-border-gray">
        <AppointmentRow
          doctor="د. أحمد محمد"
          type="كشف"
          datetime="09:30 - 2024-11-10 ص"
          status="مؤكد"
          statusColor="green"
        />
        <AppointmentRow
          doctor="د. أحمد محمد"
          type="متابعة"
          datetime="10:00 - 2024-11-15 ص"
          status="تم"
          statusColor="info"
        />
      </div>
    </Accordion>
  );
}
