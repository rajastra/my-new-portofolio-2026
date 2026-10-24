import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { isLocale } from "@/i18n/routing";
import { getContent } from "@/content";
import { Hero } from "@/components/sections/hero";
import { ProjectList } from "@/components/sections/project-list";
import { OpenSource } from "@/components/sections/open-source";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const content = getContent(locale);

  return (
    <>
      <Hero locale={locale} profile={content.profile} />
      <ProjectList locale={locale} projects={content.projects} />
      <OpenSource locale={locale} items={content.openSource} />
      <ExperienceTimeline locale={locale} experience={content.experience} />
      <Skills locale={locale} skills={content.skills} education={content.education} />
      <Contact locale={locale} email={content.profile.email} />
    </>
  );
}
