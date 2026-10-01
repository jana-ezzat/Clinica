"use client";
import { useEffect, useId, useState } from "react";
import { ImagePlus, RefreshCw, X } from "@/assets/icons/icons";
import { useTranslations } from "next-intl";
import Text from "@/shared/components/atoms/Text";
import Input from "@/shared/components/atoms/Input";
import FadeImage from "../../UpdateCredential/components/molecules/FadeImage";

interface CredentialItem {
  title: string;
  desc: string;
  file: File | null;
}

interface Props {
  label: string;
  descLabel: string;
  item: CredentialItem;
  setChange: (item: CredentialItem) => void;
}

const inputClass =
  "h-12 w-full rounded-xl   px-4 text-sm transition-colors ";

export default function CredentialField({
  label,
  descLabel,
  item,
  setChange,
}: Props) {
  const t = useTranslations("profile");
  const inputId = useId();
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!item.file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(item.file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [item.file]);

  const setFile = (file: File | null) => setChange({ ...item, file });

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
    e.target.value = ""; 
  };

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) setFile(file);
  };

  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl border border-gray-100 ds-bg p-4 shadow-sm sm:p-5">
      {/* Text fields */}
      <div className="flex flex-col gap-1.5">
        <Text size="sm" className="font-semibold">
          {label}
        </Text>
        <Input
          placeholder={label}
          value={item.title}
          onChange={(e) => setChange({ ...item, title: e.target.value })}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Text size="sm" className="font-semibold">
          {descLabel}
        </Text>
        <Input
          placeholder={descLabel}
          value={item.desc}
          onChange={(e) => setChange({ ...item, desc: e.target.value })}
          className={inputClass}
        />
      </div>

      {/* Upload */}
      {preview ? (
        <div className="group relative aspect-16/8 w-full overflow-hidden rounded-xl ds-bg">
          <FadeImage
            src={preview}
            alt={item.file?.name ?? ""}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-linear-to-t from-black/70 to-transparent p-3">
            <span className="min-w-0 flex-1 truncate text-xs text-white">
              {item.file?.name}
            </span>

            <label
              htmlFor={inputId}
              className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg bg-white/90 px-3 text-xs font-medium text-gray-800 transition-colors hover:bg-white"
            >
              <RefreshCw size={13} />
              {t("ChangeImage")}
            </label>

            <button
              type="button"
              onClick={() => setFile(null)}
              aria-label={t("Remove")}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-white/90 text-red-600 transition-colors hover:bg-white"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors ${
            isDragging
              ? "border-blue-500 bg-blue-50"

                : "border-gray-200  hover:border-blue-400 "
          }`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <ImagePlus size={22} />
          </div>
          <Text size="sm" className="font-semibold">
            {t("UploadImage")}
          </Text>
          <Text size="xs" className="text-gray-500">
            {t("DragOrClick")}
          </Text>
        </label>
      )}

      <input
        id={inputId}
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="sr-only"
      />

    </div>
  );
}
