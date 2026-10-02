import type { MetadataRoute } from "next";
import { getRoadmapLanguages, getLanguageTree, flattenLessons } from "@/lib/content";

export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const staticRoutes = [
    "",
    "/roadmap",
    "/compare",
    "/mistake-lab",
    "/faq",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/login",
    "/signup",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const languages = await getRoadmapLanguages();
  const languageRoutes = languages
    .filter((l) => l.status === "available")
    .map((l) => ({ url: `${siteUrl}/learn/${l.slug}`, lastModified: new Date() }));

  const lessonRoutes: MetadataRoute.Sitemap = [];
  for (const language of languages.filter((l) => l.status === "available")) {
    const tree = await getLanguageTree(language.slug);
    if (!tree) continue;
    for (const lesson of flattenLessons(tree)) {
      lessonRoutes.push({ url: `${siteUrl}/learn/${language.slug}/${lesson.slug}`, lastModified: new Date() });
    }
  }

  return [...staticRoutes, ...languageRoutes, ...lessonRoutes];
}
