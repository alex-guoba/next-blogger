// proxy for notion api, to avoid api limititation and http latancy

import { env } from "@/env.mjs";
import { Client } from "@notionhq/client";
import prisma from "./prisma";

const notion = new Client({
  auth: env.NOTION_TOKEN,
});
const enableCache: boolean = !!env.DATABASE_URL;

export async function proxyRetrieveDatabase(database_id: string) {
  try {
    // cache first
    if (enableCache) {
      const db = await prisma.dBProperties.findUnique({
        where: {
          database_id: database_id,
        },
      });
      if (db?.result) {
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
    console.log(error);
    return null;
  }
}

export async function proxyQueryDatabases(database_id: string) {
  try {
    if (enableCache) {
      const db = await prisma.dBRows.findUnique({
        where: {
          database_id: database_id,
        },
      });
      if (db?.result) {
        const res = JSON.parse(Buffer.from(db.result).toString("utf-8"));
        console.log("proxyQueryDatabases cached hit for ", database_id);
        return res;
      }
    }
    const response = await notion.databases.query({
      database_id: database_id,
    });

    if (enableCache && response && "object" in response) {
      const result = Buffer.from(JSON.stringify(response));

      await prisma.dBRows.upsert({
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
    console.log(error);
    return null;
  }
}

export async function proxyRetrievePage(page_id: string) {
  try {
    if (enableCache) {
      const db = await prisma.pageProperties.findUnique({
        where: {
          page_id: page_id,
        },
      });
      if (db?.result) {
        const res = JSON.parse(Buffer.from(db.result).toString("utf-8"));
        console.log("proxyRetrievePage cached hit for ", page_id);
        return res;
      }
    }
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
    console.log(error);
    return null;
  }
}

export async function proxyListBlockChildren(block_id: string) {
  try {
    if (enableCache) {
      const db = await prisma.blockChildren.findUnique({
        where: {
          block_id: block_id,
        },
      });
      if (db) {
        const res = JSON.parse(Buffer.from(db.result || "{}").toString("utf-8"));
        console.log("proxyListBlockChildren cached hit for ", block_id);
        return res;
      }
    }

    console.log("cache miss", block_id);

    // TODO: handle has_more
    const response = await notion.blocks.children.list({
      block_id: block_id,
      page_size: 100,
    });

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
        }
      });
    }
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}
