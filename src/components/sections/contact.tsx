import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Section } from "@/components/ui/section";
import { ContactForm } from "./contact-form";

export async function Contact({
  locale,
  email,
}: {
  locale: Locale;
  email: string;
}) {
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <Section id="contact" title={t("title")} intro={t("intro")}>
      <ContactForm email={email} />
    </Section>
  );
}
