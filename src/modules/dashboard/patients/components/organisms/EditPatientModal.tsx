"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import Modal from "@/shared/components/molecules/ModalShell";
import Title from "@/shared/components/atoms/Title";
import Button from "@/shared/components/atoms/Button";
import useUpdatePatient from "../../hooks/useUpdatePatient";
import {
  EditPatientSchema,
  type EditPatientFormValues,
  type EditPatientFormOutput,
} from "../../schema/EditPatientSchema";
import type { PatientDetails } from "../../hooks/usePatient";

interface Props {
  patient: PatientDetails;
  isOpen: boolean;
  onClose: () => void;
}

const fieldClass =
  "h-11 w-full rounded-lg border border-gray-300 px-4 text-sm outline-none";
const labelClass = "flex flex-col gap-2 text-sm";

export default function EditPatientModal({ patient, isOpen, onClose }: Props) {
  const updatePatient = useUpdatePatient();

  const {
    register,
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

  const splitList = (value?: string) =>
    value
      ? value
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean)
      : [];

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
          medicalInformation: {
            bloodType: data.bloodType || undefined,
            allergies: splitList(data.allergies),
            chronicDiseases: splitList(data.chronicDiseases),
            medications: splitList(data.medications),
            familyMedicalHistory: data.familyMedicalHistory || undefined,
            medicalHistory: data.medicalHistory || undefined,
          },
          emergencyContact: {
            emergencyname: data.emergencyname || undefined,
            emergencyphone: data.emergencyphone || undefined,
            emergencyrelationship: data.emergencyrelationship || undefined,
          },
          insurance: {
            company: data.insuranceCompany || undefined,
            memberNumber: data.insuranceMemberNumber || undefined,
            coverageRatio: data.insuranceCoverageRatio,
            endDate: data.insuranceEndDate || undefined,
          },
        },
      });
      toast.success("تم تحديث بيانات المريض بنجاح");
      onClose();
    } catch (error) {
      const backendMessage = isAxiosError(error)
        ? error.response?.data?.message
        : null;
      toast.error(backendMessage ?? "حدث خطأ ما، يرجى المحاولة مرة أخرى");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex max-h-[80vh] flex-col gap-6 overflow-y-auto">
        <Title size="lg" className="font-bold">
          تعديل بيانات المريض
        </Title>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div>
            <h3 className="mb-3 font-semibold">البيانات الأساسية</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                الاسم
                <input className={fieldClass} {...register("name")} />
                {errors.name && (
                  <span className="text-xs text-red-500">مطلوب</span>
                )}
              </label>
              <label className={labelClass}>
                الهاتف
                <input className={fieldClass} {...register("phone")} />
              </label>
              <label className={labelClass}>
                هاتف إضافي
                <input className={fieldClass} {...register("otherPhone")} />
              </label>
              <label className={labelClass}>
                البريد الإلكتروني
                <input
                  className={fieldClass}
                  type="email"
                  {...register("email")}
                />
              </label>
              <label className={labelClass}>
                النوع
                <select className={fieldClass} {...register("gender")}>
                  <option value="male">ذكر</option>
                  <option value="female">أنثى</option>
                </select>
              </label>
              <label className={labelClass}>
                تاريخ الميلاد
                <input
                  className={fieldClass}
                  type="date"
                  {...register("dateOfBirth")}
                />
              </label>
              <label className={labelClass}>
                الرقم القومي
                <input className={fieldClass} {...register("nationalID")} />
              </label>
              <label className={`${labelClass} sm:col-span-2`}>
                العنوان
                <input className={fieldClass} {...register("address")} />
              </label>
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">الملف الطبي</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                فصيلة الدم
                <input className={fieldClass} {...register("bloodType")} />
              </label>
              <label className={labelClass}>
                الحساسية (افصل بينها بفاصلة)
                <input className={fieldClass} {...register("allergies")} />
              </label>
              <label className={labelClass}>
                الأمراض المزمنة (افصل بينها بفاصلة)
                <input
                  className={fieldClass}
                  {...register("chronicDiseases")}
                />
              </label>
              <label className={labelClass}>
                الأدوية الحالية (افصل بينها بفاصلة)
                <input className={fieldClass} {...register("medications")} />
              </label>
              <label className={`${labelClass} sm:col-span-2`}>
                تاريخ العائلة المرضي
                <textarea
                  className={fieldClass}
                  rows={2}
                  {...register("familyMedicalHistory")}
                />
              </label>
              <label className={`${labelClass} sm:col-span-2`}>
                التاريخ المرضي
                <textarea
                  className={fieldClass}
                  rows={2}
                  {...register("medicalHistory")}
                />
              </label>
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">جهة اتصال الطوارئ</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <label className={labelClass}>
                الاسم
                <input className={fieldClass} {...register("emergencyname")} />
              </label>
              <label className={labelClass}>
                رقم الهاتف
                <input className={fieldClass} {...register("emergencyphone")} />
              </label>
              <label className={labelClass}>
                صلة القرابة
                <input
                  className={fieldClass}
                  {...register("emergencyrelationship")}
                />
              </label>
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">بيانات التأمين</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                شركة التأمين
                <input
                  className={fieldClass}
                  {...register("insuranceCompany")}
                />
              </label>
              <label className={labelClass}>
                رقم العضوية
                <input
                  className={fieldClass}
                  {...register("insuranceMemberNumber")}
                />
              </label>
              <label className={labelClass}>
                نسبة التغطية
                <input
                  className={fieldClass}
                  type="number"
                  {...register("insuranceCoverageRatio")}
                />
              </label>
              <label className={labelClass}>
                تاريخ الانتهاء
                <input
                  className={fieldClass}
                  type="date"
                  {...register("insuranceEndDate")}
                />
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              className="text-red-500"
              onClick={onClose}>
              إلغاء
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={isSubmitting}>
              {isSubmitting ? "جارٍ الحفظ..." : "حفظ التعديلات"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
