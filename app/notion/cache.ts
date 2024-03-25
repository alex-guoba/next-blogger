import { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";
import { RetrieveBlockChildren, RetrievePage, RetrieveDatabase, QueryDatabase } from "./api";
import { unstable_cache } from "next/cache";
import { env } from "@/env.mjs";

const revalidate = env.NEXT_DATACACHE_EXPIRE;

export class NotionApiCache {
  public static RetrieveBlockChildren = unstable_cache(
    (page_id: string) => RetrieveBlockChildren(page_id),
    ["block-cache-key"],
    {
      revalidate: revalidate,
    }
  );

  public static RetrievePage = unstable_cache((page_id: string) => RetrievePage(page_id), ["page-cache-key"], {
    revalidate: revalidate,
  });

  public static RetrieveDatabase = unstable_cache(
    (database_id: string) => RetrieveDatabase(database_id),
    ["db-info-cache-key"],
    {
      revalidate: revalidate,
    }
  );

  public static QueryDatabase = unstable_cache(
    (database_id: string, params: QueryDatabaseParameters) => QueryDatabase(database_id, params),
    ["db-query-cache-key"],
    {
      revalidate: revalidate,
    }
  );
}
