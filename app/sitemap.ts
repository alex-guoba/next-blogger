import { MetadataRoute } from "next";
import { QueryDatabase } from "./notion/api";
import { env } from "@/env.mjs";
import { absoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await QueryDatabase(env.NOTION_DATABASE_ID);

  const articles = posts.map((post: any) => ({
    url: absoluteUrl(`/article/${post.id}`),
    lastModified: post.last_edited_time,
  }));

  return [...articles];
}
