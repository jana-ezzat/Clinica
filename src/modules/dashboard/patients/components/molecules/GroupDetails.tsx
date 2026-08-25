import Title from "@/shared/components/atoms/Title";

interface Props {
  title: string;
  items: string[];
  bgColor?: string;
}

export default function GroupDetails({ title, items, bgColor }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <Title size="md" className="text-base sm:text-lg md:text-xl">
        {title}
      </Title>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <div
            key={item}
            className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium ds-text ${bgColor}`}
          >
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
