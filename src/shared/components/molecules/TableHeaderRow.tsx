export default function TableHeaderRow({ columns }: { columns: string[] }) {
  return (
    <thead>
      <tr className="ds-bg-button-primary text-white">
        {columns.map((label, i) => (
          <th key={i} className="px-5 py-5 text-start text-sm font-medium">
            {label}
          </th>
        ))}
      </tr>
    </thead>
  );
}
