import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import LocaleSwitcher from "@/shared/components/LocaleSwitcher";
import { changeLocaleAction } from "@/lib/actions/changeLocale";
import { ThemeToggle } from "@/shared/components/ThemeButton";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "./globals.css";
import { pickMessages } from "@/lib/pickMessages";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();
  const clientMessages = pickMessages(messages, [
    "pricing",
    "faq",
    "stayUpdated",
    "forgetpassword",
  ]);
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          enableSystem={false}>
          <NextIntlClientProvider messages={clientMessages}>
            {children}
            <LocaleSwitcher changeLocaleAction={changeLocaleAction} />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
