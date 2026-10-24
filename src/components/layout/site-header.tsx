import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { LocaleSwitch } from "./locale-switch";
import { ThemeToggle } from "./theme-toggle";

export async function SiteHeader({ locale, name }: { locale: Locale; name: string }) {
  const t = await getTranslations({ locale, namespace: "nav" });
  const other: Locale = locale === "en" ? "id" : "en";
  const nav = [
    { href: "/#projects", label: t("projects") },
    { href: "/#experience", label: t("experience") },
    { href: "/#contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-rule bg-paper/90 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-md focus:bg-paper-raised focus:px-4 focus:py-2"
      >
        {t("skip")}
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="text-base font-semibold tracking-tight">
          {name}
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 sm:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="rounded-md px-3 py-2 text-base text-slate hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <LocaleSwitch target={other} label={t("language")} short={t("languageShort")} />
          <ThemeToggle toLight={t("themeLight")} toDark={t("themeDark")} />
        </nav>
      </div>
    </header>
  );
}
