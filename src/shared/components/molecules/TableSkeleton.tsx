import Skeleton from "../atoms/Skeleton";

interface TableSkeletonProps {
  columns: number;
  rows?: number;
}

export default function TableSkeleton({
  columns,
  rows = 6,
}: TableSkeletonProps) {
  return (
    <tbody aria-hidden="true">
      {Array.from({ length: rows }, (_, r) => (
        <tr key={r} className="ds-border-gray border-b">
          {Array.from({ length: columns }, (_, c) => (
            <td key={c} className="px-5 py-4">
              <Skeleton className="h-4 w-full max-w-32" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
