import { MetadataRoute } from "next";
// import { QueryDatabase } from "./notion/api";
import { env } from "@/env.mjs";
import { absoluteUrl } from "@/lib/utils";
import { filterBase, filterSelect } from "./notion/block-parse";
import { CacheQueryDatabase } from "@/app/notion/api/cache-wrapper";
import { noteDbQueryParams } from "./notion/fitler";

// TODO: generate dynamic
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const defaultParam = filterBase(env.NOTION_DATABASE_ID);
  const filter = filterSelect("Status", "Published");

  const queryParams = { ...defaultParam, ...filter };
  const posts = await CacheQueryDatabase(env.NOTION_DATABASE_ID, queryParams);

  const articles = posts.map((post: any) => ({
    url: absoluteUrl(`article/${post.id}`),
    lastModified: post.last_edited_time,
  }));

  if (env.NOTION_NOTE_DATABASE_ID) {
    const notesQueryParams = noteDbQueryParams(env.NOTION_NOTE_DATABASE_ID);
    const notes = await CacheQueryDatabase(env.NOTION_NOTE_DATABASE_ID, notesQueryParams);
    const books = notes.map((post: any) => ({
      url: absoluteUrl(`notes/${post.id}`),
      lastModified: post.last_edited_time,
    }));

    return [...articles, ...books];
  }
  

  return [...articles];
}
