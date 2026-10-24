import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { isLocale } from "@/i18n/routing";
import { getContent } from "@/content";
import { Hero } from "@/components/sections/hero";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const content = getContent(locale);

  return (
    <>
      <Hero locale={locale} profile={content.profile} />
      {/* Sections: ProjectList, ExperienceTimeline, Skills, Contact */}
    </>
  );
}
