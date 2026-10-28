import type { CSSProperties } from "react";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import type { Profile } from "@/content/types";
import { Only } from "@/components/ui/only";
import { ViewSwitcher } from "@/components/view/view-switcher";

/**
 * Waterline hero: a paper field over a jade field. The seam runs between the two headline lines:
 * FRONTEND sits on paper in jade, ENGINEER on jade in the paper colour. Everything is in normal
 * flow (a paper spacer, the two lines, then the sentence and switcher on jade), so nothing can
 * overlap however short the window is. The display size is also capped by the window height.
 */
export async function Hero({ locale, profile }: { locale: Locale; profile: Profile }) {
  const t = await getTranslations({ locale, namespace: "hero" });
  const tv = await getTranslations({ locale, namespace: "view" });
  const [first, second] = t("headline").split("\n");

  return (
    // Phones: a shorter hero so the start of the work list shows on the first screen.
    <section
      aria-labelledby="hero-title"
      className="flex min-h-[68svh] flex-col bg-jade md:min-h-[calc(100svh-4.5rem)]"
    >
      {/* Paper field above the first line; grows so the seam sits near the middle. */}
      <div className="flex-1 bg-paper" />

      <h1
        id="hero-title"
        className="lines text-center text-[15.5vw] font-black uppercase leading-[0.9] tracking-[-0.035em] md:text-[clamp(4rem,min(12vw,22svh),11.875rem)]"
      >
        <span className="sr-only">{profile.name}, </span>
        <span className="line bg-paper px-4 text-jade">
          <span data-line style={{ "--i": 0 } as CSSProperties}>
            {first}
          </span>
        </span>{" "}
        {/* The space above keeps the accessible name "Frontend Engineer", not "FrontendEngineer". */}
        <span className="line px-4 pt-[0.08em] text-on-jade">
          <span data-line style={{ "--i": 1 } as CSSProperties}>
            {second}
          </span>
        </span>
      </h1>

      <div className="flex flex-1 flex-col justify-end px-4 pb-8 pt-10 text-on-jade sm:px-7 md:pb-10">
        <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-6 md:items-center md:text-center">
          <div data-load style={{ "--d": "420ms" } as CSSProperties}>
            <Only view="recruiter">
              <p className="max-w-[44ch] text-lead">{profile.intro.recruiter}</p>
            </Only>
            <Only view="engineer">
              <p className="max-w-[44ch] text-lead">{profile.intro.engineer}</p>
            </Only>
          </div>
          <div
            data-load
            style={{ "--d": "480ms" } as CSSProperties}
            className="flex flex-wrap items-center gap-4 md:justify-center"
          >
            <ViewSwitcher
              hint={tv("hint")}
              label={tv("label")}
              names={{ recruiter: tv("recruiter"), engineer: tv("engineer") }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
