"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Pencil } from "@/assets/icons/icons";
import { Trash2, ImagePlus, User } from "lucide-react";
import Avatar from "../../../components/molecules/Avatar";

interface Props {
  imagePreview: string | null;
  name: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageDelete: () => void;
}

export default function ProfileImage({
  imagePreview,
  name,
  onImageChange,
  onImageDelete,
}: Props) {
  const t = useTranslations("profile");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEdit = () => {
    inputRef.current?.click();
    setIsOpen(false);
  };

  const handleDelete = () => {
    onImageDelete();
    setIsOpen(false);
  };
  const hasImage =
    typeof imagePreview === "string" && imagePreview.trim() !== "";

  return (
    <div className="relative" ref={wrapperRef}>
      <Avatar
        src={imagePreview}
        name={name}
        className="h-32 w-32 text-4xl ring-2 ring-blue-500 ring-offset-4 ring-offset-white dark:ring-offset-gray-900"
      />
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full  ds-bg-primary text-white "
      >
        <Pencil size={14} />
      </button>

      <div
        className={`absolute left-10 top-full z-50 mt-2 w-44 overflow-hidden transition-all duration-200 ease-out rounded-lg border border-gray-200 ds-bg shadow-lg
             ${
               isOpen
                 ? "opacity-100 scale-100 translate-y-0"
                 : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
             }`}
      >
        <button
          type="button"
          onClick={handleEdit}
          className="flex w-full cursor-pointer items-center gap-2 px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <ImagePlus size={16} />
          {t("changePhoto")}
        </button>

        {hasImage && (
          <button
            type="button"
            onClick={handleDelete}
            className="flex w-full items-center gap-2 border-t border-gray-100 px-4 py-3 text-sm text-red-500 hover:bg-red-50"
          >
            <Trash2 size={16} />
            {t("deletePhoto")}
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onImageChange}
        className="hidden"
      />
    </div>
  );
}
