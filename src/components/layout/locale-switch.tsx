"use client";

import { Link, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

type LocaleSwitchProps = { target: Locale; label: string; short: string };

export function LocaleSwitch({ target, label, short }: LocaleSwitchProps) {
  const pathname = usePathname();
  return (
    <Link
      href={pathname}
      locale={target}
      hrefLang={target}
      // Name must contain the visible text (WCAG 2.5.3).
      aria-label={`${short}, ${label}`}
      className="press inline-flex size-11 items-center justify-center text-sm font-semibold text-slate hover:text-ink"
    >
      {short}
    </Link>
  );
}
