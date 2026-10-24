import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import type { SkillGroup, Education } from "@/content/types";
import { Section } from "@/components/ui/section";
import { formatMonth } from "@/lib/utils";

export async function Skills({
  locale,
  skills,
  education,
}: {
  locale: Locale;
  skills: SkillGroup[];
  education: Education[];
}) {
  const t = await getTranslations({ locale, namespace: "skills" });

  return (
    <Section id="skills" title={t("title")}>
      <dl className="divide-y divide-rule border-b border-rule">
        {skills.map((group) => (
          <div key={group.name} className="grid gap-1 py-4 md:grid-cols-12 md:gap-6">
            <dt className="text-sm font-semibold text-ink md:col-span-3">{group.name}</dt>
            <dd className="text-base text-slate md:col-span-9">{group.items.join(", ")}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-12">
        <h3 className="text-lg font-semibold tracking-tight text-ink">{t("education")}</h3>
        <ul className="mt-6 divide-y divide-rule border-b border-rule">
          {education.map((edu) => (
            <li key={edu.school} className="py-6">
              <div className="grid gap-1 md:grid-cols-12 md:gap-6">
                <div className="text-sm text-slate md:col-span-3">
                  {edu.start && edu.end
                    ? `${formatMonth(edu.start, locale)} – ${formatMonth(edu.end, locale)}`
                    : null}
                </div>
                <div className="md:col-span-9">
                  <p className="font-semibold text-ink">{edu.program}</p>
                  <p className="text-slate">{edu.school}</p>
                  {edu.note && <p className="mt-1 text-sm text-slate">{edu.note}</p>}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
