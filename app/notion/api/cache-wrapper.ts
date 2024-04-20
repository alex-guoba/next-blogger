import { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";
import { StatRetrieveBlockChildren, StatRetrievePage, StatRetrieveDatabase, StatQueryDatabase } from "./api-stat";
import { unstable_cache } from "next/cache";
import { env } from "@/env.mjs";

const revalidate = env.NEXT_DATACACHE_EXPIRE;

// export class NotionApiCache {
export const CacheRetrieveBlockChildren = unstable_cache(
  (page_id: string) => StatRetrieveBlockChildren(page_id),
  ["block-cache-key"],
  {
    revalidate: revalidate,
    tags: ["posts"],
  }
);

export const CacheRetrievePage = unstable_cache((page_id: string) => StatRetrievePage(page_id), ["page-cache-key"], {
  revalidate: revalidate,
});

export const CacheRetrieveDatabase = unstable_cache(
  (database_id: string) => StatRetrieveDatabase(database_id),
  ["db-info-cache-key"],
  {
    revalidate: revalidate,
    tags: ["posts"],
  }
);

export const CacheQueryDatabase = unstable_cache(
  (database_id: string, params: QueryDatabaseParameters) => StatQueryDatabase(database_id, params),
  ["db-query-cache-key"],
  {
    revalidate: revalidate,
    tags: ["posts"],
  }
);
// }
