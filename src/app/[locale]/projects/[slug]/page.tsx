import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { isLocale } from "@/i18n/routing";
import { en } from "@/content/en";
import { getProject } from "@/content";
import { Only } from "@/components/ui/only";
import { ButtonLink } from "@/components/ui/button-link";
import { ShotGallery } from "@/components/work/shot-gallery";

export function generateStaticParams() {
  return en.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const project = getProject(locale, slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary.recruiter,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const project = getProject(locale, slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "project" });
  const tp = await getTranslations({ locale, namespace: "projects" });

  return (
    <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <div className="max-w-[65ch]">
        <Link
          href="/#projects"
          className="-ml-1 inline-flex min-h-11 items-center px-1 text-base font-medium text-jade hover:underline"
        >
          {t("back")}
        </Link>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          {project.title}
        </h1>
        <p className="mt-2 text-base text-slate">
          {project.client}, {project.period}
        </p>

        {project.metrics.length > 0 && (
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 border-y border-rule py-4">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex flex-col">
                <dt className="text-2xl font-semibold text-ink">{m.value}</dt>
                <dd className="text-sm text-slate">{m.label}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      {project.shots?.length ? (
        <div className="mt-12">
          <ShotGallery shots={project.shots} />
        </div>
      ) : null}

      <div className="max-w-[65ch]">
        <Only view="recruiter" className="mt-12 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-ink">{t("problem")}</h2>
            <p className="mt-3 text-base leading-relaxed text-ink">{project.recruiter.problem}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink">{t("role")}</h2>
            <p className="mt-3 text-base leading-relaxed text-ink">{project.recruiter.role}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink">{t("outcome")}</h2>
            <ul className="mt-3 list-disc list-inside space-y-2 text-base leading-relaxed text-ink">
              {project.recruiter.outcome.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>
        </Only>

        <Only view="engineer" className="mt-12 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-ink">{t("architecture")}</h2>
            <ul className="mt-3 list-disc list-inside space-y-2 text-base leading-relaxed text-ink">
              {project.engineer.architecture.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          {project.engineer.decisions.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-ink">{t("decisions")}</h2>
              <div className="mt-4 space-y-4">
                {project.engineer.decisions.map((d, idx) => (
                  <div key={idx}>
                    <h3 className="text-base font-semibold text-ink">{d.title}</h3>
                    <p className="mt-1 text-base leading-relaxed text-slate">{d.body}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="text-xl font-semibold text-ink">{t("stack")}</h2>
            <p className="mt-3 text-base text-slate">{project.engineer.stack.join(", ")}</p>
          </section>
        </Only>

        {project.confidential && (
          <p className="mt-10 border-t border-rule pt-6 text-sm text-slate">
            {tp(project.shots?.length ? "confidentialShots" : "confidential")}
          </p>
        )}

        {project.links && project.links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-4">
            {project.links.map((link) => (
              <ButtonLink key={link.href} variant="secondary" href={link.href}>
                {link.label}
              </ButtonLink>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
