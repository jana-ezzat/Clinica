// src/shared/components/atoms/Select.tsx
import { cn } from "@/lib/cn";
import Text from "@/shared/components/atoms/Text";

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    className?: string;
}

export default function Select({
    label,
    value = "",
    onChange,
    options,
    placeholder,
    error,
    disabled = false,
    className,
}: SelectProps) {
    return (
        <div className="flex flex-col gap-2">
            {label && (
                <Text size="sm" variant="secondary">
                    {label}
                </Text>
            )}

            <select
                value={value}
                onChange={(event) => onChange?.(event.target.value)}
                disabled={disabled}
                className={cn(
                    "h-11 w-full appearance-none rounded-lg px-3.5 text-sm",
                    "bg-ds-card-background text-ds-text",
                    error ? "border border-red-500" : "border border-gray-300",
                    "outline-none focus:outline-none focus:ring-0",
                    disabled && "cursor-not-allowed opacity-50",
                    className,
                )}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}

                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
}