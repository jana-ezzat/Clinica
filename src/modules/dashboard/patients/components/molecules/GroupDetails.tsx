import Title from "@/shared/components/atoms/Title";

interface Props {
  title: string;
  items: string[];
  bgColor?: string;
  emptyLabel?: string;
}

export default function GroupDetails({
  title,
  items,
  bgColor,
  emptyLabel = "—",
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <Title size="md" className="text-base sm:text-lg md:text-xl">
        {title}
      </Title>
      {items.length === 0 ? (
        <span className="ds-text-secondary text-sm">{emptyLabel}</span>
      ) : (
        <div className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <div
              key={`${item}-${i}`}
              className={`ds-text inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium ${bgColor}`}>
              <span>{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
