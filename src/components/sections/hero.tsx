import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Profile } from "@/content/types";
import { Only } from "@/components/ui/only";
import { ButtonLink, buttonClass } from "@/components/ui/button-link";
import { ViewSwitcher } from "@/components/view/view-switcher";

export async function Hero({ locale, profile }: { locale: Locale; profile: Profile }) {
  const t = await getTranslations({ locale, namespace: "hero" });
  const tv = await getTranslations({ locale, namespace: "view" });

  return (
    <section aria-labelledby="hero-title" className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 md:pb-28 md:pt-24">
      <p className="text-lg text-slate">
        {profile.name}, {profile.role}
      </p>
      <h1
        id="hero-title"
        className="mt-4 max-w-[18ch] text-3xl font-semibold tracking-[-0.025em] text-balance md:text-4xl lg:text-[3.815rem] lg:leading-[1.02]"
      >
        {profile.headline}
      </h1>

      <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <ViewSwitcher
            label={tv("label")}
            hint={tv("hint")}
            names={{ recruiter: tv("recruiter"), engineer: tv("engineer") }}
          />
        </div>

        <div className="border-l-2 border-jade pl-6 md:col-span-7 md:col-start-6" aria-live="polite">
          <Only view="recruiter">
            <p className="max-w-[60ch] text-lg">{profile.intro.recruiter}</p>
            <p className="mt-4 text-base text-slate">
              {profile.location}. {profile.availability}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={profile.links.cv} download>
                {t("downloadCv")}
              </ButtonLink>
              <ButtonLink variant="secondary" href={`mailto:${profile.email}`}>
                {t("email")}
              </ButtonLink>
            </div>
          </Only>

          <Only view="engineer">
            <p className="max-w-[60ch] text-lg">{profile.intro.engineer}</p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-base text-slate" aria-label="Stack">
              {profile.coreStack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/projects/school-erp" className={buttonClass("primary")}>
                {t("readCase")}
              </Link>
              <ButtonLink variant="secondary" href={profile.links.github}>
                {t("github")}
              </ButtonLink>
            </div>
          </Only>
        </div>
      </div>
    </section>
  );
}
