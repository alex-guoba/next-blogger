// Notion Public API

// import { env } from "@/env.mjs";
import { logger } from "@/lib/logger";
import { APIErrorCode, ClientErrorCode } from "@notionhq/client";
import {
  GetDatabaseResponse,
  GetPageResponse,
  ListBlockChildrenResponse,
  QueryDatabaseParameters,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

import { client } from "./client";

const dftMaxRetry = 2;

// Notion API have rate limitations, so we need to retry after a while
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shouldRetry(error: any) {
  if (error?.code === ClientErrorCode.RequestTimeout) {
    return true;
  }
  if (error?.code === APIErrorCode.RateLimited) {
    sleep(100);
    return true;
  }
  return false;
}

export async function RetrieveDatabase(
  database_id: string,
  maxTries: number = dftMaxRetry
): Promise<GetDatabaseResponse | null> {
  try {
    const response = await client.databases.retrieve({
      database_id: database_id,
    });

    return response;
  } catch (error: any) {
    if (maxTries > 0 && shouldRetry(error)) {
      logger.info(`retringing retrieveDatabase ${database_id}`);
      return RetrieveDatabase(database_id, maxTries - 1);
    }
    logger.error(`Failed to retrieve Database ${error}`);
    return null;
  }
}

export async function QueryDatabases(
  database_id: string,
  params: QueryDatabaseParameters,
  maxTries: number = dftMaxRetry
): Promise<QueryDatabaseResponse | null> {
  try {
    const response = await client.databases.query(params);

    // https://developers.notion.com/reference/intro#parameters-for-paginated-requests
    while (response.has_more && response.next_cursor) {
      const stepParam = Object.assign({}, params, { start_cursor: response.next_cursor });
      const more = await client.databases.query(stepParam);
      response.results.push(...more.results);
      response.next_cursor = more.next_cursor;
      response.has_more = more.has_more;
    }
    return response;
  } catch (error) {
    if (maxTries > 0 && shouldRetry(error)) {
      logger.info(`retringing proxyQueryDatabases ${database_id} as ${error}`);
      return QueryDatabases(database_id, params, maxTries - 1);
    }
    logger.error(`Failed to query Database ${error}`);
    throw error;
  }
}
export async function RetrievePage(page_id: string, maxTries: number = dftMaxRetry): Promise<GetPageResponse | null> {
  try {
    const response = await client.pages.retrieve({
      page_id: page_id,
    });
    return response;
  } catch (error) {
    if (maxTries > 0 && shouldRetry(error)) {
      logger.info(`retringing proxyRetrievePage ${page_id} as ${error}`);
      return RetrievePage(page_id, maxTries - 1);
    }
    logger.error(`Failed to retrieve page ${error}`);
    return null;
  }
}

export async function ListBlockChildren(
  block_id: string,
  maxTries: number = dftMaxRetry
): Promise<ListBlockChildrenResponse | null> {
  try {
    // The response may contain fewer than the default number of results. so we ignored the page size
    const response = await client.blocks.children.list({
      block_id: block_id,
    });

    while (response.has_more && response.next_cursor) {
      const more = await client.blocks.children.list({
        block_id: block_id,
        start_cursor: response.next_cursor,
      });
      response.results.push(...more.results);
      response.next_cursor = more.next_cursor;
      response.has_more = more.has_more;
    }

    return response;
  } catch (error) {
    if (maxTries > 0 && shouldRetry(error)) {
      logger.info(`retringing proxyListBlockChildren ${block_id} as ${error}`);
      return ListBlockChildren(block_id, maxTries - 1);
    }
    logger.error(`Failed to list blockchildren ${error}`);

    return null;
  }
}
