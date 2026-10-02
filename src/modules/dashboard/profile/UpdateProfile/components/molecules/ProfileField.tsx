import { FieldError, UseFormRegister } from "react-hook-form";
import Text from "@/shared/components/atoms/Text";
import Input from "@/shared/components/atoms/Input";
import { cn } from "@/lib/cn";
import { UpdateData } from "../../../lib/Profile";


interface Props {
  label: string;
  name: keyof UpdateData;
  register: UseFormRegister<UpdateData>;
  error?: FieldError;
  type?: string;
  placeholder?: string;
}

export default function ProfileField({
  label,
  name,
  register,
  error,
  type = "text",
  placeholder,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <Text size="sm" variant="secondary">
        {label}
      </Text>

      <Input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={cn(
          "h-11 w-2xl rounded-lg px-4 py-2 text-sm",
          "bg-ds-card-background text-ds-text ",
          error ? "border border-red-500" : "border border-gray-300",
          "outline-none focus:outline-none focus:ring-2",
        )}
      />

      {error && <span className="text-xs text-red-500">{error.message}</span>}
    </div>
  );
}
