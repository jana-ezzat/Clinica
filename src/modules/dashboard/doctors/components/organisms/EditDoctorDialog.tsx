"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { ImagePlus, Trash2 } from "@/assets/icons/icons";

import Modal from "@/shared/components/molecules/ModalShell";
import Title from "@/shared/components/atoms/Title";
import Text from "@/shared/components/atoms/Text";
import Button from "@/shared/components/atoms/Button";

import type { DoctorProfile } from "../../types/doctor";
import { useUpdateDoctor } from "../../hooks/useUpdateDoctor";
import {
  EditDoctorSchema,
  type EditDoctorFormValues,
} from "../../schema/editDoctorSchema";
import EditDoctorFields from "../molecules/EditDoctorFields";

interface Props {
  doctor: DoctorProfile;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditDoctorDialog({ doctor, isOpen, onClose }: Props) {
  const t = useTranslations("doctorProfile.editDialog");
  const updateDoctor = useUpdateDoctor();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef<string | null>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(doctor.image);
  const [removeImage, setRemoveImage] = useState(false);

  const schema = EditDoctorSchema({
    required: t("required"),
    invalidEmail: t("invalidEmail"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditDoctorFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: doctor.name,
      email: doctor.email,
      role: doctor.role,
    },
  });

  useEffect(() => {
    if (!isOpen) return;

    reset({
      name: doctor.name,
      email: doctor.email,
      role: doctor.role,
    });
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    setImageFile(null);
    setImagePreview(doctor.image);
    setRemoveImage(false);
  }, [isOpen, doctor, reset]);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    const url = URL.createObjectURL(file);
    previewUrlRef.current = url;
    setImageFile(file);
    setImagePreview(url);
    setRemoveImage(false);
  };

  const handleImageDelete = () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    setImageFile(null);
    setImagePreview("");
    setRemoveImage(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleClose = () => {
    onClose();
  };

  const onSubmit = async (data: EditDoctorFormValues) => {
    try {
      await updateDoctor.mutateAsync({
        id: doctor.id,
        data: {
          name: data.name,
          email: data.email,
          role: data.role,
          image: imageFile ?? undefined,
          removeImage,
        },
      });
      toast.success(t("updateSuccess"));
      onClose();
    } catch (error) {
      const backendMessage = isAxiosError(error)
        ? error.response?.data?.message
        : null;
      toast.error(backendMessage ?? t("updateError"));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="flex flex-col gap-6">
        <div>
          <Title size="lg" className="mb-1 font-bold">
            {t("title")}
          </Title>
          <Text size="sm" variant="secondary">
            {t("description")}
          </Text>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            {imagePreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imagePreview}
                alt={doctor.name}
                className="h-16 w-16 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <ImagePlus size={22} />
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImagePlus size={14} />
                {t("changePhoto")}
              </Button>
              {imagePreview && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-red-500"
                  onClick={handleImageDelete}
                >
                  <Trash2 size={14} />
                  {t("removePhoto")}
                </Button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <EditDoctorFields
            register={register}
            errors={errors}
            extraRole={doctor.role}
          />

          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              className="text-red-500"
              onClick={handleClose}
            >
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={updateDoctor.isPending}
            >
              {updateDoctor.isPending ? t("saving") : t("save")}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
