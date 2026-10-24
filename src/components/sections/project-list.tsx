import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Project } from "@/content/types";
import { Section } from "@/components/ui/section";
import { Only } from "@/components/ui/only";

export async function ProjectList({ locale, projects }: { locale: Locale; projects: Project[] }) {
  const t = await getTranslations({ locale, namespace: "projects" });

  return (
    <Section id="projects" title={t("title")} intro={t("intro")}>
      <ul className="divide-y divide-rule border-b border-rule">
        {projects.map((project) => (
          <li
            key={project.slug}
            className="group relative grid gap-5 py-8 sm:grid-cols-[1fr_12rem] sm:gap-8"
          >
            {project.shots?.[0] ? (
              <div className="overflow-hidden rounded-md border border-rule transition-colors group-hover:border-jade sm:order-last sm:self-start">
                <Image
                  src={project.shots[0].src}
                  alt=""
                  width={project.shots[0].width}
                  height={project.shots[0].height}
                  sizes="(min-width: 640px) 192px, 100vw"
                  className="aspect-[16/10] h-auto w-full object-cover object-top"
                />
              </div>
            ) : null}
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-jade">
                  <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
                    {project.title}
                  </Link>
                </h3>
                <p className="text-sm text-slate">
                  {project.client}, {project.period}
                </p>
              </div>

              <Only view="recruiter">
                <p className="max-w-[65ch] text-base text-ink">{project.summary.recruiter}</p>
              </Only>

              <Only view="engineer">
                <p className="max-w-[65ch] text-base text-ink">{project.summary.engineer}</p>
              </Only>

              {project.metrics.length > 0 && (
                <dl className="mt-1 flex flex-wrap gap-x-6 gap-y-1 text-sm">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="flex gap-1.5">
                      <dt className="font-semibold text-ink">{m.value}</dt>
                      <dd className="text-slate">{m.label}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {project.confidential && (
                <p className="text-sm text-slate">{t("confidential")}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
