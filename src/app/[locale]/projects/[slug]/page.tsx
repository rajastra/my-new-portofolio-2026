import { Suspense, type CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { isLocale } from "@/i18n/routing";
import { en } from "@/content/en";
import { getContent, getProject } from "@/content";
import { Only } from "@/components/ui/only";
import { ButtonLink, buttonClass } from "@/components/ui/button-link";
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

const i = (n: number) => ({ "--i": n }) as CSSProperties;

type Params = Promise<{ locale: string; slug: string }>;

/**
 * The params read lives in a child inside <Suspense>, so the route keeps a URL-independent
 * shell for instant navigation (Next 16 partial prefetching). Every slug is still prerendered.
 */
export default function ProjectPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={<article aria-busy className="min-h-[80svh]" />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

async function ProjectContent({ params }: { params: Params }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const project = getProject(locale, slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "project" });
  const tp = await getTranslations({ locale, namespace: "projects" });
  const tw = await getTranslations({ locale, namespace: "work" });

  // Two balanced lines: split where the longer line is shortest ("Revamp situs / web DPR").
  const words = project.title.split(" ");
  let titleLines = [project.title];
  if (words.length > 1) {
    let best = Infinity;
    for (let k = 1; k < words.length; k++) {
      const pair = [words.slice(0, k).join(" "), words.slice(k).join(" ")];
      const longest = Math.max(pair[0].length, pair[1].length);
      if (longest < best) {
        best = longest;
        titleLines = pair;
      }
    }
  }

  const h2 = "text-lead font-medium";
  const list = "mt-4 max-w-[65ch] space-y-3 [&>li]:pl-5 [&>li]:-indent-5 [&>li]:before:content-['–_']";

  // Other work with a screen to show, so every case study ends with a way onward.
  const content = getContent(locale);
  const more = [
    ...content.projects
      .filter((p) => p.slug !== project.slug && p.shots?.[0])
      .map((p) => ({ key: p.slug, name: p.title, kind: p.kind, image: p.shots![0], href: `/projects/${p.slug}`, external: false })),
    ...content.openSource
      .filter((o) => o.image)
      .map((o) => ({ key: o.repo, name: o.name, kind: tw("kindCode"), image: o.image!, href: o.demo ?? o.repo, external: true })),
  ].slice(0, 4);

  return (
    <article className="px-4 pb-[clamp(5rem,10vh,8rem)] pt-[clamp(4rem,10vh,7rem)] sm:px-7">
      <div className="mx-auto max-w-[90rem]">
        <h1 className="lines text-[13vw] font-black leading-[0.9] tracking-[-0.035em] text-jade md:text-display">
          {titleLines.map((line, n) => (
            <span key={n} className="line">
              <span data-line style={i(n)}>
                {line}
                {/* Trailing space keeps words apart in the accessible name. */}
                {n < titleLines.length - 1 ? " " : null}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-8 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-7" data-load style={{ "--d": "420ms" } as CSSProperties}>
            <Only view="recruiter">
              <p className="max-w-[44ch] text-lead">{project.summary.recruiter}</p>
            </Only>
            <Only view="engineer">
              <p className="max-w-[44ch] text-lead">{project.summary.engineer}</p>
            </Only>
            <p className="mt-4 text-slate">
              {project.client}, {project.period}
            </p>
          </div>
          {project.metrics.length > 0 && (
            <dl
              className="flex flex-wrap gap-x-10 gap-y-6 self-start bg-tone p-6 md:col-span-5"
              data-load
              style={{ "--d": "480ms" } as CSSProperties}
            >
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <dt className="text-lead font-semibold">{m.value}</dt>
                  <dd className="text-slate">{m.label}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {project.shots?.length ? (
          <div className="reveal mt-16">
            <ShotGallery shots={project.shots} />
          </div>
        ) : null}

        <div className="mt-20 grid gap-12 md:grid-cols-12 md:gap-6">
          <Only view="recruiter" className="space-y-12 md:col-span-7 md:col-start-3">
            <section className="reveal">
              <h2 className={h2}>{t("problem")}</h2>
              <p className="mt-4 max-w-[65ch]">{project.recruiter.problem}</p>
            </section>
            <section className="reveal" style={i(1)}>
              <h2 className={h2}>{t("role")}</h2>
              <p className="mt-4 max-w-[65ch]">{project.recruiter.role}</p>
            </section>
            <section className="reveal" style={i(2)}>
              <h2 className={h2}>{t("outcome")}</h2>
              <ul className={list}>
                {project.recruiter.outcome.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
          </Only>

          <Only view="engineer" className="space-y-12 md:col-span-7 md:col-start-3">
            <section className="reveal">
              <h2 className={h2}>{t("architecture")}</h2>
              <ul className={list}>
                {project.engineer.architecture.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
            {project.engineer.decisions.length > 0 && (
              <section className="reveal" style={i(1)}>
                <h2 className={h2}>{t("decisions")}</h2>
                <div className="mt-4 space-y-6">
                  {project.engineer.decisions.map((d, idx) => (
                    <div key={idx}>
                      <h3 className="font-semibold">{d.title}</h3>
                      <p className="mt-1 max-w-[65ch]">{d.body}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
            <section className="reveal" style={i(2)}>
              <h2 className={h2}>{t("stack")}</h2>
              <p className="mt-4">{project.engineer.stack.join(", ")}</p>
            </section>
          </Only>

          <div className="reveal space-y-6 md:col-span-7 md:col-start-3">
            {project.confidential && (
              <p className="text-slate">{tp(project.shots?.length ? "confidentialShots" : "confidential")}</p>
            )}
            <div className="flex flex-wrap gap-3">
              {project.links?.map((link) => (
                <ButtonLink key={link.href} variant="secondary" href={link.href} target="_blank" rel="noopener">
                  {link.label}
                </ButtonLink>
              ))}
              <Link href="/#work" className={buttonClass("primary")}>
                {t("back")}
              </Link>
            </div>
          </div>
        </div>

        <section aria-labelledby="more-title" className="mt-[clamp(7.5rem,14vh,12rem)]">
          <h2 id="more-title" className={`reveal ${h2}`}>
            {t("more")}
          </h2>
          <ul className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {more.map((m, n) => {
              const inner = (
                <>
                  <Image
                    src={m.image.src}
                    alt=""
                    width={m.image.width}
                    height={m.image.height}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="aspect-[16/10] w-full bg-tone object-cover object-top"
                  />
                  <span className="mt-3 block font-medium group-hover:text-jade">{m.name}</span>
                  <span className="block text-slate">{m.kind}</span>
                </>
              );
              return (
                <li key={m.key} className="reveal" style={i(n)}>
                  {m.external ? (
                    <a href={m.href} target="_blank" rel="noopener" className="press group block">
                      {inner}
                    </a>
                  ) : (
                    <Link href={m.href} className="press group block">
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </article>
  );
}
