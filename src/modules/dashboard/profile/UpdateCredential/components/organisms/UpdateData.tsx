"use client";
import { useEffect, useId } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import Text from "@/shared/components/atoms/Text";
import { useCredentialId } from "../../../hooks/Queries/useCredentialId";
import { FormValues, Props } from "../../../lib/UpdataData";
import UpdateDataSkeleton from "../molecules/UpdateDataSkeleton";
import EditCredentialHeader from "../molecules/EditCredentialHeader";
import CredentialImageEditor from "../molecules/CredentialImageEditor";
import UpdateDataInputs from "../molecules/UpdateDataInputs";
import ButtonsAction from "../../../components/molecules/ButtonsAction";
import { useDeleteCredential } from "../../../hooks/useDeleteCredential";
import { useEditCredential } from "../../../hooks/Queries/useEditCredential";
import Reload from "@/shared/components/molecules/Reload";

export default function UpdateData({ type, id }: Props) {
  const t = useTranslations("profile");
  const fileId = useId();

  const { data, isLoading, isError, refetch } = useCredentialId(type, id);

  const { register, reset, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      title: "",
      desc: "",
    },
  });

  const {
    isEdit,
    handleEdit,
    preview,
    selectedFile,
    removedImage,
    handlePickImage,
    handleRemoveImage,
    handleCancel,
    handleSave,
    isSaving,
    error,
  } = useEditCredential();

  const {
    deletingAwardId,
    deletingCertificateId,
    handleDeleteAward,
    handleDeleteCertificate,
  } = useDeleteCredential();

  useEffect(() => {
    if (!data) return;

    reset({
      title: data.title,
      desc: data.desc,
    });
  }, [data, reset]);

  if (isLoading) {
    return <UpdateDataSkeleton />;
  }

  if (isError || !data) {
    return (
      <Reload
        error={t("Reload.error")}
        retry={t("Reload.retry")}
        onRetry={refetch}
      />
    );
  }

  const heading = type === "awards" ? t("awards") : t("certificates");

  // Delete
  const isDeleting =
    type === "awards"
      ? deletingAwardId === data._id
      : deletingCertificateId === data._id;

  const handleDelete = async () => {
    if (type === "awards") {
      await handleDeleteAward(data);
      return;
    }

    await handleDeleteCertificate(data);
  };

  const imageSrc = preview ?? (!removedImage ? data.file : null);

  const onSubmit = async (values: FormValues) => {
    const credentialType = type === "awards" ? "award" : "certificate";

    await handleSave(credentialType, data._id, {
      title: values.title.trim(),
      desc: values.desc.trim(),
      file: selectedFile,
      removeFile: removedImage,
    });
  };

  const handleCancelEdit = () => {
    reset({
      title: data.title,
      desc: data.desc,
    });

    handleCancel();
  };

  return (
    <div className="flex w-full flex-col gap-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Text size="xl" variant="primary" className="min-w-0 font-bold">
          {t("Edit")} · {heading}
        </Text>

        <div className="shrink-0">
          <EditCredentialHeader
            label={t("Edit")}
            onClick={handleEdit}
            onDelete={handleDelete}
            disabled={isEdit || isSaving || isDeleting}
            deleteText={isDeleting ? t("Deleting") : t("Delete")}
          />
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="ds-bg-card ds-shadow-sm flex w-full flex-col gap-6 rounded-xl p-6"
      >
        <CredentialImageEditor
          imageSrc={imageSrc}
          title={data.title}
          isEdit={isEdit && !isSaving}
          fileId={fileId}
          onPickImage={handlePickImage}
          onRemoveImage={handleRemoveImage}
          changeImageText={t("ChangeImage")}
          removeImageText={t("Remove")}
        />

        {/* Title */}
        <UpdateDataInputs
          isEdit={isEdit && !isSaving}
          name="title"
          title={t("title")}
          register={register}
        />

        {/* Description */}
        <UpdateDataInputs
          isEdit={isEdit && !isSaving}
          name="desc"
          title={t("description")}
          register={register}
        />

        {error && <p className="text-sm text-red-500">{t("updateError")}</p>}

        {isEdit && (
          <ButtonsAction
            cancelText={t("cancel")}
            saveText={isSaving ? t("saving") : t("saveChanges")}
            onClose={handleCancelEdit}
            isSaving={isSaving}
          />
        )}
      </form>
    </div>
  );
}
