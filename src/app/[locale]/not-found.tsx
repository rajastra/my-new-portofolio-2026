import type { CSSProperties } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { isLocale, routing } from "@/i18n/routing";
import { getContent } from "@/content";
import { buttonClass } from "@/components/ui/button-link";

/** A lost visitor gets the title at display size, one way home, and the work to look at instead. */
export default function NotFound() {
  const t = useTranslations("notFound");
  const tw = useTranslations("work");
  const raw = useLocale();
  const locale = isLocale(raw) ? raw : routing.defaultLocale;
  const content = getContent(locale);

  // Two balanced lines: the split where the longer line is shortest.
  const words = t("title").split(" ");
  let k = 1;
  for (let j = 1; j < words.length; j++) {
    const a = words.slice(0, j).join(" ").length;
    const b = words.slice(j).join(" ").length;
    const best = Math.max(words.slice(0, k).join(" ").length, words.slice(k).join(" ").length);
    if (Math.max(a, b) < best) k = j;
  }
  const first = words.slice(0, k).join(" ");
  const rest = words.slice(k);
  const work = [
    ...content.projects.filter((p) => p.shots?.[0]).map((p) => ({ key: p.slug, name: p.title, kind: p.kind, image: p.shots![0], href: `/projects/${p.slug}` })),
    ...content.openSource.filter((o) => o.image).map((o) => ({ key: o.repo, name: o.name, kind: tw("kindCode"), image: o.image!, href: o.demo ?? o.repo })),
  ].slice(0, 4);

  return (
    <section aria-labelledby="nf-title" className="px-4 pb-[clamp(5rem,10vh,8rem)] pt-[clamp(4rem,10vh,7rem)] sm:px-7">
      <div className="mx-auto max-w-[90rem]">
        <h1
          id="nf-title"
          className="lines text-[11vw] font-black leading-[0.9] tracking-[-0.035em] text-jade md:text-display"
        >
          <span className="line">
            <span data-line style={{ "--i": 0 } as CSSProperties}>
              {first}{" "}
            </span>
          </span>
          <span className="line">
            <span data-line style={{ "--i": 1 } as CSSProperties}>
              {rest.join(" ")}
            </span>
          </span>
        </h1>
        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[44ch] text-lead" data-load>
            {t("text")}
          </p>
          <Link href="/" className={buttonClass("primary")} data-load>
            {t("home")}
          </Link>
        </div>

        <ul className="mt-[clamp(5rem,10vh,8rem)] grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {work.map((w, n) => {
            const inner = (
              <>
                <Image
                  src={w.image.src}
                  alt=""
                  width={w.image.width}
                  height={w.image.height}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[16/10] w-full bg-tone object-cover object-top"
                />
                <span className="mt-3 block font-medium group-hover:text-jade">{w.name}</span>
                <span className="block text-slate">{w.kind}</span>
              </>
            );
            return (
              <li key={w.key} className="reveal" style={{ "--i": n } as CSSProperties}>
                {w.href.startsWith("/") ? (
                  <Link href={w.href} className="press group block">
                    {inner}
                  </Link>
                ) : (
                  <a href={w.href} target="_blank" rel="noopener" className="press group block">
                    {inner}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
