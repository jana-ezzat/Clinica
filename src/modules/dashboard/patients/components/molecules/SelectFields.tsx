import { cn } from "@/lib/cn";
import { AppointmentFormValues } from "@/modules/dashboard/schema/AppointmentModalSechma";
import Text from "@/shared/components/atoms/Text";
import { FieldError, UseFormRegister } from "react-hook-form";

interface Props {
  label: string;
  name: keyof AppointmentFormValues;
  options: { value: string; label: string }[];
  register: UseFormRegister<AppointmentFormValues>;
  error?: FieldError;
  placeholder?: string;
}

export default function SelectFields({
  label,
  name,
  options,
  register,
  error,
  placeholder = "...Select",
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <Text size="sm" variant="secondary">
        {label}
      </Text>

      <div className="relative">
        <select
          {...register(name)}
          defaultValue=""
          className={cn(
            "h-11 w-full appearance-none rounded-lg px-3.5 text-sm",
            "bg-ds-card-background text-ds-text",
            error ? "border border-red-500" : "border border-gray-300",
            "outline-none focus:outline-none focus:ring-0",
          )}
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {error && <span className="text-xs text-red-500">{error.message}</span>}
    </div>
  );
}
