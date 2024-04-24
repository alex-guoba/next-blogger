// middleware/withLogging.ts
import { NextFetchEvent, NextRequest } from "next/server";
import { MiddlewareFactory } from "./types";

import { logger } from "@/lib/logger";

export const withLogging: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(/, /)[0] : "";

    logger.info(`[${request.method}] [${ip}] ${request.url}`);
    return next(request, _next);
  };
};
