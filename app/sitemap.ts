import { MetadataRoute } from "next";
import { QueryDatabase } from "./notion/api";
import { env } from "@/env.mjs";
import { absoluteUrl } from "@/lib/utils";
import { filterBase, filterSelect } from "./notion/block-parse";

// TODO: generate dynamic
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const defaultParam = filterBase(env.NOTION_DATABASE_ID);
  const filter = filterSelect("Status", "Published");

  const queryParams = { ...defaultParam, ...filter };
  const posts = await QueryDatabase(env.NOTION_DATABASE_ID, queryParams);

  const articles = posts.map((post: any) => ({
    url: absoluteUrl(`/article/${post.id}`),
    lastModified: post.last_edited_time,
  }));

  return [...articles];
}
