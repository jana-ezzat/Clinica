import Text from "@/shared/components/atoms/Text";
import ServicesTableHeader from "./ServicesTableHeader";
import ServicesTableRow from "./ServicesTableRow";

interface Service {
  total: string;
  discount: string;
  price: string;
  description: string;
}

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

const ServicesTable = ({ title, headers, services }: Props) => {
  return (
    <div className="overflow-hidden rounded-lg  shadow-md">
      <div className="px-5 py-3 text-start">
        <Text size="lg" variant="primary" className="font-medium">
          {title}
        </Text>
      </div>

      <table className="w-full border-collapse">
        <ServicesTableHeader {...headers} />

        <tbody>
          {services.map((service, index) => (
            <ServicesTableRow key={index} {...service} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServicesTable;
