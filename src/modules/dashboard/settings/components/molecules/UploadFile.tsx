"use client";
import Button from "@/shared/components/atoms/Button";
import Text from "@/shared/components/atoms/Text";
import { Upload } from "lucide-react";
import React, { useRef, useState } from "react";

interface Props {
  label: string;
  uploadLabel: string;
  disabled?: boolean;
  logo?: string | null;
  onFileChange: (file: File | null) => void;
}
const UploadFile = ({
  label,
  uploadLabel,
  disabled,
  logo,
  onFileChange,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileImage, setFileImage] = useState<string | null>(logo ?? null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    setFileImage(URL.createObjectURL(file));
    onFileChange(file);
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
        className="flex items-center gap-2 h-11 px-4 rounded-lg border border-gray-300 bg-ds-card-background text-sm text-ds-text hover:bg-gray-50 hover:text-black transition-colors w-fit"
      >
        <Upload size={16} />
        {uploadLabel}
      </Button>

      {fileImage && (
        <img
          src={fileImage}
          alt="Logo"
          width={50}
          height={50}
          className=" object-cover "
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        ref={inputRef}
        className="hidden"
        disabled={disabled}
      />
    </div>
  );
};

export default UploadFile;
