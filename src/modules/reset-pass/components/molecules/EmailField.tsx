import EmailInput from "@/shared/components/atoms/EmailInput";
import { ErrorText } from "@/shared/components/atoms/ErrorText";
import Label from "@/shared/components/atoms/lable";
import { forwardRef, InputHTMLAttributes } from "react";

type EmailFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};
export const EmailField = forwardRef<HTMLInputElement, EmailFieldProps>(
  ({ id, label, error, ...props }, ref) => {
    return (
      <div >
        <Label htmlFor={id}>{label}</Label>
        <EmailInput
          ref={ref}
          id={id}
          type="email"
          className="border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400  w-full"
          {...props}
        />
        <ErrorText>{error}</ErrorText>
      </div>
    );
  },
);
EmailField.displayName = "EmailField";
