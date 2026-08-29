// src/modules/dashboard/patients/components/molecules/TableHeader.tsx
interface TableHeaderProps {
  labels: {
    name: string;
    type: string;
    nationality: string;
    phone: string;
    email: string;
  };
}

export default function TableHeader({ labels }: TableHeaderProps) {
  return (
    <thead>
      <tr className="ds-border-gray border-b ">
        <th className="ds-text-secondary px-5 py-5 text-sm font-medium">
          {labels.name}
        </th>
        <th className="ds-text-secondary px-5 py-5 text-sm font-medium">
          {labels.type}
        </th>
        <th className="ds-text-secondary px-5 py-5 text-sm font-medium">
          {labels.nationality}
        </th>
        <th className="ds-text-secondary px-5 py-5 text-sm font-medium">
          {labels.phone}
        </th>
        <th className="ds-text-secondary px-5 py-5 text-sm font-medium">
          {labels.email}
        </th>
      </tr>
    </thead>
  );
}
