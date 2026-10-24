import type { CSSProperties, ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Education, Experience, SkillGroup } from "@/content/types";
import { Only } from "@/components/ui/only";

function years(start?: string, end?: string | null, present?: string) {
  if (!start) return "";
  const a = start.slice(0, 4);
  const b = end ? end.slice(0, 4) : present;
  return a === b ? a : `${a}–${b}`;
}

/**
 * Line-up at one type size on an inverted (ink) field. Four fixed column starts do the
 * organising; part headings are a single line in the accent; nothing is drawn between rows.
 */
export async function CareerTable({
  locale,
  experience,
  education,
  skills,
}: {
  locale: Locale;
  experience: Experience[];
  education: Education[];
  skills: SkillGroup[];
}) {
  const t = await getTranslations({ locale, namespace: "experience" });
  const ts = await getTranslations({ locale, namespace: "skills" });

  const row =
    "reveal grid gap-x-6 py-[0.25em] lg:grid-cols-[28%_32%_1fr_auto] lg:items-baseline";
  const wrap = "text-base text-paper/75 lg:text-lead lg:text-paper";
  const soft = wrap;

  const part = (id: string, title: string, children: ReactNode, first = false) => (
    <div className={first ? "" : "mt-[4.5rem]"}>
      {first ? (
        <h2 id={id} className="reveal mb-5 text-lead text-marigold dark:text-[#0f5c4d]">
          {title}
        </h2>
      ) : (
        <h3 id={id} className="reveal mb-5 text-lead text-marigold dark:text-[#0f5c4d]">
          {title}
        </h3>
      )}
      <ul className="text-lead">{children}</ul>
    </div>
  );

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="bg-ink px-4 py-[clamp(7.5rem,14vh,12rem)] text-paper sm:px-6"
    >
      <div className="mx-auto max-w-[90rem]">
        {part(
          "experience-title",
          t("title"),
          experience.map((e, i) => (
            <li key={e.company + e.start} className={row} style={{ "--i": Math.min(i, 4) } as CSSProperties}>
              <span>
                {e.project ? (
                  <Link href={`/projects/${e.project}`} className="underline-offset-[0.15em] hover:underline">
                    {e.role}
                    <span className="sr-only">, {t("caseStudy")}</span>
                  </Link>
                ) : (
                  e.role
                )}
              </span>
              <span className={wrap}>{e.company}</span>
              <span className={soft}>
                <Only view="recruiter" as="span">
                  {e.place}
                </Only>
                <Only view="engineer" as="span">
                  {e.stack.slice(0, 3).join(", ")}
                </Only>
              </span>
              <span className={`${soft} tabular-nums whitespace-nowrap lg:text-right`}>{years(e.start, e.end, t("present"))}</span>
            </li>
          )),
          true,
        )}

        {part(
          "education-title",
          ts("education"),
          education.map((e, i) => (
            <li key={e.school} className={row} style={{ "--i": i } as CSSProperties}>
              <span>{e.program}</span>
              <span className={`${wrap} lg:col-span-2`}>{e.school}</span>
              <span className={`${soft} tabular-nums whitespace-nowrap lg:text-right`}>{years(e.start, e.end)}</span>
              {e.note ? <span className="mt-1 text-base text-paper/80 lg:col-span-4">{e.note}</span> : null}
            </li>
          )),
        )}

        {part(
          "skills-title",
          ts("title"),
          skills.map((s, i) => (
            <li key={s.name} className={row} style={{ "--i": Math.min(i, 4) } as CSSProperties}>
              <span>{s.name}</span>
              <span className={`${wrap} lg:col-span-3`}>{s.items.join(", ")}</span>
            </li>
          )),
        )}
      </div>
    </section>
  );
}
