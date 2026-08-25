import Text from "@/shared/components/atoms/Text";
import { TiPencil } from "react-icons/ti";

interface Props {
  visitNumber: string;
  doctor: string;
  date: string;
}

export default function VisitMeta({ visitNumber, doctor, date }: Props) {
  return (
    <div className="flex items-center justify-between  rounded-xl px-4 py-3">
      <div className="flex flex-col  gap-1">
        <Text size="sm" variant="secondary">
          {visitNumber} زيارة رقم
        </Text>
        <Text size="sm" variant="secondary">
          {date} - {doctor}
        </Text>
      </div>

      <button>
        <TiPencil size={16} />
      </button>
    </div>
  );
}
