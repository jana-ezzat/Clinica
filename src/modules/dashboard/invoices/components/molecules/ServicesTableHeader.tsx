interface Props {
  total: string;
  discount: string;
  price: string;
  description: string;
}

const ServicesTableHeader = ({
  total,
  discount,
  price,
  description,
}: Props) => {
  return (
    <thead>
      <tr className="ds-bg-primary ds-text-inverse">
        <th className="px-4 py-4 text-sm font-medium ">{total}</th>

        <th className="px-4 py-4 text-sm font-medium">{discount}</th>

        <th className="px-4 py-4 text-sm font-medium">{price}</th>

        <th className="px-4 py-4 text-sm font-medium">{description}</th>
      </tr>
    </thead>
  );
};

export default ServicesTableHeader;
