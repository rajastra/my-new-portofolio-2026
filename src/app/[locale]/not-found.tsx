import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonClass } from "@/components/ui/button-link";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-ink">{t("title")}</h1>
      <div className="mt-6">
        <Link href="/" className={buttonClass("primary")}>
          {t("home")}
        </Link>
      </div>
    </section>
  );
}
