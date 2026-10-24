import type { Locale } from "@/i18n/routing";
import type { Content } from "./types";
import { en } from "./en";
import { id } from "./id";

const byLocale: Record<Locale, Content> = { en, id };

export function getContent(locale: Locale): Content {
  return byLocale[locale];
}

export function getProject(locale: Locale, slug: string) {
  return getContent(locale).projects.find((p) => p.slug === slug);
}

export * from "./types";
