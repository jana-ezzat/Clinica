"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import type { Locale } from "next-intl";

export async function changeLocaleAction(locale: Locale) {
  (await cookies()).set("locale", locale);
  revalidatePath("/", "layout");
}