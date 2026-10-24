import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import type { Profile } from "@/content/types";

/** The page closes on a jade field with the email address as the display line. */
export async function SiteFooter({ locale, profile }: { locale: Locale; profile: Profile }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const [user, domain] = profile.email.split("@");
  const small = "press inline-flex min-h-11 items-center underline-offset-4 hover:underline";

  return (
    <footer className="flex min-h-[90svh] flex-col bg-jade px-4 pb-6 pt-10 text-on-jade sm:px-7">
      <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-2 sm:flex-row sm:justify-between">
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-10">
          <p className="font-semibold">{profile.name}</p>
          <p>{t("notes")}</p>
          <p>{profile.availability}</p>
        </div>
        <a href="#main" className={small}>
          {t("top")}
        </a>
      </div>

      <div className="mx-auto mt-auto w-full max-w-[90rem] pt-24">
        <a
          href={`mailto:${profile.email}`}
          className="press block text-[13vw] font-black lowercase leading-[0.86] tracking-[-0.035em] underline-offset-[0.1em] hover:underline md:text-display"
        >
          {user}
          <br />@{domain}
        </a>

        <div className="mt-10 grid gap-2 sm:grid-cols-3">
          <ul className="flex gap-5">
            <li>
              <a className={small} href={profile.links.github} target="_blank" rel="noopener">
                GitHub
              </a>
            </li>
            <li>
              <a className={small} href={profile.links.linkedin} target="_blank" rel="noopener">
                LinkedIn
              </a>
            </li>
            <li>
              <a className={small} href={profile.links.cv} download>
                CV
              </a>
            </li>
          </ul>
          <p className="self-center sm:text-center">{t("built")}</p>
          <p className="self-center sm:text-right">{profile.location}</p>
        </div>
      </div>
    </footer>
  );
}
