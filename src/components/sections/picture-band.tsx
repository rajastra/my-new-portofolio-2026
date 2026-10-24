import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import type { Shot } from "@/content/types";

/** The pictures arrive large: the ERP on desktop and the booking search on a phone, side by side. */
export async function PictureBand({ locale, desktop, phone }: { locale: Locale; desktop: Shot; phone: Shot }) {
  const t = await getTranslations({ locale, namespace: "band" });

  return (
    <section aria-labelledby="band-title" className="bg-tone px-4 py-[clamp(5rem,10vh,8rem)] sm:px-7">
      <div className="mx-auto max-w-[90rem]">
        <h2 id="band-title" className="reveal text-lead font-medium">
          {t("title")}
        </h2>
        <div className="mt-10 grid items-end gap-6 md:grid-cols-12">
          <figure className="reveal md:col-span-9">
            <div className="overflow-clip bg-paper-raised">
              <Image
                src={desktop.src}
                alt={desktop.alt}
                width={desktop.width}
                height={desktop.height}
                sizes="(min-width: 1440px) 1040px, (min-width: 768px) 75vw, 100vw"
                className="drift h-auto w-full"
              />
            </div>
            <figcaption className="mt-3">{t("erp")}</figcaption>
          </figure>
          <figure className="reveal md:col-span-3" style={{ "--i": 2 } as React.CSSProperties}>
            <div className="mx-auto w-[min(260px,70%)] overflow-clip rounded-[1.6rem] border-[6px] border-ink/85 bg-paper-raised md:w-full">
              <Image
                src={phone.src}
                alt={phone.alt}
                width={phone.width}
                height={phone.height}
                sizes="260px"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 text-center md:text-left">{t("ukm")}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
