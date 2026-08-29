interface Props {
  total: string;
  discount: string;
  price: string;
  description: string;
}

const ServicesTableRow = ({ total, discount, price, description }: Props) => {
  return (
    <tr className="border-b border-gray-200 ds-text last:border-b-0">
      <td className="px-4 py-4 text-center text-sm ">{total}</td>

      <td className="px-4 py-4 text-center text-sm ">
        {discount}
      </td>

      <td className="px-4 py-4 text-center text-sm ">{price}</td>

      <td className="px-4 py-4 text-center text-sm ">
        {description}
      </td>
    </tr>
  );
};

export default ServicesTableRow;
