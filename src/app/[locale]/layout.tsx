import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Schibsted_Grotesk } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing, isLocale } from "@/i18n/routing";
import { getContent } from "@/content";
import { SITE_URL } from "@/lib/utils";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ViewScript } from "@/components/view/view-script";
import { RevealObserver } from "@/components/layout/reveal-observer";
import "../globals.css";

const schibsted = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-schibsted", display: "swap" });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("title"), template: `%s | Raja Saputera` },
    description: t("description"),
    alternates: {
      canonical: locale === "en" ? "/" : `/${locale}`,
      languages: { en: "/", id: "/id" },
    },
    openGraph: { type: "website", siteName: "Raja Saputera", locale },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages({ locale });
  const { profile } = getContent(locale);

  return (
    <html lang={locale} suppressHydrationWarning className={schibsted.variable}>
      <head>
        <ViewScript />
      </head>
      <body className="min-h-dvh bg-paper text-ink antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <SiteHeader locale={locale} profile={profile} />
            <main id="main">{children}</main>
            <SiteFooter locale={locale} profile={profile} />
            <RevealObserver />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
