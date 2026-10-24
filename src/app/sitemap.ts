import type { MetadataRoute } from "next";
import { en } from "@/content/en";
import { SITE_URL } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = en.projects.map((p) => p.slug);
  const routes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: new Date() },
    { url: `${SITE_URL}/id`, lastModified: new Date() },
  ];

  for (const slug of slugs) {
    routes.push({
      url: `${SITE_URL}/projects/${slug}`,
      lastModified: new Date(),
    });
    routes.push({
      url: `${SITE_URL}/id/projects/${slug}`,
      lastModified: new Date(),
    });
  }

  return routes;
}
