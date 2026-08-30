import { cn } from "@/lib/cn";
import Text from "@/shared/components/atoms/Text";

interface Props {
  label: string;
  tone?: "gray" | "green" | "orange" | "purple" | "cyan";
  children: React.ReactNode;
}
const tones = {
  gray: "bg-[#64748B26]",
  green: "bg-[#E8FFEA]/60",
  orange: "bg-[#FFE8D3]/60",
  purple: "bg-[#F2E9FF]/50",
  cyan: "bg-[#4DB6AC26]",
};

export default function InfoBox({ label, tone = "gray", children }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <Text size="sm" variant="secondary" className="font-medium">
        {label}
      </Text>
      <div className={cn("rounded-lg p-3", tones[tone])}>
        <div className="text-sm ds-text leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
