import type { CSSProperties } from "react";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

/** Two giant figures compared, each with the sentence that says what it counts. */
export async function TwoNumbers({ locale, a, b }: { locale: Locale; a: string; b: string }) {
  const t = await getTranslations({ locale, namespace: "numbers" });
  const figures = [
    { value: a, caption: t("a") },
    { value: b, caption: t("b") },
  ];

  return (
    <section aria-labelledby="numbers-title" className="px-4 py-[clamp(7.5rem,14vh,12rem)] sm:px-7">
      <div className="mx-auto grid max-w-[90rem] gap-6 md:grid-cols-12">
        <h2 id="numbers-title" className="reveal text-lead font-medium md:col-span-5">
          {t("title")}
        </h2>
        <p className="reveal max-w-[60ch] md:col-span-6 md:col-start-7" style={{ "--i": 1 } as CSSProperties}>
          {t("text")}
        </p>
      </div>
      <div className="mx-auto mt-[10vh] grid max-w-[90rem] gap-12 md:grid-cols-12 md:gap-6">
        {figures.map((f, i) => (
          <figure key={f.value} className={i === 0 ? "md:col-span-6" : "md:col-span-6 md:col-start-7"}>
            <p
              className="reveal text-specimen font-black leading-[0.8] tracking-[-0.04em] tabular-nums"
              style={{ "--i": i } as CSSProperties}
            >
              {f.value}
            </p>
            <figcaption className="reveal mt-4" style={{ "--i": i + 1 } as CSSProperties}>
              {f.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
