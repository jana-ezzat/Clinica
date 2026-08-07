import Input from "@/shared/components/atoms/Input";
import { ErrorText } from "@/shared/components/atoms/ErrorText";
import Label from "@/shared/components/atoms/lable";
import { forwardRef, InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
};

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    ({ id, label, error, type = "text", className = "", ...props }, ref) => {
        return (
            <div>
                <Label htmlFor={id}>{label}</Label>

                <Input
                    ref={ref}
                    id={id}
                    type={type}
                    className={`w-full border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 ${className}`}
                    {...props}
                />

                <ErrorText>{error}</ErrorText>
            </div>
        );
    }
);

InputField.displayName = "InputField";

export default InputField;