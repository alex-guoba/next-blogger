// proxy for notion api, to avoid api limititation and http latancy

import { env } from "@/env.mjs";
import { Client } from "@notionhq/client";
import prisma from "./prisma";
import { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
  auth: env.NOTION_TOKEN,
});
const dftMaxRetry = 2;
const enableCache: boolean = !!env.DATABASE_URL;

function expired(updated_at: Date): boolean {
  const now = new Date();
  const distSec = (now.getTime() - updated_at.getTime()) / 1000;
  if (distSec > env.NOTION_CACHE_EXPIRER) {
    return true;
  }
  return false;
}

// Notion API have rate limitations, so we need to retry after a while
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function proxyRetrieveDatabase(database_id: string, maxTries: number = dftMaxRetry) {
  try {
    // cache first
    if (enableCache) {
      const db = await prisma.dBProperties.findUnique({
        where: {
          database_id: database_id,
        },
      });
      if (db?.result && !expired(db.updated_at)) {
        const res = JSON.parse(Buffer.from(db.result).toString("utf-8"));
        console.log("retrieveDatabase cached hit for ", database_id);
        return res;
      }
    }
    const response = await notion.databases.retrieve({
      database_id: database_id,
    });

    if (enableCache && response && "properties" in response) {
      const result = Buffer.from(JSON.stringify(response));
      await prisma.dBProperties.upsert({
        create: {
          database_id: database_id,
          result: result,
        },
        update: {
          result: result,
        },
        where: {
          database_id: database_id,
        },
      });
    }

    return response;
  } catch (error) {
    console.log(error, maxTries);

    if (maxTries > 0) {
      return proxyRetrieveDatabase(database_id, maxTries - 1);
    }
    return null;
  }
}

export async function proxyQueryDatabases(
  database_id: string,
  params: QueryDatabaseParameters,
  maxTries: number = dftMaxRetry
) {
  try {
    if (enableCache) {
      const db = await prisma.dBRows.findUnique({
        where: {
          params: JSON.stringify(params),
        },
      });
      if (db?.result && !expired(db.updated_at)) {
        const res = JSON.parse(Buffer.from(db.result).toString("utf-8"));
        return res;
      }
    }

    console.log("proxyQueryDatabases cached miss ", database_id);

    const response = await notion.databases.query(params);

    // https://developers.notion.com/reference/intro#parameters-for-paginated-requests
    while (response.has_more && response.next_cursor) {
      const stepParam = Object.assign({}, params, { start_cursor: response.next_cursor });
      const more = await notion.databases.query(stepParam);
      response.results.push(...more.results);
      response.next_cursor = more.next_cursor;
      response.has_more = more.has_more;
    }

    if (enableCache && response && "object" in response) {
      const result = Buffer.from(JSON.stringify(response));

      await prisma.dBRows.upsert({
        create: {
          database_id: database_id,
          params: JSON.stringify(params),
          result: result,
        },
        update: {
          result: result,
        },
        where: {
          params: JSON.stringify(params),
        },
      });
    }

    return response;
  } catch (error) {
    console.log(error, maxTries);
    if (maxTries > 0) {
      return proxyQueryDatabases(database_id, params, maxTries - 1);
    }
    return null;
  }
}

export async function proxyRetrievePage(page_id: string, maxTries: number = dftMaxRetry) {
  try {
    if (enableCache) {
      const db = await prisma.pageProperties.findUnique({
        where: {
          page_id: page_id,
        },
      });
      if (db?.result && !expired(db.updated_at)) {
        const res = JSON.parse(Buffer.from(db.result).toString("utf-8"));
        return res;
      }
    }

    console.log("proxyRetrievePage cached miss for ", page_id);

    const response = await notion.pages.retrieve({
      page_id: page_id,
    });

    if (enableCache && response && "properties" in response) {
      const result = Buffer.from(JSON.stringify(response)); //.toString("base64"),

      await prisma.pageProperties.upsert({
        create: {
          page_id: page_id,
          result: result,
        },
        update: {
          result: result,
        },
        where: {
          page_id: page_id,
        },
      });
    }
    return response;
  } catch (error) {
    console.log(error, maxTries);
    if (maxTries > 0) {
      return proxyRetrievePage(page_id, maxTries - 1);
    }
    return null;
  }
}

export async function proxyListBlockChildren(block_id: string, maxTries: number = dftMaxRetry) {
  try {
    if (enableCache) {
      const db = await prisma.blockChildren.findUnique({
        where: {
          block_id: block_id,
        },
      });
      if (db?.result && !expired(db.updated_at)) {
        const res = JSON.parse(Buffer.from(db.result || "{}").toString("utf-8"));
        return res;
      }
    }

    console.log("proxyListBlockChildren cached miss for ", block_id);

    // The response may contain fewer than the default number of results. so we ignored the page size
    const response = await notion.blocks.children.list({
      block_id: block_id,
    });

    while (response.has_more && response.next_cursor) {
      const more = await notion.blocks.children.list({
        block_id: block_id,
        start_cursor: response.next_cursor,
      });
      response.results.push(...more.results);
      response.next_cursor = more.next_cursor;
      response.has_more = more.has_more;
    }

    if (enableCache && response && "results" in response) {
      const result = Buffer.from(JSON.stringify(response)); //.toString("base64"),

      await prisma.blockChildren.upsert({
        create: {
          block_id: block_id,
          result: result,
        },
        update: {
          result: result,
        },
        where: {
          block_id: block_id,
        },
      });
    }
    return response;
  } catch (error) {
    console.log(error, maxTries);

    if (maxTries > 0) {
      await sleep(200);
      return proxyListBlockChildren(block_id, maxTries - 1);
    }
    return null;
  }
}
