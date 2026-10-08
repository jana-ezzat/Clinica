"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import Modal from "@/shared/components/molecules/ModalShell";
import Title from "@/shared/components/atoms/Title";
import Button from "@/shared/components/atoms/Button";
import PreviousSurgeriesField from "../molecules/PreviousSurgeriesField";
import useUpdatePatient from "../../hooks/useUpdatePatient";
import {
  EditPatientSchema,
  type EditPatientFormValues,
  type EditPatientFormOutput,
} from "../../schema/EditPatientSchema";
import type { PatientDetails } from "../../hooks/usePatient";
import { errorClass, fieldClass, labelClass } from "../../lib/formStyles";

interface Props {
  patient: PatientDetails;
  isOpen: boolean;
  onClose: () => void;
}

const splitList = (value?: string) =>
  value
    ? value
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean)
    : [];

export default function EditPatientModal({ patient, isOpen, onClose }: Props) {
  const t = useTranslations("patients.edit");
  const updatePatient = useUpdatePatient();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditPatientFormValues, any, EditPatientFormOutput>({
    resolver: zodResolver(EditPatientSchema),
    defaultValues: {
      name: patient.name,
      phone: patient.phone,
      otherPhone: patient.otherPhone ?? "",
      email: patient.email ?? "",
      gender: patient.gender ?? "male",
      dateOfBirth: patient.dateOfBirth?.split("T")[0] ?? "",
      nationalID: patient.nationalID ?? "",
      address: patient.address ?? "",

      bloodType: patient.medicalInformation?.bloodType ?? "",
      allergies: patient.medicalInformation?.allergies?.join(", ") ?? "",
      chronicDiseases:
        patient.medicalInformation?.chronicDiseases?.join(", ") ?? "",
      medications: patient.medicalInformation?.medications?.join(", ") ?? "",
      familyMedicalHistory:
        patient.medicalInformation?.familyMedicalHistory ?? "",
      medicalHistory: patient.medicalInformation?.medicalHistory ?? "",
      previousSurgeries: (
        patient.medicalInformation?.previousSurgeries ?? []
      ).map((s) => ({ name: s.name, date: s.date.split("T")[0] })),

      emergencyname: patient.emergencyContact?.emergencyname ?? "",
      emergencyphone: patient.emergencyContact?.emergencyphone ?? "",
      emergencyrelationship:
        patient.emergencyContact?.emergencyrelationship ?? "",

      insuranceCompany: patient.insurance?.company ?? "",
      insuranceMemberNumber: patient.insurance?.memberNumber ?? "",
      insuranceCoverageRatio: patient.insurance?.coverageRatio,
      insuranceEndDate: patient.insurance?.endDate?.split("T")[0] ?? "",
    },
  });

  const onSubmit = async (data: EditPatientFormOutput) => {
    try {
      await updatePatient.mutateAsync({
        id: patient.id,
        payload: {
          name: data.name,
          phone: data.phone,
          otherPhone: data.otherPhone || undefined,
          email: data.email || undefined,
          gender: data.gender,
          dateOfBirth: data.dateOfBirth,
          nationalID: data.nationalID || undefined,
          address: data.address || undefined,

          bloodType: data.bloodType || undefined,
          allergies: splitList(data.allergies),
          chronicDiseases: splitList(data.chronicDiseases),
          medications: splitList(data.medications),
          familyMedicalHistory: data.familyMedicalHistory || undefined,
          medicalHistory: data.medicalHistory || undefined,
          previousSurgeries: (data.previousSurgeries ?? []).map(
            ({ name, date }) => ({ name, date }),
          ),

          emergencyName: data.emergencyname || undefined,
          emergencyPhone: data.emergencyphone || undefined,
          emergencyRelationship: data.emergencyrelationship || undefined,

          insuranceCompany: data.insuranceCompany || undefined,
          memberNumber: data.insuranceMemberNumber || undefined,
          coverageRatio: data.insuranceCoverageRatio,
          insuranceEndDate: data.insuranceEndDate || undefined,
        },
      });
      toast.success(t("toasts.success"));
      onClose();
    } catch (error) {
      const backendMessage = isAxiosError(error)
        ? error.response?.data?.message
        : null;
      toast.error(backendMessage ?? t("toasts.error"));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex max-h-[80vh] flex-col gap-6 overflow-y-auto">
        <Title size="lg" className="font-bold">
          {t("title")}
        </Title>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <section>
            <h3 className="mb-3 font-semibold">{t("sections.basic")}</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                {t("fields.name")}
                <input className={fieldClass} {...register("name")} />
                {errors.name && (
                  <span className={errorClass}>{t("required")}</span>
                )}
              </label>
              <label className={labelClass}>
                {t("fields.phone")}
                <input className={fieldClass} {...register("phone")} />
                {errors.phone && (
                  <span className={errorClass}>{t("required")}</span>
                )}
              </label>
              <label className={labelClass}>
                {t("fields.otherPhone")}
                <input className={fieldClass} {...register("otherPhone")} />
              </label>
              <label className={labelClass}>
                {t("fields.email")}
                <input
                  className={fieldClass}
                  type="email"
                  {...register("email")}
                />
                {errors.email && (
                  <span className={errorClass}>{t("invalidEmail")}</span>
                )}
              </label>
              <label className={labelClass}>
                {t("fields.gender")}
                <select className={fieldClass} {...register("gender")}>
                  <option value="male">{t("gender.male")}</option>
                  <option value="female">{t("gender.female")}</option>
                </select>
              </label>
              <label className={labelClass}>
                {t("fields.dateOfBirth")}
                <input
                  className={fieldClass}
                  type="date"
                  {...register("dateOfBirth")}
                />
                {errors.dateOfBirth && (
                  <span className={errorClass}>{t("required")}</span>
                )}
              </label>
              <label className={labelClass}>
                {t("fields.nationalID")}
                <input className={fieldClass} {...register("nationalID")} />
              </label>
              <label className={`${labelClass} sm:col-span-2`}>
                {t("fields.address")}
                <input className={fieldClass} {...register("address")} />
              </label>
            </div>
          </section>

          <section>
            <h3 className="mb-3 font-semibold">{t("sections.medical")}</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                {t("fields.bloodType")}
                <input className={fieldClass} {...register("bloodType")} />
              </label>
              <label className={labelClass}>
                {t("fields.allergies")} ({t("commaHint")})
                <input className={fieldClass} {...register("allergies")} />
              </label>
              <label className={labelClass}>
                {t("fields.chronicDiseases")} ({t("commaHint")})
                <input
                  className={fieldClass}
                  {...register("chronicDiseases")}
                />
              </label>
              <label className={labelClass}>
                {t("fields.medications")} ({t("commaHint")})
                <input className={fieldClass} {...register("medications")} />
              </label>
              <label className={`${labelClass} sm:col-span-2`}>
                {t("fields.familyMedicalHistory")}
                <textarea
                  className={fieldClass}
                  rows={2}
                  {...register("familyMedicalHistory")}
                />
              </label>
              <label className={`${labelClass} sm:col-span-2`}>
                {t("fields.medicalHistory")}
                <textarea
                  className={fieldClass}
                  rows={2}
                  {...register("medicalHistory")}
                />
              </label>

              <PreviousSurgeriesField
                control={control}
                register={register}
                errors={errors}
              />
            </div>
          </section>

          <section>
            <h3 className="mb-3 font-semibold">{t("sections.emergency")}</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <label className={labelClass}>
                {t("fields.emergencyName")}
                <input className={fieldClass} {...register("emergencyname")} />
              </label>
              <label className={labelClass}>
                {t("fields.emergencyPhone")}
                <input className={fieldClass} {...register("emergencyphone")} />
              </label>
              <label className={labelClass}>
                {t("fields.emergencyRelationship")}
                <input
                  className={fieldClass}
                  {...register("emergencyrelationship")}
                />
              </label>
            </div>
          </section>

          <section>
            <h3 className="mb-3 font-semibold">{t("sections.insurance")}</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                {t("fields.insuranceCompany")}
                <input
                  className={fieldClass}
                  {...register("insuranceCompany")}
                />
              </label>
              <label className={labelClass}>
                {t("fields.memberNumber")}
                <input
                  className={fieldClass}
                  {...register("insuranceMemberNumber")}
                />
              </label>
              <label className={labelClass}>
                {t("fields.coverageRatio")}
                <input
                  className={fieldClass}
                  type="number"
                  {...register("insuranceCoverageRatio")}
                />
              </label>
              <label className={labelClass}>
                {t("fields.insuranceEndDate")}
                <input
                  className={fieldClass}
                  type="date"
                  {...register("insuranceEndDate")}
                />
              </label>
            </div>
          </section>

          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              className="text-red-500"
              onClick={onClose}>
              {t("actions.cancel")}
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={isSubmitting}>
              {isSubmitting ? t("actions.saving") : t("actions.save")}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
