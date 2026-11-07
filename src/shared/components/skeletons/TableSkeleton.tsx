// src/shared/components/molecules/TableSkeleton.tsx

interface TableSkeletonProps {
    columns: number;
    rows?: number;
}

export default function TableSkeleton({
    columns,
    rows = 6,
}: TableSkeletonProps) {
    return (
        <>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <tr
                    key={rowIndex}
                    className="animate-pulse border-b last:border-b-0"
                >
                    {Array.from({ length: columns }).map((_, columnIndex) => (
                        <td key={columnIndex} className="px-4 py-4">
                            <div className="h-4 w-3/4 rounded bg-muted" />
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
}