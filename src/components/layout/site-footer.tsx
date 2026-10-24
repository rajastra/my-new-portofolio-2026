import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import type { Profile } from "@/content/types";

export async function SiteFooter({ locale, profile }: { locale: Locale; profile: Profile }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-slate sm:flex-row sm:justify-between sm:px-6">
        <p>
          © {profile.name}. {t("built")}
        </p>
        <ul className="flex gap-5">
          <li>
            <a className="hover:text-ink" href={profile.links.github}>
              GitHub
            </a>
          </li>
          <li>
            <a className="hover:text-ink" href={profile.links.linkedin}>
              LinkedIn
            </a>
          </li>
          <li>
            <a className="hover:text-ink" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
