import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { isLocale } from "@/i18n/routing";
import { getContent } from "@/content";
import { Hero } from "@/components/sections/hero";
import { WorkLedger } from "@/components/sections/work-ledger";
import { PictureBand } from "@/components/sections/picture-band";
import { TwoNumbers } from "@/components/sections/two-numbers";
import { CareerTable } from "@/components/sections/career-table";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const content = getContent(locale);

  const erp = content.projects.find((p) => p.slug === "school-erp");
  const ukm = content.projects.find((p) => p.slug === "ukm-booking");
  const erpDesktop = erp?.shots?.find((s) => s.device === "desktop");
  const ukmPhone = ukm?.shots?.find((s) => s.device === "mobile");

  return (
    <>
      <Hero locale={locale} profile={content.profile} />
      <WorkLedger locale={locale} projects={content.projects} openSource={content.openSource} />
      {erpDesktop && ukmPhone ? <PictureBand locale={locale} desktop={erpDesktop} phone={ukmPhone} /> : null}
      <TwoNumbers
        locale={locale}
        a={erp?.metrics.find((m) => m.value.includes("400"))?.value ?? "400+"}
        b={ukm?.metrics[0]?.value ?? "5,000+"}
      />
      <CareerTable
        locale={locale}
        experience={content.experience}
        education={content.education}
        skills={content.skills}
      />
      <About locale={locale} profile={content.profile} />
      <Contact locale={locale} profile={content.profile} />
    </>
  );
}
