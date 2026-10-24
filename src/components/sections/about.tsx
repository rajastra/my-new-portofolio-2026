import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { AboutPart, Profile, View } from "@/content/types";
import { Only } from "@/components/ui/only";

const tones: Record<Exclude<AboutPart, string>["tone"], string> = {
  soft: "bg-[#dcebe6]",
  sun: "bg-marigold",
  plain: "bg-[#d9e0dd]",
};

/** The story set large in two columns, with the facts a scanning reader wants highlighted. */
export async function About({ locale, profile }: { locale: Locale; profile: Profile }) {
  const t = await getTranslations({ locale, namespace: "about" });

  const text = (view: View) => (
    <p className="reveal text-lead leading-[1.18] md:columns-2 md:gap-8">
      {profile.about[view].map((part, i) =>
        typeof part === "string" ? (
          <span key={i}>{part}</span>
        ) : (
          <mark key={i} className={`mark ${tones[part.tone]}`}>
            {part.mark}
          </mark>
        ),
      )}{" "}
      <Link
        href="/#contact"
        className="press box-decoration-clone bg-jade px-[0.1em] text-on-jade underline-offset-[0.15em] hover:underline"
      >
        {profile.aboutClose[view]}
      </Link>
    </p>
  );

  return (
    <section aria-labelledby="about-title" className="px-4 py-[clamp(7.5rem,14vh,12rem)] sm:px-6">
      <div className="mx-auto max-w-[90rem]">
        <h2 id="about-title" className="reveal mb-8 text-lead font-medium">
          {t("title")}
        </h2>
        <Only view="recruiter">{text("recruiter")}</Only>
        <Only view="engineer">{text("engineer")}</Only>
      </div>
    </section>
  );
}
