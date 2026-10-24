import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import type { Profile } from "@/content/types";
import { ContactForm } from "./contact-form";

/**
 * Closing row: a sentence (cols 1–5), a square portrait (cols 8–9) and the way to reach me
 * (cols 10–12), all hanging from one top line. The message form follows beneath the sentence.
 */
export async function Contact({ locale, profile }: { locale: Locale; profile: Profile }) {
  const t = await getTranslations({ locale, namespace: "closing" });
  const tc = await getTranslations({ locale, namespace: "contact" });

  const link = "press inline-flex min-h-11 items-center underline underline-offset-4 hover:text-jade";

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="px-4 pb-[clamp(5rem,10vh,7.5rem)] pt-[clamp(7.5rem,15vh,10rem)] sm:px-6"
    >
      <div className="mx-auto grid max-w-[90rem] grid-cols-[6rem_1fr] gap-x-5 gap-y-8 lg:grid-cols-12 lg:gap-x-6">
        <p className="reveal col-span-2 text-lead font-medium leading-[1.1] lg:col-span-5">{t("sentence")}</p>

        <Image
          src={profile.photo.src}
          alt={profile.photo.alt}
          width={profile.photo.width}
          height={profile.photo.height}
          sizes="(min-width: 1024px) 170px, 96px"
          className="reveal aspect-square w-24 object-cover object-top lg:col-span-2 lg:col-start-8 lg:w-[170px]"
          style={{ "--i": 1 } as React.CSSProperties}
        />

        <div className="reveal lg:col-span-3 lg:col-start-10" style={{ "--i": 2 } as React.CSSProperties}>
          <h2 id="contact-title" className="font-medium">
            {t("question")}
          </h2>
          <ul className="mt-3">
            <li>
              <a className={link} href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </li>
            <li>
              <a className={link} href={profile.links.linkedin} target="_blank" rel="noopener">
                LinkedIn
              </a>
            </li>
          </ul>
          <p className="mt-3 text-slate">{t("reply")}</p>
        </div>

        <div className="reveal col-span-2 mt-10 lg:col-span-12 lg:mt-20">
          <h3 className="mb-6 font-medium">{t("form")}</h3>
          <ContactForm email={profile.email} />
          <p className="sr-only">{tc("intro")}</p>
        </div>
      </div>
    </section>
  );
}
