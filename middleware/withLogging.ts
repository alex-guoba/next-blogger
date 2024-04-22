// middleware/withLogging.ts
import { NextFetchEvent, NextRequest } from "next/server";
import { MiddlewareFactory } from "./types";

import { logger } from "@/lib/logger";

export const withLogging: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    logger.info(`[${request.method}] ${request.url}`);
    return next(request, _next);
  };
};
