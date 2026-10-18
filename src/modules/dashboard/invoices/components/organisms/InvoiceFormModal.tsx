// src/modules/dashboard/invoices/components/organisms/InvoiceFormModal.tsx
"use client";

import { useEffect, useMemo } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormatter, useTranslations } from "next-intl";
import { toast } from "sonner";
import { MdClose } from "react-icons/md";
import ModalShell from "@/shared/components/molecules/ModalShell";
import SelectField from "@/shared/components/molecules/SelectField";
import Title from "@/shared/components/atoms/Title";
import Text from "@/shared/components/atoms/Text";
import Label from "@/shared/components/atoms/lable";
import Input from "@/shared/components/atoms/Input";
import Button from "@/shared/components/atoms/Button";
import { ErrorText } from "@/shared/components/atoms/ErrorText";
import { usePatients } from "../../../patients/hooks/usePatients";
import { usePatientVisits } from "../../../patients/hooks/usePatientVisits";
import { useProfile } from "../../../profile/hooks/Queries/useProfile";
import { Invoice, PaymentMethod } from "../../../patients/types/invoice";
import { getEntityId } from "../../../patients/types/visit";
import {
  invoiceFormSchema,
  InvoiceFormInput,
  InvoiceFormValues,
} from "../../schema/invoiceFormSchema";
import { useCreateInvoice } from "../../hooks/useCreateInvoice";
import {
  EditInvoicePayload,
  useEditInvoice,
} from "../../hooks/useEditInvoice";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  /** When provided the modal edits this invoice, otherwise it creates one. */
  invoice?: Invoice | null;
  /** Read-only patient name shown while editing. */
  patientName?: string;
}

const PAYMENT_METHODS: PaymentMethod[] = ["cash", "card", "insurance"];

const getDefaults = (invoice?: Invoice | null): InvoiceFormInput =>
  invoice
    ? {
        patient: invoice.patient,
        visit: invoice.visit,
        services: invoice.services.map((s) => ({
          name: s.name,
          price: s.price,
          discount: s.discount,
        })),
        paid: invoice.paid,
        paymentMethod: invoice.paymentMethod,
        notes: invoice.notes ?? "",
        TermsAndConditions: invoice.TermsAndConditions ?? "",
        invoiceDate: invoice.invoiceDate.slice(0, 10),
      }
    : {
        patient: "",
        visit: "",
        services: [{ name: "", price: 0, discount: 0 }],
        paid: 0,
        paymentMethod: "cash",
        notes: "",
        TermsAndConditions: "",
        invoiceDate: "",
      };

function apiMessage(error: unknown): string | undefined {
  const message = (
    error as { response?: { data?: { message?: unknown } } } | undefined
  )?.response?.data?.message;
  return typeof message === "string" ? message : undefined;
}

