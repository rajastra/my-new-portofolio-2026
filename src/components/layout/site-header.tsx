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
    { href: "/#code", label: t("code") },
    { href: "/#experience", label: t("experience") },
    { href: "/#contact", label: t("contact") },
  ];
  const linkClass = "inline-flex min-h-11 items-center rounded-md px-3 text-base text-slate hover:text-ink";

  return (
    <header className="sticky top-0 z-20 border-b border-rule bg-paper/90 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-md focus:bg-paper-raised focus:px-4 focus:py-2"
      >
        {t("skip")}
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="inline-flex min-h-11 items-center text-base font-semibold tracking-tight">
          {name}
        </Link>
        <div className="flex items-center gap-1">
          <nav aria-label={t("sections")} className="hidden md:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <LocaleSwitch target={other} label={t("language")} short={t("languageShort")} />
          <ThemeToggle toLight={t("themeLight")} toDark={t("themeDark")} />
        </div>
      </div>
      {/* Phones: the same links on a second row, scrollable if a translation runs long. */}
      <nav aria-label={t("sections")} className="border-t border-rule md:hidden">
        <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-2">
          {nav.map((item) => (
            <li key={item.href} className="shrink-0">
              <Link href={item.href} className={linkClass}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
