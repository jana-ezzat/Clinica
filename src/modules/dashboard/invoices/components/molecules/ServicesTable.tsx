import Text from "@/shared/components/atoms/Text";
import type { Service } from "@/modules/dashboard/lib/InvoicesData";

interface Props {
  title: string;
  headers: {
    total: string;
    discount: string;
    price: string;
    description: string;
  };
  services: Service[];
}

const GRID = "grid grid-cols-[2fr_1fr_1fr_1fr] gap-3 px-5 py-3";

export default function ServicesTable({ title, headers, services }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <Text size="lg" variant="primary" className="px-5 font-bold">
        {title}
      </Text>

      <div className="ds-bg-card ds-shadow-sm overflow-hidden rounded-xl">
        <div className={`${GRID} ds-bg-primary`}>
          <Text size="sm" className="p-0 text-start text-white">
            {headers.description}
          </Text>
          <Text size="sm" className="p-0 text-start text-white">
            {headers.price}
          </Text>
          <Text size="sm" className="p-0 text-start text-white">
            {headers.discount}
          </Text>
          <Text size="sm" className="p-0 text-start text-white">
            {headers.total}
          </Text>
        </div>

        {services.map((service) => (
          <div key={service.key} className={`${GRID} ds-border-gray border-b last:border-b-0`}>
            <Text size="sm" variant="primary" className="p-0 text-start">
              {service.description}
            </Text>
            <Text size="sm" variant="secondary" className="p-0 text-start">
              {service.price}
            </Text>
            <Text size="sm" variant="secondary" className="p-0 text-start">
              {service.discount}
            </Text>
            <Text size="sm" variant="primary" className="p-0 text-start font-bold">
              {service.total}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
}
