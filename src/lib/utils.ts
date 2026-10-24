import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** "2023-05" → "May 2023" / "Mei 2023". */
export function formatMonth(iso: string, locale: string) {
  const [y, m] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, 1)));
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rajasaputera.me";
