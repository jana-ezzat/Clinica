"use client";
import Button from "@/shared/components/atoms/Button";
import Text from "@/shared/components/atoms/Text";
import { Upload } from "lucide-react";
import React, { useRef, useState } from "react";

interface Props {
  label: string;
  uploadLabel: string;
}
const UploadFile = ({ label, uploadLabel }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileName(file?.name || "");
  };
  return (
    <div className="flex flex-col gap-2">
      <Text size="sm" variant="secondary">
        {label}
      </Text>

      <Button
      variant="outline"
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-2 h-11 px-4 rounded-lg border border-gray-300 bg-ds-card-background text-sm text-ds-text hover:bg-gray-50 transition-colors w-fit"
      >
        <Upload size={16} />
        {fileName || uploadLabel}
      </Button>

      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        ref={inputRef}
        className="hidden"
      />
    </div>
  );
};

export default UploadFile;
