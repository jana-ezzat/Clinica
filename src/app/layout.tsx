import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import LocaleSwitcher from "@/shared/components/LocaleSwitcher";
import { changeLocaleAction } from "@/lib/actions/changeLocale";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "./globals.css";
import { pickMessages } from "@/lib/pickMessages";
import { Cairo, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import QueryProvider from "@/providers/QueryProvider";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["600", "700", "800"],
  variable: "--font-cairo",
});

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
    "resetpassword",
    "signin",
    "sign-up",
  ]);

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={cn("font-sans", inter.variable, cairo.variable)}>
      <body>
        <QueryProvider>
          <ThemeProvider
            attribute="data-theme"
            defaultTheme="light"
            enableSystem={false}>
            <NextIntlClientProvider messages={clientMessages}>
              {children}
              <LocaleSwitcher changeLocaleAction={changeLocaleAction} />
            </NextIntlClientProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
