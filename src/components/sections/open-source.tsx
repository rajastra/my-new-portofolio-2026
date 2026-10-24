import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import type { OpenSource as OpenSourceItem } from "@/content/types";
import { Section } from "@/components/ui/section";
import { Only } from "@/components/ui/only";

const linkClass =
  "inline-flex min-h-11 items-center font-medium text-jade underline-offset-4 hover:underline";

export async function OpenSource({ locale, items }: { locale: Locale; items: OpenSourceItem[] }) {
  const t = await getTranslations({ locale, namespace: "openSource" });

  return (
    <Section id="code" title={t("title")} intro={t("intro")}>
      <ul className="divide-y divide-rule border-b border-rule">
        {items.map((item) => (
          <li key={item.repo} className="grid gap-5 py-8 sm:grid-cols-[1fr_12rem] sm:gap-8">
            <div>
              <h3 className="text-lg font-semibold tracking-tight">{item.name}</h3>
              <p className="text-sm text-slate">{item.year}</p>
              <Only view="recruiter">
                <p className="mt-3 max-w-[60ch]">{item.summary.recruiter}</p>
              </Only>
              <Only view="engineer">
                <p className="mt-3 max-w-[60ch]">{item.summary.engineer}</p>
                <p className="mt-2 text-sm text-slate">{item.stack.join(", ")}</p>
              </Only>
              <p className="mt-2 flex flex-wrap gap-x-6">
                {item.demo ? (
                  <a className={linkClass} href={item.demo} target="_blank" rel="noopener">
                    {t("demo")}
                    <span className="sr-only">, {item.name}</span>
                  </a>
                ) : null}
                <a className={linkClass} href={item.repo} target="_blank" rel="noopener">
                  {t("repo")}
                  <span className="sr-only">, {item.name}</span>
                </a>
              </p>
            </div>
            {item.image ? (
              <a
                href={item.demo ?? item.repo}
                target="_blank"
                rel="noopener"
                tabIndex={-1}
                aria-hidden
                className="order-first block overflow-hidden rounded-md border border-rule hover:border-jade sm:order-none sm:self-start"
              >
                <Image
                  src={item.image.src}
                  alt=""
                  width={item.image.width}
                  height={item.image.height}
                  sizes="(min-width: 640px) 192px, 100vw"
                  className="h-auto w-full"
                />
              </a>
            ) : null}
          </li>
        ))}
      </ul>
    </Section>
  );
}
