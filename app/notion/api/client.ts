// Notion Public API

import { env } from "@/env.mjs";
import { Client, LogLevel } from "@notionhq/client";

const client = new Client({
  auth: env.NOTION_TOKEN,
  logLevel: env.NOTION_API_LOG_LEVEL as LogLevel,
});

export { client };
