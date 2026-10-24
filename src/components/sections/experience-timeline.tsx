import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Experience } from "@/content/types";
import { Section } from "@/components/ui/section";
import { Only } from "@/components/ui/only";
import { formatMonth } from "@/lib/utils";

export async function ExperienceTimeline({
  locale,
  experience,
}: {
  locale: Locale;
  experience: Experience[];
}) {
  const t = await getTranslations({ locale, namespace: "experience" });

  return (
    <Section id="experience" title={t("title")}>
      <ol className="divide-y divide-rule border-b border-rule">
        {experience.map((item) => {
          const startDate = formatMonth(item.start, locale);
          const endDate = item.end ? formatMonth(item.end, locale) : t("present");

          return (
            <li key={`${item.company}-${item.start}`} className="py-8">
              <div className="grid gap-2 md:grid-cols-12 md:gap-6">
                <div className="text-sm text-slate md:col-span-3">
                  {startDate} – {endDate}
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-semibold text-ink">{item.role}</h3>
                  <p className="text-sm text-slate">
                    {item.company}, {item.place}
                  </p>

                  <Only view="recruiter" className="mt-3">
                    <p className="max-w-[65ch] text-base text-ink">{item.summary.recruiter}</p>
                    {item.highlights.recruiter.length > 0 && (
                      <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-slate">
                        {item.highlights.recruiter.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </Only>

                  <Only view="engineer" className="mt-3">
                    <p className="max-w-[65ch] text-base text-ink">{item.summary.engineer}</p>
                    {item.highlights.engineer.length > 0 && (
                      <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-slate">
                        {item.highlights.engineer.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    )}
                    {item.stack.length > 0 && (
                      <p className="mt-3 text-sm text-slate">{item.stack.join(", ")}</p>
                    )}
                  </Only>

                  {item.project && (
                    <div className="mt-4">
                      <Link
                        href={`/projects/${item.project}`}
                        className="text-sm font-medium text-jade hover:underline"
                      >
                        {t("caseStudy")}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
