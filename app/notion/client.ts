// Notion Public API

import { env } from "@/env.mjs";
import { APIErrorCode, Client, ClientErrorCode, LogLevel } from "@notionhq/client";
import {
  GetDatabaseResponse,
  GetPageResponse,
  ListBlockChildrenResponse,
  QueryDatabaseParameters,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

const dftMaxRetry = 2;

// Notion API have rate limitations, so we need to retry after a while
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class NotionAPIWithRetry {
  private readonly notion: Client;

  constructor() {
    this.notion = new Client({
      auth: env.NOTION_TOKEN,
      logLevel: env.NOTION_API_LOG_LEVEL as LogLevel,
    });
  }

  private shouldRetry(error: any) {
    if (error?.code === ClientErrorCode.RequestTimeout) {
      return true;
    }
    if (error?.code === APIErrorCode.RateLimited) {
      sleep(100);
      return true;
    }
    return false;
  }

  public async RetrieveDatabase(
    database_id: string,
    maxTries: number = dftMaxRetry
  ): Promise<GetDatabaseResponse | null> {
    try {
      const response = await this.notion.databases.retrieve({
        database_id: database_id,
      });

      return response;
    } catch (error: any) {
      if (maxTries > 0 && this.shouldRetry(error)) {
        console.log("retringing retrieveDatabase ", database_id);
        return this.RetrieveDatabase(database_id, maxTries - 1);
      }
      console.log(error, maxTries);
      return null;
    }
  }

  public async QueryDatabases(
    database_id: string,
    params: QueryDatabaseParameters,
    maxTries: number = dftMaxRetry
  ): Promise<QueryDatabaseResponse | null> {
    try {
      const response = await this.notion.databases.query(params);

      // https://developers.notion.com/reference/intro#parameters-for-paginated-requests
      while (response.has_more && response.next_cursor) {
        const stepParam = Object.assign({}, params, { start_cursor: response.next_cursor });
        const more = await this.notion.databases.query(stepParam);
        response.results.push(...more.results);
        response.next_cursor = more.next_cursor;
        response.has_more = more.has_more;
      }
      return response;
    } catch (error) {
      if (maxTries > 0 && this.shouldRetry(error)) {
        console.log("retringing proxyQueryDatabases ", database_id);
        return this.QueryDatabases(database_id, params, maxTries - 1);
      }
      console.log(error, maxTries);
      return null;
    }
  }

  public async RetrievePage(page_id: string, maxTries: number = dftMaxRetry): Promise<GetPageResponse | null> {
    try {
      const response = await this.notion.pages.retrieve({
        page_id: page_id,
      });
      return response;
    } catch (error) {
      if (maxTries > 0 && this.shouldRetry(error)) {
        console.log("retringing proxyRetrievePage ", page_id);
        return this.RetrievePage(page_id, maxTries - 1);
      }
      console.log(error, maxTries);
      return null;
    }
  }

  public async ListBlockChildren(
    block_id: string,
    maxTries: number = dftMaxRetry
  ): Promise<ListBlockChildrenResponse | null> {
    try {
      // The response may contain fewer than the default number of results. so we ignored the page size
      const response = await this.notion.blocks.children.list({
        block_id: block_id,
      });

      while (response.has_more && response.next_cursor) {
        const more = await this.notion.blocks.children.list({
          block_id: block_id,
          start_cursor: response.next_cursor,
        });
        response.results.push(...more.results);
        response.next_cursor = more.next_cursor;
        response.has_more = more.has_more;
      }

      return response;
    } catch (error) {
      if (maxTries > 0 && this.shouldRetry(error)) {
        console.log("retringing proxyListBlockChildren ", block_id);
        return this.ListBlockChildren(block_id, maxTries - 1);
      }
      console.log(error, maxTries);
      return null;
    }
  }
}
