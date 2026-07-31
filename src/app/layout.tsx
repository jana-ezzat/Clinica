import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import LocaleSwitcher from "@/shared/components/LocaleSwitcher";
import { changeLocaleAction } from "@/lib/actions/changeLocale";
import { ThemeToggle } from "@/shared/components/ThemeButton";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          enableSystem={false}>
          <NextIntlClientProvider messages={messages}>
            {children}
            <LocaleSwitcher changeLocaleAction={changeLocaleAction} />
            <ThemeToggle />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
