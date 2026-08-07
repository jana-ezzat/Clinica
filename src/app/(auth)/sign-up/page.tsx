// src/app/(auth)/sign-up/page.tsx
"use client";
import { SignUpSchema, SignUpValues } from "@/lib/Sechma/signUpSchema";
import AuthTop from "@/modules/reset-pass/components/molecules/AuthTop";
import FormHead from "@/modules/reset-pass/components/molecules/FormHead";
import FormCard from "@/shared/components/atoms/Auth/FormCard";
import InputField from "@/shared/components/atoms/Auth/InputField";
import LoginLink from "@/shared/components/atoms/Auth/LoginLink";
import Button from "@/shared/components/atoms/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

const page = () => {
    const t = useTranslations("sign-up");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpValues>({
        resolver: zodResolver(SignUpSchema),
    });

    const onSubmit = (_data: SignUpValues) => {
        return;
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-5 py-4 sm:gap-6 sm:px-4 sm:py-6">
            <AuthTop />
            <div className="flex w-full flex-col items-center">
                <FormCard>
                    <FormHead
                        title={t("title")}
                        description={t("description")}
                    />

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <InputField
                            id="name"
                            type="text"
                            label={t("label")}
                            placeholder={t("placeholder")}
                            error={errors.name?.message && t(`error.${errors.name.message}`)}
                            {...register("name")}
                        />
                        <InputField
                            id="specialty"
                            type="text"
                            label={t("specialty.label")}
                            placeholder={t("specialty.placeholder")}
                            error={errors.specialty?.message && t(`error.${errors.specialty.message}`)}
                            {...register("specialty")}
                        />

                        <InputField
                            id="email"
                            type="email"
                            label={t("email.label")}
                            placeholder={t("email.placeholder")}
                            error={errors.email?.message && t(`error.${errors.email.message}`)}
                            {...register("email")}
                        />

                        <InputField
                            id="password"
                            type="password"
                            label={t("password.label")}
                            placeholder={t("password.placeholder")}
                            error={errors.password?.message && t(`error.${errors.password.message}`)}
                            {...register("password")}
                        />

                        <InputField
                            id="confirmPassword"
                            type="password"
                            label={t("confirmPassword.label")}
                            placeholder={t("confirmPassword.placeholder")}
                            error={
                                errors.confirmPassword?.message &&
                                t(`error.${errors.confirmPassword.message}`)
                            }
                            {...register("confirmPassword")}
                        />

                        <Button variant="primary" className="w-full mt-4" type="submit">
                            {t("btn")}
                        </Button>
                        <LoginLink>{t("loginLink")}</LoginLink>
                    </form>
                </FormCard>
            </div>
        </div>
    )
}

export default page
