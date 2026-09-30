"use client";
import { Pencil, ChevronRight, Trash } from "@/assets/icons/icons";
import Button from "@/shared/components/atoms/Button";
import { useRouter } from "next/navigation";

interface Props {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  deleteText: string;
  onDelete: () => void;
}

export default function EditCredentialHeader({
  label,
  disabled = false,
  onClick,
  deleteText,
  onDelete,
}: Props) {
  const router = useRouter();

  const handleBack = () => {
    router.push("/dashboard/profile");
  };

  const handleDelete = async() => {
   await onDelete();
    handleBack();
  };
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg bg-blue-50 px-4 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Pencil size={15} />
        {label}
      </button>

      <button
        type="button"
        onClick={handleDelete}
        disabled={disabled}
        className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg bg-red-50 px-4 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Trash size={15} />
        {deleteText}
      </button>

      <Button
        type="button"
        variant="outline"
        onClick={handleBack}
        className=" rtl:rotate-180"
      >
        <ChevronRight size={20} />
      </Button>
    </div>
  );
}
