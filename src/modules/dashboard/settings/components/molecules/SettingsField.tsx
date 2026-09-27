import { FieldError, UseFormRegister } from "react-hook-form";
import Text from "@/shared/components/atoms/Text";
import { cn } from "@/lib/cn";
import Input from "@/shared/components/atoms/Input";
import { ClinicSettingsForm } from "../../lib/SettingData";

interface Props {
  label: string;
  required?: boolean;
  placeholder?: string;
  name: keyof ClinicSettingsForm;
  type?: string;
  register: UseFormRegister<ClinicSettingsForm>;
  error?: FieldError;
}

export default function SettingsField({
  label,
  required = false,
  placeholder,
  name,
  register,
  error,
  type = "text",
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <Text size="sm" variant="secondary">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </Text>

      <Input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={cn(
          "h-11 w-2xl rounded-lg px-4 py-2 text-sm",
          "bg-ds-card-background text-ds-text",
          error ? "border border-red-500" : "border border-gray-300",
          "outline-none focus:outline-none focus:ring-0",
        )}
      />

      {error && <span className="text-xs text-red-500">{error.message}</span>}
    </div>
  );
}