export default function InvoiceFormModal({
  isOpen,
  onClose,
  invoice,
  patientName,
}: Props) {
  const t = useTranslations("Invoice.form");
  const format = useFormatter();
  const isEdit = !!invoice;

  const profile = useProfile();
  const patientsQuery = usePatients();
  const createInvoice = useCreateInvoice();
  const editInvoice = useEditInvoice();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<InvoiceFormInput, unknown, InvoiceFormValues>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: getDefaults(invoice),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  // Fresh form every time the modal opens (or switches to another invoice).
  useEffect(() => {
    if (isOpen) reset(getDefaults(invoice));
  }, [isOpen, invoice, reset]);

  const selectedPatient = useWatch({ control, name: "patient" });
  const selectedVisit = useWatch({ control, name: "visit" });
  const services = useWatch({ control, name: "services" });
  const paid = useWatch({ control, name: "paid" });

  const visitsQuery = usePatientVisits(selectedPatient ?? "", isOpen && !isEdit);

  // Live preview only — the server recalculates everything on save.
  const totals = useMemo(() => {
    const rows = (services ?? []).map((s) => ({
      price: Number(s?.price) || 0,
      discount: Number(s?.discount) || 0,
    }));
    const subtotal = rows.reduce((sum, r) => sum + r.price, 0);
    const discount = rows.reduce((sum, r) => sum + r.discount, 0);
    const total = subtotal - discount;
    return { subtotal, discount, total, remaining: total - (Number(paid) || 0) };
  }, [services, paid]);

  const patientOptions = (patientsQuery.data ?? []).map((p) => ({
    value: p.id,
    label: p.name,
  }));

  const visitOptions = (visitsQuery.data ?? []).map((v) => ({
    value: v._id,
    label:
      [
        v.visitDate
          ? format.dateTime(new Date(v.visitDate), { dateStyle: "medium" })
          : null,
        v.reason,
      ]
        .filter(Boolean)
        .join(" — ") || v._id,
  }));

  const visitPlaceholder = !selectedPatient
    ? t("selectPatientFirst")
    : visitsQuery.isSuccess && visitOptions.length === 0
      ? t("noVisits")
      : t("visitPlaceholder");

  const methodOptions = PAYMENT_METHODS.map((m) => ({
    value: m,
    label: t(`methods.${m}`),
  }));

  const tErr = (key?: string) => (key ? t(`errors.${key}`) : undefined);
  const money = (value: number) =>
    format.number(value, { maximumFractionDigits: 2 });

  const isSaving = createInvoice.isPending || editInvoice.isPending;
  // A doctor invoices as themselves. An admin isn't a doctor, so the invoice is
  // attributed to the doctor who did the selected visit.
  const isAdmin = profile.data?.role === "admin";
  const visitDoctorId = getEntityId(
    visitsQuery.data?.find((v) => v._id === selectedVisit)?.doctor,
  );
  const doctorId = isAdmin ? visitDoctorId : profile.data?._id;

  const onFail = (error: unknown) =>
    toast.error(apiMessage(error) ?? t("error"));

  const onSubmit = handleSubmit((values) => {
    const services = values.services.map((s) => ({
      name: s.name,
      price: s.price,
      discount: s.discount,
    }));

    if (invoice) {
      const payload: EditInvoicePayload = {
        services,
        paid: values.paid,
        paymentMethod: values.paymentMethod,
        notes: values.notes ?? "",
        TermsAndConditions: values.TermsAndConditions ?? "",
      };
      // Only send the date when the user actually changed it.
      if (
        values.invoiceDate &&
        values.invoiceDate !== invoice.invoiceDate.slice(0, 10)
      ) {
        payload.invoiceDate = new Date(
          `${values.invoiceDate}T12:00:00.000Z`,
        ).toISOString();
      }

      editInvoice.mutate(
        { invoiceId: invoice._id, payload },
        {
          onSuccess: () => {
            toast.success(t("updateSuccess"));
            onClose();
          },
          onError: onFail,
        },
      );
      return;
    }

    if (!doctorId) return;

    createInvoice.mutate(
      {
        patient: values.patient,
        doctor: doctorId,
        visit: values.visit,
        services,
        paid: values.paid,
        paymentMethod: values.paymentMethod,
        ...(values.notes ? { notes: values.notes } : {}),
        ...(values.TermsAndConditions
          ? { TermsAndConditions: values.TermsAndConditions }
          : {}),
      },
      {
        onSuccess: () => {
          toast.success(t("createSuccess"));
          onClose();
        },
        onError: onFail,
      },
    );
  });

  const servicesError =
    errors.services?.root?.message ?? errors.services?.message;

  return (
    <ModalShell isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-1">
        <Title size="md" className="p-0 font-bold">
          {isEdit ? `${t("editTitle")} ${invoice?.invoiceNumber}` : t("createTitle")}
        </Title>
        {isEdit && patientName && (
          <Text size="sm" variant="secondary">
            {t("patient")}: {patientName}
          </Text>
        )}
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
        {!isEdit && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField
              id="invoice-patient"
              label={t("patient")}
              placeholder={t("patientPlaceholder")}
              options={patientOptions}
              error={tErr(errors.patient?.message)}
              defaultValue=""
              {...register("patient", {
                onChange: () => setValue("visit", ""),
              })}
            />
            <SelectField
              id="invoice-visit"
              label={t("visit")}
              placeholder={visitPlaceholder}
              options={visitOptions}
              error={tErr(errors.visit?.message)}
              defaultValue=""
              disabled={!selectedPatient || visitOptions.length === 0}
              {...register("visit")}
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Label>{t("servicesTitle")}</Label>

          {fields.map((field, index) => {
            const rowErrors = errors.services?.[index];
            const rowError =
              rowErrors?.name?.message ??
              rowErrors?.price?.message ??
              rowErrors?.discount?.message;

            return (
              <div key={field.id} className="flex flex-col">
                <div className="grid grid-cols-[1fr_5.5rem_5.5rem_auto] items-center gap-2">
                  <Input
                    aria-label={t("serviceName")}
                    placeholder={t("serviceName")}
                    hasError={!!rowErrors?.name}
                    {...register(`services.${index}.name`)}
                  />
                  <Input
                    type="number"
                    min={0}
                    step="any"
                    aria-label={t("price")}
                    placeholder={t("price")}
                    hasError={!!rowErrors?.price}
                    {...register(`services.${index}.price`)}
                  />
                  <Input
                    type="number"
                    min={0}
                    step="any"
                    aria-label={t("discount")}
                    placeholder={t("discount")}
                    hasError={!!rowErrors?.discount}
                    {...register(`services.${index}.discount`)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={t("removeService")}
                    title={t("removeService")}
                    disabled={fields.length === 1}
                    onClick={() => remove(index)}>
                    <MdClose size={18} />
                  </Button>
                </div>
                <ErrorText>{tErr(rowError)}</ErrorText>
              </div>
            );
          })}

          <ErrorText>{tErr(servicesError)}</ErrorText>

          <div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ name: "", price: 0, discount: 0 })}>
              + {t("addService")}
            </Button>
          </div>
        </div>

        <div className="ds-bg-card grid grid-cols-2 gap-4 rounded-xl p-4 sm:grid-cols-4">
          {(
            [
              ["subtotal", totals.subtotal],
              ["totalDiscount", totals.discount],
              ["total", totals.total],
              ["remaining", totals.remaining],
            ] as const
          ).map(([key, value]) => (
            <div key={key} className="flex flex-col gap-1">
              <Text size="xs" variant="secondary">
                {t(key)}
              </Text>
              <Text size="sm" variant="primary" className="p-0 font-bold">
                {money(value)}
              </Text>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="invoice-paid">{t("paid")}</Label>
            <Input
              id="invoice-paid"
              type="number"
              min={0}
              step="any"
              hasError={!!errors.paid}
              {...register("paid")}
            />
            <ErrorText>{tErr(errors.paid?.message)}</ErrorText>
          </div>

          <SelectField
            id="invoice-method"
            label={t("paymentMethod")}
            options={methodOptions}
            error={tErr(errors.paymentMethod?.message)}
            {...register("paymentMethod")}
          />

          {isEdit && (
            <div>
              <Label htmlFor="invoice-date">{t("invoiceDate")}</Label>
              <Input
                id="invoice-date"
                type="date"
                {...register("invoiceDate")}
              />
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="invoice-notes">{t("notes")}</Label>
          <Input id="invoice-notes" {...register("notes")} />
        </div>

        <div>
          <Label htmlFor="invoice-terms">{t("terms")}</Label>
          <Input id="invoice-terms" {...register("TermsAndConditions")} />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            {t("cancel")}
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={isSaving || (!isEdit && !doctorId)}>
            {isSaving ? t("saving") : isEdit ? t("save") : t("create")}
          </Button>
        </div>
      </form>
    </ModalShell>
  );
}
