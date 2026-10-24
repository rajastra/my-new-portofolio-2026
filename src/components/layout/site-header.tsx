import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Profile } from "@/content/types";
import { buttonClass } from "@/components/ui/button-link";
import { LocaleSwitch } from "./locale-switch";
import { ThemeToggle } from "./theme-toggle";

/** A plain top row on the paper ground: wordmark left, a few words and the one action right. */
export async function SiteHeader({ locale, profile }: { locale: Locale; profile: Profile }) {
  const t = await getTranslations({ locale, namespace: "nav" });
  const th = await getTranslations({ locale, namespace: "hero" });
  const other: Locale = locale === "en" ? "id" : "en";
  const nav = [
    { href: "/#work", label: t("projects") },
    { href: "/#experience", label: t("experience") },
    { href: "/#contact", label: t("contact") },
  ];

  return (
    <header className="relative z-20 bg-paper">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:bg-paper-raised focus:px-4 focus:py-2"
      >
        {t("skip")}
      </a>
      <div className="mx-auto flex h-18 max-w-[90rem] items-center justify-between gap-3 px-4 sm:px-7">
        <Link href="/" className="press inline-flex min-h-11 items-center gap-3 font-semibold tracking-tight">
          <Image
            src={profile.photo.src}
            alt=""
            width={profile.photo.width}
            height={profile.photo.height}
            sizes="36px"
            className="size-9 rounded-full object-cover object-top"
          />
          {profile.name}
        </Link>
        <nav aria-label={t("sections")} className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="press inline-flex min-h-11 items-center px-3 text-slate hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <LocaleSwitch target={other} label={t("language")} short={t("languageShort")} />
          <ThemeToggle toLight={t("themeLight")} toDark={t("themeDark")} />
          <a
            href={profile.links.cv}
            download
            aria-label={th("downloadCv")}
            className={buttonClass("primary", "ml-1 px-4 sm:ml-2 sm:px-5")}
          >
            {/* Phones get the short label so the action fits next to the wordmark. */}
            <span className="sm:hidden">CV</span>
            <span className="hidden sm:inline">{th("downloadCv")}</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
