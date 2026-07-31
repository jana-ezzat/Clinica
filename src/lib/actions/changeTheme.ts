"use server";
import { cookies } from "next/headers";

export type Theme = "light" | "dark";

export async function changeThemeAction(theme: Theme) {
  (await cookies()).set("theme", theme);
}
