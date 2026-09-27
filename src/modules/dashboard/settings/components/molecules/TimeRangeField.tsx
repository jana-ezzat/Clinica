import Text from "@/shared/components/atoms/Text";
import Input from "@/shared/components/atoms/Input";

interface Props {
  fromLabel: string;
  toLabel: string;
  fromValue: string;
  toValue: string;
  onFromChange: (v: string) => void;
  onToChange: (v: string) => void;
}

export default function TimeRangeField({
  fromLabel,
  toLabel,
  fromValue,
  toValue,
  onFromChange,
  onToChange,
}: Props) {
  return (
    <div className="flex w-md items-end gap-3">
      <div className="flex flex-1 flex-col gap-2">
        <Text size="sm" variant="secondary">
          {fromLabel}
        </Text>

        <Input
          type="time"
          value={fromValue}
          onChange={(e) => onFromChange(e.target.value)}
        />
      </div>

      <Text size="sm" variant="secondary" className="pb-2.5">
        {toLabel}
      </Text>

      <div className="flex flex-1 flex-col gap-2">
        <Input
          type="time"
          value={toValue}
          onChange={(e) => onToChange(e.target.value)}
        />
      </div>
    </div>
  );
}
