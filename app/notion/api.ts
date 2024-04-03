import { cache } from "react";

import {
  GetDatabaseResponse,
  QueryDatabaseParameters,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

// import { proxyListBlockChildren, proxyQueryDatabases, proxyRetrieveDatabase, proxyRetrievePage } from "./proxy/proxy";
import { NotionAPIWithRetry } from "./client";

const api = new NotionAPIWithRetry();
/**
 * Returns a random integer between the specified values, inclusive.
 * The value is no lower than `min`, and is less than or equal to `max`.
 *
 * @param {number} minimum - The smallest integer value that can be returned, inclusive.
 * @param {number} maximum - The largest integer value that can be returned, inclusive.
 * @returns {number} - A random integer between `min` and `max`, inclusive.
 */
function getRandomInt(minimum: number, maximum: number): number {
  const min = Math.ceil(minimum);
  const max = Math.floor(maximum);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
 ** retrieve database
 ** see: https://developers.notion.com/reference/retrieve-a-database
 */
export const RetrieveDatabase = cache(async (database_id: string): Promise<GetDatabaseResponse | null> => {
  return api.RetrieveDatabase(database_id);
});

// API: https://developers.notion.com/reference/post-database-query
export type TypePostList = QueryDatabaseResponse["results"];
export const QueryDatabase = cache(
  async (database_id: string, params: QueryDatabaseParameters): Promise<TypePostList> => {
    const start = new Date().getTime();

    const response = await api.QueryDatabases(database_id, params);
    const end = new Date().getTime();
    console.log("[QueryDatabase]", `${end - start}ms`);
    return response?.results || [];
  }
);

//
// API: https://developers.notion.com/reference/retrieve-a-page
export const RetrievePage = cache(async (page_id: string) => {
  const start = new Date().getTime();
  const response = await api.RetrievePage(page_id);
  const end = new Date().getTime();
  console.log("[getPage] for ", `${page_id}: ${end - start}ms`);
  return response;
});

// Most of the time, block id for query children is block's own id.
// but some times it will use another id like duplicated synced block
// see: (https://developers.notion.com/reference/block#duplicate-synced-block)
const getBlockID = (block: any): string => {
  if (block?.type == "synced_block") {
    const id = block["synced_block"]?.synced_from?.block_id;
    if (id) {
      return id;
    }
  }

  return block.id;
};

//
// Returns a paginated array of child block objects contained in the block using the ID specified.
// see: https://developers.notion.com/reference/get-block-children
// NOTE: Calling a memoized function outside of a component will not use the cache.
export const RetrieveBlockChildren = cache(async (block_id: string): Promise<Array<any>> => {
  const start = new Date().getTime();

  const blockId = block_id.replaceAll("-", ""); // ???

  const result = await api.ListBlockChildren(blockId);
  if (!result) {
    return [];
  }

  // Fetches all child blocks recursively
  // be mindful of rate limits if you have large amounts of nested blocks !!
  // See https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks = result?.results.map(async (block: any) => {
    // ignore child pages
    if (block.has_children && block.type != "child_page") {
      const blockID = getBlockID(block);
      const children = await RetrieveBlockChildren(blockID);
      return { ...block, children };
    }

    return block;
  });

  const end = new Date().getTime();
  console.log("[retrieveBlockChildren]", `${end - start}ms`);

  return Promise.all(childBlocks).then((blocks) =>
    blocks.reduce((acc, curr) => {
      // special conversation for list(bullet、number)：convert to children array and add uniqed IDs inn each item
      // https://developers.notion.com/reference/block#bulleted-list-item
      if (curr.type === "bulleted_list_item") {
        if (acc[acc.length - 1]?.type === "bulleted_list") {
          acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
        } else {
          acc.push({
            id: getRandomInt(10 ** 99, 10 ** 100).toString(),
            type: "bulleted_list",
            bulleted_list: { children: [curr] },
          });
        }
      } else if (curr.type === "numbered_list_item") {
        if (acc[acc.length - 1]?.type === "numbered_list") {
          acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
        } else {
          acc.push({
            id: getRandomInt(10 ** 99, 10 ** 100).toString(),
            type: "numbered_list",
            numbered_list: { children: [curr] },
          });
        }
      } else {
        acc.push(curr);
      }
      return acc;
    }, [])
  );
});
