import { useEffect, useState } from "react";
export function useProfileImage(image?: string | null) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [removeImage, setRemoveImage] = useState(false);

  useEffect(() => {
    setImagePreview(image || null);
    setImageFile(null);
    setRemoveImage(false);
  }, [image]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleImageDelete = () => {
    setImageFile(null);
    setImagePreview(null);
    setRemoveImage(true);
  };
  return {
    imageFile,
    imagePreview,
    handleImageChange,
    handleImageDelete,
    removeImage,
  };
}
