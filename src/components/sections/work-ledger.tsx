import type { CSSProperties } from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { OpenSource, Photo, Project } from "@/content/types";
import { Only } from "@/components/ui/only";

type Row = {
  key: string;
  name: string;
  kind: string;
  stack: string;
  year: string;
  image?: Photo;
  internal?: string;
  external?: string;
};

/**
 * Quiet ledger: one column with three fixed starts (name, kind, year) and nothing drawn between
 * rows. Hovering or focusing a row keeps it in full ink, softens the rest and shows its screen
 * to the right of the column. On phones the first three rows show their screen above them.
 */
export async function WorkLedger({
  locale,
  projects,
  openSource,
}: {
  locale: Locale;
  projects: Project[];
  openSource: OpenSource[];
}) {
  const t = await getTranslations({ locale, namespace: "work" });

  const rows: Row[] = [
    ...projects.map((p) => ({
      key: p.slug,
      name: p.title,
      kind: p.kind,
      stack: p.engineer.stack.slice(0, 3).join(", "),
      year: p.year,
      image: p.shots?.[0],
      internal: `/projects/${p.slug}`,
    })),
    ...openSource.map((o) => ({
      key: o.repo,
      name: o.name,
      kind: t("kindCode"),
      stack: o.stack.slice(0, 3).join(", "),
      year: o.year,
      image: o.image,
      external: o.demo ?? o.repo,
    })),
  ];

  return (
    <section id="work" aria-labelledby="work-title" className="px-4 py-[clamp(7.5rem,14vh,12rem)] sm:px-7">
      <div className="mx-auto grid max-w-[90rem] md:grid-cols-12 md:gap-x-6">
        <div className="md:col-span-12 lg:col-span-6 lg:col-start-3">
          <h2 id="work-title" className="reveal text-lead font-medium">
            {t("title")}
          </h2>
          <ul className="group/ledger mt-8">
            {rows.map((row, index) => {
              const cells = (
                <>
                  <span className="font-medium">{row.name}</span>
                  <span className="col-span-2 text-sm text-slate md:col-span-1 md:text-base">
                    <Only view="recruiter" as="span">
                      {row.kind}
                    </Only>
                    <Only view="engineer" as="span">
                      {row.stack}
                    </Only>
                  </span>
                  <span className="col-start-2 row-start-1 tabular-nums md:col-start-3 md:text-right">{row.year}</span>
                </>
              );
              const rowClass =
                "press relative grid min-h-13 grid-cols-[1fr_auto] items-center gap-x-4 py-2 transition-colors duration-150 md:min-h-11 md:grid-cols-[55%_1fr_4rem] md:py-1.5 group-hover/ledger:text-slate hover:!text-ink focus-visible:!text-ink";
              return (
                <li
                  key={row.key}
                  className="reveal group/row relative"
                  style={{ "--i": Math.min(index, 4) } as CSSProperties}
                >
                  {row.image && index < 3 ? (
                    <Image
                      src={row.image.src}
                      alt=""
                      width={row.image.width}
                      height={row.image.height}
                      sizes="100vw"
                      className="mb-3 mt-6 aspect-[16/10] w-full bg-tone object-cover object-top lg:hidden"
                    />
                  ) : null}
                  {row.internal ? (
                    <Link href={row.internal} className={rowClass}>
                      {cells}
                    </Link>
                  ) : (
                    <a href={row.external} target="_blank" rel="noopener" className={rowClass}>
                      {cells}
                    </a>
                  )}
                  {row.image ? (
                    <Image
                      src={row.image.src}
                      alt=""
                      width={row.image.width}
                      height={row.image.height}
                      sizes="300px"
                      className={`pointer-events-none absolute left-[calc(100%+4rem)] top-0 z-10 hidden aspect-[4/3] w-[300px] bg-tone object-cover object-top transition-opacity duration-150 group-hover/row:!opacity-100 group-focus-within/row:!opacity-100 lg:block ${
                        // The first project's screen rests in view so the right side is never empty.
                        index === 0
                          ? "opacity-100 group-hover/ledger:opacity-0 group-focus-within/ledger:opacity-0"
                          : "opacity-0"
                      }`}
                    />
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
