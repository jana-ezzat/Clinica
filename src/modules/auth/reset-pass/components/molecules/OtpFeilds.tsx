"use client";
import OtpInput from "@/shared/components/atoms/Auth/OtpInput";
import { ErrorText } from "@/shared/components/atoms/ErrorText";
import { useEffect, useRef, useState } from "react";

interface Props {
  length?: number;
  onComplete?: (value: string) => void;
  onChange?: (value: string) => void;
  error?: string;
}

const OtpFeilds = ({ length = 6, onComplete, onChange, error }: Props) => {
  const [values, setValues] = useState(Array(length).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0]?.focus();
    }
  }, []);

  const handleChange = (i: number, value: string) => {
    const num = value.replace(/[^0-9]/g, "");
    const newValues = [...values];
    newValues[i] = num;
    setValues(newValues);

    const combinedValue = newValues.join("");

    onChange?.(combinedValue);

    if (num && i < length - 1) {
      inputsRef.current[i + 1]?.focus();
    }

    if (combinedValue.length === length) {
      onComplete?.(combinedValue);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex justify-center gap-2">
        {values.map((ele, i) => (
          <OtpInput
            key={i}
            value={ele}
            length={1}
            hasError={!!error}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onComplete={(value) => handleChange(i, value)}
          />
        ))}
      </div>

      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
};

export default OtpFeilds;
