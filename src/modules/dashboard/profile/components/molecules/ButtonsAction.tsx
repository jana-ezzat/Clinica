import Button from "@/shared/components/atoms/Button";

interface Props {
  cancelText: string;
  saveText: string;
  onClose: () => void;
  isSaving?: boolean;
}

export default function ButtonsAction({
  cancelText,
  saveText,
  onClose,
  isSaving = false,
}: Props) {
  return (
    <div className="flex justify-end gap-3 border-t border-gray-100 px-5 py-4 dark:border-gray-700">
      <Button
        type="button"
        variant="outline"
        onClick={onClose}
        disabled={isSaving}
      >
        {cancelText}
      </Button>

      <Button type="submit" variant="primary" disabled={isSaving}>
        <span className="inline-flex items-center gap-2">{saveText}</span>
      </Button>
    </div>
  );
}
