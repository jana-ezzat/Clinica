import Image from "next/image";
import {
  ImageOff,
  ImagePlus,
  Trash2,
} from "lucide-react";

interface Props {
  imageSrc: string | null;
  title: string;
  isEdit: boolean;
  fileId: string;
  onPickImage: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  onRemoveImage: () => void;
  changeImageText: string;
  removeImageText: string;
}

export default function CredentialImageEditor({
  imageSrc,
  title,
  isEdit,
  fileId,
  onPickImage,
  onRemoveImage,
  changeImageText,
  removeImageText,
}: Props) {
  if (imageSrc) {
    return (
      <div className="relative h-52 w-full max-w-md overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
        />

        {isEdit && (
          <div className="absolute inset-e-3 bottom-3 flex gap-2">
            <label
              htmlFor={fileId}
              className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg bg-white/95 px-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-white"
            >
              <ImagePlus size={16} />
              {changeImageText}
            </label>

            <button
              type="button"
              onClick={onRemoveImage}
              aria-label={removeImageText}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-red-600 text-white shadow-sm hover:bg-red-700"
            >
              <Trash2 size={16} />
            </button>

            <input
              id={fileId}
              type="file"
              accept="image/*"
              onChange={onPickImage}
              className="hidden"
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative flex h-40 w-full max-w-md items-center justify-center rounded-xl bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-800">
      <ImageOff
        size={30}
        className="text-blue-400"
      />

      {isEdit && (
        <>
          <label
            htmlFor={fileId}
            className="absolute inset-e-3 bottom-3 inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg bg-white/95 px-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-white"
          >
            <ImagePlus size={16} />
            {changeImageText}
          </label>

          <input
            id={fileId}
            type="file"
            accept="image/*"
            onChange={onPickImage}
            className="hidden"
          />
        </>
      )}
    </div>
  );
}