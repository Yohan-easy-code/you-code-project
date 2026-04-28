import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db/prisma";

export const revalidate = 3600;

const baseUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.AUTH_URL ??
  "http://localhost:3000"
).replace(/\/$/, "");

const staticRoutes = [
  {
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/courses",
    changeFrequency: "daily",
    priority: 0.9,
  },
  {
    path: "/projet",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/explorer",
    changeFrequency: "weekly",
    priority: 0.7,
  },
  {
    path: "/cgu",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    path: "/mentions-legales",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    path: "/politique-de-confidentialite",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    path: "/politique-de-cookies",
    changeFrequency: "yearly",
    priority: 0.3,
  },
] satisfies Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}>;

function absoluteUrl(path: string) {
  return `${baseUrl}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const courses = await prisma.course.findMany({
    where: {
      state: "PUBLISHED",
    },
    select: {
      id: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...courses.map((course) => ({
      url: absoluteUrl(`/courses/${course.id}`),
      lastModified: course.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
