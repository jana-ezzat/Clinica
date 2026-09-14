import { Pencil, Trash2 } from "lucide-react";
import Button from "@/shared/components/atoms/Button";

interface RowActionsProps {
  editLabel: string;
  deleteLabel: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function RowActions({
  editLabel,
  deleteLabel,
  onEdit,
  onDelete,
}: RowActionsProps) {
  return (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={editLabel}
        onClick={onEdit}>
        <Pencil size={18} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="text-red-500"
        aria-label={deleteLabel}
        onClick={onDelete}>
        <Trash2 size={18} />
      </Button>
    </div>
  );
}
