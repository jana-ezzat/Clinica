import { forwardRef, SelectHTMLAttributes } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  placeholder?: string;
  options: Option[];
  error?: string | false;
}

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ id, label, placeholder, options, error, className, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        <select
          id={id}
          ref={ref}
          className={`ds-border w-full rounded-md border px-3 py-2 text-sm ${
            error ? "border-red-500" : ""
          } ${className ?? ""}`}
          {...rest}>
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

SelectField.displayName = "SelectField";

export default SelectField;
