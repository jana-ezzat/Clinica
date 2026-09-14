// // src/modules/dashboard/patients/components/organisms/AddInvoiceModal.tsx
// "use client";

// import { useTranslations } from "next-intl";
// import { useForm, useFieldArray } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// // import ModalShell from "@/shared/components/molecules/ModalShell";
// import Button from "@/shared/components/atoms/Button";
// import Input from "@/shared/components/atoms/Input";
// import { addInvoiceSchema, AddInvoiceFormValues } from "../../schema/addInvoiceSchema";
// import { useAddInvoice } from "../../hooks/useAddInvoice";

// interface AddInvoiceModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     patientId: string;
//     doctorId: string;
//     visitId: string;
// }

// const AddInvoiceModal = ({
//     isOpen,
//     onClose,
//     patientId,
//     doctorId,
//     visitId,
// }: AddInvoiceModalProps) => {
//     const t = useTranslations("patients.details.invoices.addModal");
//     const { mutate: addInvoice, isPending } = useAddInvoice(patientId);

//     const {
//         register,
//         control,
//         handleSubmit,
//         reset,
//         watch,
//         formState: { errors },
//     } = useForm<AddInvoiceFormValues>({
//         resolver: zodResolver(addInvoiceSchema),
//         defaultValues: {
//             visit: visitId,
//             services: [{ name: "", price: 0, discount: 0 }],
//             paid: 0,
//             paymentMethod: "cash",
//             notes: "",
//             TermsAndConditions: "",
//         },
//     });

//     const { fields, append, remove } = useFieldArray({
//         control,
//         name: "services",
//     });

//     const services = watch("services");
//     const subtotal = services.reduce((sum, s) => sum + (Number(s.price) || 0), 0);
//     const totalDiscount = services.reduce((sum, s) => sum + (Number(s.discount) || 0), 0);
//     const total = subtotal - totalDiscount;

//     const handleClose = () => {
//         reset();
//         onClose();
//     };

//     const onSubmit = (values: AddInvoiceFormValues) => {
//         addInvoice(
//             {
//                 ...values,
//                 patient: patientId,
//                 doctor: doctorId,
//                 visit: visitId,
//             },
//             {
//                 onSuccess: () => {
//                     reset();
//                     onClose();
//                 },
//             }
//         );
//     };

//     return (
//         <ModalShell isOpen={isOpen} onClose={handleClose} title={t("title")}>
//             <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
//                 {/* Services */}
//                 <div className="flex flex-col gap-3">
//                     <div className="flex items-center justify-between">
//                         <span className="text-sm font-medium">{t("services")}</span>
//                         <button
//                             type="button"
//                             onClick={() => append({ name: "", price: 0, discount: 0 })}
//                             className="text-sm text-primary"
//                         >
//                             + {t("addService")}
//                         </button>
//                     </div>

//                     {fields.map((field, index) => (
//                         <div key={field.id} className="grid grid-cols-[1fr_100px_100px_auto] gap-2">
//                             <Input
//                                 placeholder={t("serviceName")}
//                                 {...register(`services.${index}.name`)}
//                                 hasError={!!errors.services?.[index]?.name}
//                                 aria-invalid={!!errors.services?.[index]?.name}
//                             />
//                             <Input
//                                 type="number"
//                                 placeholder={t("price")}
//                                 min="0"
//                                 step="0.01"
//                                 {...register(`services.${index}.price`)}
//                                 hasError={!!errors.services?.[index]?.price}
//                                 aria-invalid={!!errors.services?.[index]?.price}
//                             />
//                             <Input
//                                 type="number"
//                                 placeholder={t("discount")}
//                                 min="0"
//                                 step="0.01"
//                                 {...register(`services.${index}.discount`)}
//                                 hasError={!!errors.services?.[index]?.discount}
//                                 aria-invalid={!!errors.services?.[index]?.discount}
//                             />
//                             {fields.length > 1 && (
//                                 <button
//                                     type="button"
//                                     onClick={() => remove(index)}
//                                     className="text-red-500"
//                                     aria-label="Remove service"
//                                 >
//                                     &times;
//                                 </button>
//                             )}
//                         </div>
//                     ))}
//                 </div>

//                 {/* Totals preview */}
//                 <div className="flex flex-col gap-1 rounded-lg bg-muted/40 p-4 text-sm">
//                     <div className="flex justify-between">
//                         <span>{t("subtotal")}</span>
//                         <span>{subtotal}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span>{t("discount")}</span>
//                         <span>{totalDiscount}</span>
//                     </div>
//                     <div className="flex justify-between font-semibold">
//                         <span>{t("total")}</span>
//                         <span>{total}</span>
//                     </div>
//                 </div>

//                 {/* Paid + payment method */}
//                 <div className="grid grid-cols-2 gap-3">
//                     <Input
//                         type="number"
//                         min="0"
//                         step="0.01"
//                         {...register("paid")}
//                         hasError={!!errors.paid}
//                         aria-invalid={!!errors.paid}
//                     />
//                     <div className="flex flex-col gap-1">
//                         <label className="text-sm">{t("paymentMethod")}</label>
//                         <select
//                             {...register("paymentMethod")}
//                             className="rounded-lg border border-border p-2 text-sm"
//                         >
//                             <option value="cash">{t("cash")}</option>
//                             <option value="card">{t("card")}</option>
//                             <option value="insurance">{t("insurance")}</option>
//                         </select>
//                     </div>
//                 </div>

//                 {errors.paid && <p className="-mt-3 text-xs text-red-500">{errors.paid.message}</p>}

//                 <div className="flex flex-col gap-1">
//                     <label className="text-sm" htmlFor="invoice-notes">{t("notes")}</label>
//                     <Input id="invoice-notes" {...register("notes")} />
//                 </div>
//                 <div className="flex flex-col gap-1">
//                     <label className="text-sm" htmlFor="invoice-terms">{t("terms")}</label>
//                     <Input id="invoice-terms" {...register("TermsAndConditions")} />
//                 </div>

//                 <div className="flex justify-end gap-3">
//                     <Button type="button" variant="outline" onClick={handleClose}>
//                         {t("cancel")}
//                     </Button>
//                     <Button type="submit" disabled={isPending}>
//                         {isPending ? t("saving") : t("save")}
//                     </Button>
//                 </div>
//             </form>
//         </ModalShell>
//     );
// };

// export default AddInvoiceModal;
