"use client";
import { Pencil, ChevronLeft, Trash } from "@/assets/icons/icons";
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

  const handleDelete = async () => {
    await onDelete();
    handleBack();
  };

  return (
    <div className="flex w-full items-center gap-2 sm:w-auto sm:gap-3">
      {/* Edit */}
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="order-1 cursor-pointer inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-50 px-3 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500/10 dark:text-blue-300 dark:hover:bg-blue-500/20 sm:order-1 sm:px-4"
      >
        <Pencil size={15} />
        {label}
      </button>

      {/* Delete */}
      <button
        type="button"
        onClick={handleDelete}
        disabled={disabled}
        className="order-2 cursor-pointer inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-red-50 px-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20 sm:order-2 sm:px-4"
      >
        <Trash size={15} />
        {deleteText}
      </button>

        <Button
        type="button"
        variant="outline"
        onClick={handleBack}
        className="order-3 me-auto h-10 w-10 shrink-0 p-0 sm:order-3 sm:ms-0 sm:me-0"
      >
        <ChevronLeft size={20} />
      </Button>
    </div>
  );
}
